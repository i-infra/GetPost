#!/bin/bash
# Usage: ./generate_test_hashes.sh deployment_name
# Example: ./generate_test_hashes.sh staging
set -exu
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

echo "Generating test hashes for deployment: $DEPLOY_URL"
echo "=================================================="

# Test 1: Upload markdown and get rendered page hash
echo "1. Testing markdown rendering..."
formatted_share_link="$(echo -ne "# this is a test\n## of backend rendering\n\n" | curl -s --data-binary @/dev/stdin $DEPLOY_URL | grep share | awk '{print $3}')"
rendered_sha256=$(curl -s $formatted_share_link | sed $NO_ULID | sed $NO_EXPIRY | sed $NO_URL | bare_sha256sum)

echo "   Share link: $formatted_share_link"
echo "   Rendered hash: $rendered_sha256"

# Test 2: Get upload page hash
echo "2. Testing upload page..."
upload_sha256=$(curl -s $DEPLOY_URL/post | bare_sha256sum)
echo "   Upload hash: $upload_sha256"

# Test 3: Upload image and get embed page hash
echo "3. Testing image upload..."
if [ ! -f "deps/notpacman.png" ]; then
    echo "   ERROR: deps/notpacman.png not found!"
    echo "   Creating placeholder for hash generation..."
    # Create a simple 1x1 PNG for testing if file doesn't exist
    echo -ne '\x89\x50\x4e\x47\x0d\x0a\x1a\x0a\x00\x00\x00\x0d\x49\x48\x44\x52\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\x0a\x49\x44\x41\x54\x78\x9c\x63\x00\x01\x00\x00\x05\x00\x01\x0d\x0a\x2d\xb4\x00\x00\x00\x00\x49\x45\x4e\x44\xae\x42\x60\x82' > deps/notpacman.png
fi

image_share_link="$(curl -s --data-binary @deps/notpacman.png $DEPLOY_URL | grep share\ link | awk '{print $3}')"
image_embed_sha256=$(curl -s $image_share_link | sed $NO_ULID | sed $NO_EXPIRY | sed $NO_URL | bare_sha256sum)

echo "   Image share link: $image_share_link"
echo "   Image embed hash: $image_embed_sha256"

echo ""
echo "=================================================="
echo "GENERATED ENVIRONMENT VARIABLES:"
echo "=================================================="
echo ""
echo "# Add these to your .$1 file:"
echo "rendered_good=\"$rendered_sha256\""
echo "upload_good=\"$upload_sha256\""
echo "image_good=\"$image_embed_sha256\""
echo ""
echo "=================================================="
echo "VERIFICATION COMMANDS:"
echo "=================================================="
echo ""
echo "# Verify rendered page:"
echo "curl -s '$formatted_share_link' | sed '$NO_ULID' | sed '$NO_EXPIRY' | sed $NO_URL | sha256sum"
echo ""
echo "# Verify upload page:"
echo "curl -s '$DEPLOY_URL/post' | sha256sum"
echo ""
echo "# Verify image embed:"
echo "curl -s '$image_share_link' | sed '$NO_ULID' | sed '$NO_EXPIRY' | $NO_URL | sha256sum"
echo ""

# Optionally append to the deployment file
read -p "Append these variables to .$1 file? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "" >> ".$1"
    echo "# Generated test hashes $(date)" >> ".$1"
    echo "rendered_good=\"$rendered_sha256\"" >> ".$1"
    echo "upload_good=\"$upload_sha256\"" >> ".$1"
    echo "image_good=\"$image_embed_sha256\"" >> ".$1"
    echo "Variables appended to .$1"
fi
