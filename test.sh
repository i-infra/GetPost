#!/bin/bash
# Usage: ./test.sh deployment_name

if [ $# -eq 0 ]; then
    echo "Usage: $0 <deployment_name>"
    echo "Example: $0 staging"
    exit 1
fi

NO_ULID='s/01\([A-Z0-9]*\).*//'
NO_EXPIRY='s/Expires.*//'
NO_URL='s!http\(s\)\{0,1\}://[^[:space:]]*!!g'

source ."$1"

function bare_sha256sum(){
    sha256sum - | awk '{print $1}'
}

# Check if hash variables are defined, if not, generate them
if [ -z "${rendered_good:-}" ] || [ -z "${upload_good:-}" ] || [ -z "${image_good:-}" ]; then
    echo "WARNING: Some hash variables not defined. Generating them now..."
    echo "Run ./.generate_test_hashes.sh $1 to generate permanent values."
    echo ""
fi

# Generate current hashes
echo "Running tests against: $DEPLOY_URL"

# Test 1: Markdown rendering
raw_response="$(echo -ne "# this is a test\n## of backend rendering\n\n" | curl -s --data-binary @/dev/stdin $DEPLOY_URL)"
formatted_share_link="$(echo $raw_response | sed -e 's/ /\n/g' | grep key | head -n 1 | sed -e 's/\&raw//g')"
rendered_sha256=$(curl -s $formatted_share_link | sed $NO_ULID | sed $NO_EXPIRY | sed $NO_URL | bare_sha256sum)

# Test 2: Upload page
upload_sha256=$(curl -s $DEPLOY_URL/post | bare_sha256sum)

# Test 3: Image upload (check if file exists)
if [ ! -f "deps/notpacman.png" ]; then
    echo "WARNING: deps/notpacman.png not found, skipping image test"
    image_embed_sha256="SKIPPED"
else
    image_embed_sha256=$(curl -s --data-binary @deps/notpacman.png $DEPLOY_URL | grep share\ link | awk '{print $3}' | sed -e's/\&raw//g' | xargs curl -s | sed $NO_ULID | sed $NO_EXPIRY | sed $NO_URL | bare_sha256sum)
fi

# Results
echo ""
echo "=================================="
echo "TEST RESULTS:"
echo "=================================="

# Image test
if [ "${image_good:-UNDEFINED}" = "UNDEFINED" ]; then
    echo "IMAGE: UNDEFINED (hash: $image_embed_sha256)"
elif [ "$image_embed_sha256" = "SKIPPED" ]; then
    echo "IMAGE: SKIPPED (deps/notpacman.png not found)"
elif [ "$image_embed_sha256" = "${image_good}" ]; then
    echo "IMAGE: ✅ PASS"
else
    echo "IMAGE: ❌ FAIL"
    echo "  Expected: ${image_good}"
    echo "  Got:      $image_embed_sha256"
fi

# Rendered page test
if [ "${rendered_good:-UNDEFINED}" = "UNDEFINED" ]; then
    echo "RENDERED: UNDEFINED (hash: $rendered_sha256)"
elif [ "$rendered_sha256" = "${rendered_good}" ]; then
    echo "RENDERED: ✅ PASS"
else
    echo "RENDERED: ❌ FAIL"
    echo "  Expected: ${rendered_good}"
    echo "  Got:      $rendered_sha256"
fi

# Upload page test
if [ "${upload_good:-UNDEFINED}" = "UNDEFINED" ]; then
    echo "UPLOAD: UNDEFINED (hash: $upload_sha256)"
elif [ "$upload_sha256" = "${upload_good}" ]; then
    echo "UPLOAD: ✅ PASS"
else
    echo "UPLOAD: ❌ FAIL"
    echo "  Expected: ${upload_good}"
    echo "  Got:      $upload_sha256"
fi

# Overall result
if [ "${rendered_good:-}" = "$rendered_sha256" ] && [ "${upload_good:-}" = "$upload_sha256" ] && ([ "${image_good:-}" = "$image_embed_sha256" ] || [ "$image_embed_sha256" = "SKIPPED" ]); then
    echo ""
    echo "🎉 ALL TESTS PASSED!"
    exit 0
else
    echo ""
    echo "💥 SOME TESTS FAILED"
    echo ""
    echo "To update hashes, run:"
    echo "  ./.generate_test_hashes.sh $1"
    exit 1
fi
