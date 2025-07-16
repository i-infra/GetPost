# GetPost Setup Guide

Deploy your own GetPost instance for free on Cloudflare Workers.

## Quick Start (Try First!)

Because I love you, I've included credentials allowing anyone to deploy to the shared staging environment. Try this first to see how it works:

```bash
git clone https://github.com/getpost-loves-you/getpost
cd getpost
./deploy.sh staging
./test.sh staging
```

Your changes will appear at https://staging.getpost.workers.dev - perfect for testing modifications before setting up your own instance!

## Prerequisites

- **Tools:** `curl`, `python3`, and a Linux-like environment (macOS, Linux, WSL, or Termux)
- **Account:** Free Cloudflare account ([workers.dev](https://workers.dev))
- **No complex toolchains:** We deliberately avoid Wrangler, NPM, or Rust to keep things simple

## Step 1: Cloudflare Account Setup

### Create Worker Environment
1. **Sign up** at [workers.dev](https://workers.dev) (free tier gives you 100k reads/day, 1k uploads/day)
2. **Create KV Namespace:**
   - Go to Workers → KV
   - Click "Create Namespace"
   - Name it something descriptive (or just "NAMESPACE")
   - Note the namespace ID

3. **Create Worker:**
   - Go to Workers → Overview
   - Click "Create a Service"
   - Choose any name (you can change it later)
   - Select "HTTP handler"
   - Click "Create service"

4. **Configure KV Binding:**
   - In your worker, go to Settings → Variables
   - Under "KV Namespace Bindings", click "Add binding"
   - Variable name: `NAMESPACE`
   - KV namespace: Select the one you created
   - Click "Save"

### Get API Credentials
1. **Generate API Token:**
   - Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template, or create custom with:
     - Zone:Zone:Read (if using custom domain)
     - Account:Cloudflare Workers:Edit
     - Account:Account Settings:Read

2. **Find Account ID:**
   - Go to Workers dashboard
   - Account ID is shown in the right sidebar
   - Or copy from the URL: `dash.cloudflare.com/ACCOUNT_ID/workers`

## Step 2: Local Configuration

### Create Deployment Config
```bash
# Copy the staging template
cp .staging .mydomain

# Edit with your credentials
nano .mydomain  # or vim, code, etc.
```

### Configure Your `.mydomain` File
```bash
# Required: Your Cloudflare credentials
CF_ACCOUNT_ID="your-account-id-here"
CF_API_TOKEN="your-api-token-here"
SCRIPT_NAME="your-worker-name"
DEPLOY_URL="https://your-worker-name.your-subdomain.workers.dev"

# Optional: Test hashes (generated automatically on first run)
# rendered_good="hash-will-be-generated"
# upload_good="hash-will-be-generated"
# image_good="hash-will-be-generated"
```

**Where to find these values:**
- `CF_ACCOUNT_ID`: From Cloudflare dashboard sidebar or URL
- `CF_API_TOKEN`: The token you just created
- `SCRIPT_NAME`: Your worker name (from step 1)
- `DEPLOY_URL`: Your worker's URL (usually `https://SCRIPT_NAME.YOUR_SUBDOMAIN.workers.dev`)

## Step 3: Deploy & Test

### Deploy Your Instance
```bash
./deploy.sh mydomain
```

This script:
1. Runs `autoinsert.py` to embed assets from `deps/` into `worker.js`
2. Creates `worker.packed.js` with all dependencies included
3. Uploads to Cloudflare using your credentials

### Verify It Works
```bash
./test.sh mydomain
```

Expected output:
```
Running tests against: https://your-domain.workers.dev
==================================
TEST RESULTS:
==================================
IMAGE: ✅ PASS
RENDERED: ✅ PASS
UPLOAD: ✅ PASS

🎉 ALL TESTS PASSED!
```

If tests fail on first run, that's normal! The script will generate baseline hashes for your content.

## Step 4: Customization (Optional)

### Custom Domain
If you want to use your own domain instead of `*.workers.dev`:

1. **Add domain to Cloudflare** (Websites → Add a Site)
2. **Update .mydomain" (Add API key, ACCOUNT_ID, Deploy URL, script name)
3. **Deploy with route:** `./deploy.sh mydomain`

### Modify the Code
GetPost is designed to be hackable! Try editing:

- **`deps/getpost.css`** - Change colors, fonts, layout
- **`deps/upload.html`** - Modify the upload page content
- **`worker.js`** - Add features, change behavior
- **`deps/getpost.html`** - Customize the content display template

After changes, redeploy and test:
```bash
./deploy.sh mydomain
./test.sh mydomain
```

## How It Works

### Build Process
To keep the main `worker.js` file manageable, we use a simple build system:

1. **`autoinsert.py`** scans `worker.js` for `AUTOINSERT_` markers
2. **Embeds files** from `deps/` directory using naming convention:
   - `AUTOINSERT_GETPOST__CSS` → `deps/getpost.css`
   - `AUTOINSERT_UPLOAD__HTML` → `deps/upload.html`
3. **Creates `worker.packed.js`** with all dependencies bundled
4. **`deploy.sh`** uploads the packed file to Cloudflare

### Testing System
- **Hash-based validation:** Each test generates a hash of the response
- **Baseline comparison:** Compares against known-good hashes in your config file
- **Content filtering:** Removes dynamic content (ULIDs, timestamps) before hashing
- **Automatic updates:** Generates new baselines when content changes

## Troubleshooting

### Common Issues

**"Authentication error" during deploy:**
- Check your `CF_API_TOKEN` has correct permissions
- Verify `CF_ACCOUNT_ID` matches your account
- Make sure the API token isn't expired

**"Namespace binding not found":**
- Ensure you created the KV namespace binding in worker settings
- Variable name must be exactly `NAMESPACE`
- The namespace itself can have any name

**Tests fail with hash mismatches:**
- This is normal after content changes
- Run `./generate_test_hashes.sh mydomain` to update baselines
- Or manually update the hash values in your `.mydomain` file

**Deploy succeeds but site doesn't work:**
- Check the worker logs in Cloudflare dashboard
- Verify KV namespace is properly bound
- Try the `/headers` endpoint to debug

### Getting Help

- **Check logs:** Cloudflare dashboard → Workers → your-worker → Logs
- **Debug endpoints:**
  - `https://your-domain.com/headers` - Shows request details
  - `https://your-domain.com/echo` - Echoes request body
- **Test staging:** Compare behavior with https://staging.getpost.workers.dev

## Philosophy

Be excellent to one another! This shared staging environment exists because I trust the community. Please:

- 🧪 **Test responsibly** - Don't abuse the shared staging credentials
- 🔧 **Experiment freely** - That's what it's for!
- 🤝 **Share improvements** - Submit PRs for features you build
- 🌍 **Deploy your own** - Set up your instance for real usage

The goal is to make self-hosting so easy that everyone can have their own GetPost instance. No complex toolchains, no vendor lock-in, just simple tools and good documentation.

---

*Need help? Open an issue or check out the main [README.md](README.md) for more context.*
