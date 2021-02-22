#! /bin/bash
set -exu

# this was the first-draft pipeline
# echo "# this is a test\n## of backend rendering" | curl -s --data-binary @/dev/stdin https://getpost.latest.workers.dev | tee /dev/stderr | grep share\ link | awk '{print $4}' | sed -e 's/\&raw//g' | xargs curl -s | grep -v https

NO_ULID='s/01\([A-Z0-9]*\).*//'

source ."$1"

function bare_sha256sum(){
    sha256sum - | awk '{print $1}'
}

# post a very simple markdown document to staging and store the response
raw_response="$(echo -ne "# this is a test\n## of backend rendering\n\n" | curl -s --data-binary @/dev/stdin $DEPLOY_URL)"

# parse the store-response for the share key
formatted_share_link="$(echo $raw_response | sed -e 's/ /\n/g' | grep key | head -n 1 | sed -e 's/\&raw//g')"

# load the rendered HTML with curl, remove the URL lines contatining the new ULID, and hash everything else to ensure proper rendering
rendered_sha256=$(curl $formatted_share_link | sed $NO_ULID | bare_sha256sum)

# load the rendered page for upload.html, and hash it
upload_sha256=$(curl $DEPLOY_URL/post | sed $NO_ULID | bare_sha256sum)

# upload notpacman.png, load the share link, and hash it
image_embed_sha256=$(curl --data-binary @deps/notpacman.png $DEPLOY_URL | grep share\ link | awk '{print $4}' | sed -e's/\&raw//g' | xargs curl | sed $NO_ULID | bare_sha256sum)

if [ "$rendered_sha256 $upload_sha256 $image_embed_sha256" == "$rendered_good $upload_good $image_good" ]
    then echo "SUCCESS"
else
    echo "FAIL"
    exit -1
fi
