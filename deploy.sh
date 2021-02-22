#!/bin/bash
set -exu

### embed resources
python3 autoinsert.py

### load credentials from first argument
source ."$1"

### uploads worker.packed.js
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
     -H  "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/javascript" \
     --data-binary @worker.packed.js | grep '"success"'
