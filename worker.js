// Copyleft 2021: AKA Infra
// Formally: PUBLIC DOMAIN / CC0
// Informally: "an ye harm none, do what ye will"

// declaration parsed by autoinsert.py; inserts the literal contents of deps/marked.min.js
import 'marked' // prettier-ignore

const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

const DEFAULT_MIME_TEXT = "text/raw; charset=UTF-8";
const DEFAULT_MIME_HTML = "text/html; charset=UTF-8";
const favicon_gzip =
  "H4sIAO9PM2AAA+2UMQrCQBBF36wbNZUBiUKa2MXOI9il9Rh6DMHKyjOls/UKVpYqFimEOBpE4yYXkLzls7Pzh+FXC6InCHix8mCk91T1bE1UQr80hQ9fdZIk+L6PMQZrLWmaIiJEUUQYhrS0tPwx3crLOIXj9vCaJ5o3//Y6VUNwqVvg5nl/cA2JbZ1bbs7ncFrCfgNbDbArVGdY5DBTxTfVFQYXKFTrA2RDOI7hHsMDH7d8sX4FAAA=";

// This is non-standard, but very convenient and relatively simple:
// specific interpolated strings - those wrapped in single-backticks (`) - and prefaced by AUTOINSERT_
// are found by a regular-expression search autoinsert.py and converted into corresponding filenames
//
// For example, AUTOINSERT_NOTPACMAN__SVG is replaced with the contents of notpacman.svg, in the deps directory
//
// This keeps the worker.js script simple, without requiring much build tooling!

const notpacman_svg = `AUTOINSERT_NOTPACMAN__SVG`; // eslint-disable-line
const getpost_css = `AUTOINSERT_GETPOST__CSS`; // eslint-disable-line

const ENCODING_LEN = ENCODING.length;
const TIME_LEN = 10;
const RANDOM_LEN = 16;

addEventListener("fetch", (fetch_event) => {
  // configure primary entrypoint
  fetch_event.respondWith(HANDLER(fetch_event));
});

// main entrypoint for all requests
async function HANDLER(fetch_event) {
  const now = Date.now();
  request = fetch_event.request;
  let headers = [...request.headers];
  for (const key in request.cf) {
    headers = headers.concat([
      ["cf-" + key, request.cf[key]]
    ]);
  }
  // massage headers and cloudflare metadata into "requestHeadersAndFriends" - an object containing helpful metadata for a given request
  const requestHeadersAndFriends = {};
  for (const header_index in headers) {
    requestHeadersAndFriends[headers[header_index][0].toLowerCase()] =
      headers[header_index][1];
  }
  const url = new URL(request.url);

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return handleCorsPreflightRequest(url);
  }

  // Clone the request to avoid "body already used" errors in error handling
  let requestBodyForDebug = null;
  try {
    if (request.body) {
      const clonedRequest = request.clone();
      requestBodyForDebug = await clonedRequest.arrayBuffer();
    }
  } catch (e) {
    // If cloning fails, we'll just not have debug info
    requestBodyForDebug = new ArrayBuffer(0);
  }

  // wrap main handler in a try/catch exception logging & reporting block, for easy debug
  try {
    url.protocol = "https:";

    if (url.pathname === "/post" || url.pathname === "/") {
      if (request.method === "POST") {
        // Accept any reasonable content for uploads
        let blob = await request.arrayBuffer();
        blob = await new Blob([blob]).arrayBuffer();

        // Generate keys
        const storeKey = ulid(now);
        const editKey = ulid(now);
        const deleteKey = ulid(now);

        // Handle TTL
        let xTtlSeconds = requestHeadersAndFriends["x-ttl"];
        if (xTtlSeconds === undefined) {
          xTtlSeconds = 24 * 60 * 60 * 30 * 12; // 1 year
        } else {
          xTtlSeconds = parseInt(xTtlSeconds, 10);
        }

        const expiryTime = new Date(xTtlSeconds * 1000 + now).toISOString();

        // Store the content
        await NAMESPACE.put(storeKey, blob, {
          expirationTtl: xTtlSeconds,
          metadata: {
            edit: editKey,
            del: deleteKey,
            expiry: expiryTime
          }
        });

        // Prepare response data
        const responseData = {
          message: `GetPost stored ${blob.byteLength} bytes!`,
          size: blob.byteLength,
          key: storeKey,
          share_url: `${url.href}?key=${storeKey}`,
          raw_url: `${url.href}?key=${storeKey}&raw`,
          delete_url: `${url.href}?key=${storeKey}&del=${deleteKey}`,
          expires_at: expiryTime
        };

        // Content negotiation based on Accept header with user-agent fallback
        const acceptHeader = requestHeadersAndFriends["accept"] || "";
        const userAgent = requestHeadersAndFriends["user-agent"] || "";

        // Check for CLI tools as fallback when Accept header is generic
        const isCLITool = userAgent.startsWith("curl/") ||
          userAgent.toLowerCase().includes("wget") ||
          userAgent.toLowerCase().includes("python") ||
          userAgent.toLowerCase().includes("node") ||
          userAgent.toLowerCase().includes("go-http-client");

        if (acceptHeader.includes("application/json")) {
          // JSON response for API clients
          return buildResponse(JSON.stringify(responseData, null, 2), "application/json", {}, 200, url);
        } else if (acceptHeader.includes("text/plain") && !acceptHeader.includes("text/html")) {
          // Plain text response explicitly requested
          const textResp = `${responseData.message}

share link: ${responseData.share_url}
raw link: ${responseData.raw_url}
delete link: ${responseData.delete_url}
expires at: ${responseData.expires_at}`;
          return buildResponse(textResp, DEFAULT_MIME_TEXT, {}, 200, url);
        } else if (isCLITool && !acceptHeader.includes("text/html")) {
          // Fallback: CLI tools get plain text when Accept header is generic (*/* or missing)
          const textResp = `${responseData.message}

share link: ${responseData.share_url}
raw link: ${responseData.raw_url}
delete link: ${responseData.delete_url}
expires at: ${responseData.expires_at}`;
          return buildResponse(textResp, DEFAULT_MIME_TEXT, {}, 200, url);
        } else {
          // HTML response for browsers (with markdown parsing)
          const htmlResp = marked(`${responseData.message}

**Share link:** ${responseData.share_url}
**Raw link:** ${responseData.raw_url}
**Delete link:** ${responseData.delete_url}
**Expires at:** ${responseData.expires_at}`);
          return buildResponse(htmlResp, DEFAULT_MIME_HTML, {}, 200, url);
        }
      } else if (request.method === "GET") {
        const del = url.searchParams.get("del");
        const key = url.searchParams.get("key");
        const raw = url.searchParams.has("raw");
        const customContentType = url.searchParams.get("content_type");

        // if no key parameter provided, return the upload prompt so user can upload
        if (!url.searchParams.has("key")) {
          const upload = `AUTOINSERT_UPLOAD__HTML`; // eslint-disable-line
          return buildResponse(upload, DEFAULT_MIME_HTML, {}, 200, url);
        }
        // ULID is len26
        if (key.length === 26 || key.length === 91) {
          let {
            contentFromKeyAsArrayBuffer,
            metadata
          } =
          await NAMESPACE.getWithMetadata(key, "arrayBuffer");
          // if either key dne, or old format
          if (metadata === null) {
            // check to see if old (pre-metadata)
            contentFromKeyAsArrayBuffer = await NAMESPACE.get(
              key,
              "arrayBuffer",
            );
            if (contentFromKeyAsArrayBuffer !== null) {
              contentFromKeyAsArrayBuffer = contentFromKeyAsArrayBuffer.slice(
                0,
                -26,
              );
            } else {
              return buildResponse(
                "Sorry, invalid key!",
                DEFAULT_MIME_TEXT, {},
                404,
                url,
              );
            }
          } else {
            // this second get should not be required... it appears getWithMetadata doesn't support returning arrayBuffers!?
            contentFromKeyAsArrayBuffer = await NAMESPACE.get(
              key,
              "arrayBuffer",
            );
          }
          // if both key and delete key...
          if (url.searchParams.has("del") && del.length == 26) {
            if (del === metadata.del) {
              const deleted_target_key = await NAMESPACE.delete(key);
              return buildResponse(
                `OK, sent command to delete ${key} using ${del} - please wait 3min for full delete.`,
                DEFAULT_MIME_TEXT, {},
                200,
                url,
              );
            } else {
              return buildResponse(
                "Sorry, invalid del key!",
                DEFAULT_MIME_TEXT, {},
                404,
                url,
              );
            }
          }
          const [generatedBodyHtml, type] = generateHtmlBasedOnType(
            contentFromKeyAsArrayBuffer,
            url,
            metadata
          );
          if (raw) {
            // Check if custom content type is provided and validate it
            let responseContentType = type;
            if (customContentType) {
              if (isValidContentType(customContentType)) {
                responseContentType = customContentType;
              } else {
                return buildResponse(
                  "Sorry, invalid content_type parameter!",
                  DEFAULT_MIME_TEXT, {},
                  400,
                  url,
                );
              }
            }

            // if requested as raw, return the original resp object with detected or custom MIME type
            return buildResponse(
              contentFromKeyAsArrayBuffer,
              responseContentType, {},
              200,
              url,
            );
          }
          // otherwise, return the wrapped body with the text/html mimetype
          else {
            return buildResponse(
              generatedBodyHtml,
              DEFAULT_MIME_HTML, {},
              200,
              url,
            );
          }
        } else {
          return buildResponse(
            "Sorry, invalid key!",
            DEFAULT_MIME_TEXT, {},
            404,
            url,
          );
        }
      }
    } else if (url.pathname === "/headers") {
      // helpful debug endpoint - return the headersAndFriends object, as a nicely formatted string
      requestHeadersAndFriends.url = url.toString();
      requestHeadersAndFriends.method = request.method;
      // first 20 bytes (hex-encoded) of the request
      if (requestBodyForDebug && requestBodyForDebug.byteLength > 0) {
        requestHeadersAndFriends.startBodyHex = hex(
          requestBodyForDebug.slice(0, 20),
        );
      } else {
        requestHeadersAndFriends.startBodyHex = "";
      }
      return buildResponse(
        JSON.stringify(requestHeadersAndFriends, null, 2) + "\n",
        "application/json", {},
        200,
        url,
      );
    } else if (url.pathname === "/echo") {
      // helpful debug endpoint - return the request body
      return buildResponse(
        await request.arrayBuffer(),
        "application/octet-stream", {},
        200,
        url,
      );
    } else if (url.pathname === "/raise_exception") {
      // trigger an exception
      this_method_does_not_exist();
    } else if (url.pathname === "/getpost.css") {
      // return static css content
      return buildResponse(getpost_css, "text/css", {}, 200, url);
    } else if (url.pathname === "/favicon.ico") {
      // returning binary requires UTF-16 JS strings to be converted to ie) UTF-8 bytes
      return buildResponse(
        str2ab(atob(favicon_gzip)),
        "image/x-icon", {
          "Content-Encoding": "gzip"
        },
        200,
        url,
      );
    } else {
      return buildResponse(
        `You probably want ${url.host}/post, not ${url.pathname}!`,
        DEFAULT_MIME_HTML, {},
        404,
        url,
      );
    }
  } catch (err) {
    // very helpful traceback functionality, such that users can report errors
    requestHeadersAndFriends.url = url.toString();
    requestHeadersAndFriends.method = request.method;
    requestHeadersAndFriends.traceback = err.stack.split("\n");
    // include the first 20 bytes, as 40 hex characters - use pre-cloned body
    if (requestBodyForDebug && requestBodyForDebug.byteLength > 0) {
      requestHeadersAndFriends.startBodyHex = hex(
        requestBodyForDebug.slice(0, 20),
      );
    } else {
      requestHeadersAndFriends.startBodyHex = "";
    }
    return new Response(JSON.stringify(requestHeadersAndFriends, null, 2), {
      status: 500,
      statusText: "caught exception in worker",
      headers: addCorsHeaders({}, url),
    });
  }
}

// Validate content type parameter
function isValidContentType(contentType) {
  // Basic validation for content type format
  // Allow common patterns like "text/html", "application/json", etc.
  const contentTypeRegex = /^[a-zA-Z][a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_.+]*(?:\s*;\s*[a-zA-Z0-9!#$&\-\^_]+=[a-zA-Z0-9!#$&\-\^_.+]*)*$/;

  if (!contentTypeRegex.test(contentType)) {
    return false;
  }

  // Additional length check for security
  if (contentType.length > 200) {
    return false;
  }

  return true;
}

// Handle CORS preflight requests
function handleCorsPreflightRequest(url) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-TTL",
    "Access-Control-Max-Age": "86400", // 24 hours
  };

  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Add CORS headers if cors=1 parameter is present
function addCorsHeaders(headers, url) {
  if (url && url.searchParams.has("cors")) {
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, X-TTL";
  }
  return headers;
}

// returns a single byte from the Cloudflare worker's (cryptographically secure) RNG
function prng() {
  const buffer = new Uint8Array(8);
  crypto.getRandomValues(buffer);
  return buffer[0] / 0xff;
}

// get a random character from the set of encodings
function randomChar() {
  let rand = Math.floor(prng() * ENCODING_LEN);
  if (rand === ENCODING_LEN) {
    rand = ENCODING_LEN - 1;
  }
  return ENCODING.charAt(rand);
}

// shove time (or any integer) into "len" base32 characters
function encodeTime(now, len) {
  let mod;
  let str = "";
  for (; len > 0; len--) {
    mod = now % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    now = (now - mod) / ENCODING_LEN;
  }
  return str;
}

// get "len" random base32 characters
function encodeRandom(len) {
  let str = "";
  for (; len > 0; len--) {
    str = randomChar() + str;
  }
  return str;
}

// return a ULID from an optional time, comprised of TIME_LEN characters of timestamp and RANDOM_LEN characters of entropy
function ulid(seedTime) {
  // if no seedTime is provided, use the current time
  if (isNaN(seedTime)) {
    seedTime = Date.now();
  }
  return encodeTime(seedTime, TIME_LEN) + encodeRandom(RANDOM_LEN);
}

// helper to turn a string into an array buffer
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i) & 0xff;
  }
  return buf;
}

// Uint8Array -> hex string
function hex(uint8arr_or_arraybuffer) {
  const uint8arr = new Uint8Array(uint8arr_or_arraybuffer);
  if (!uint8arr) {
    return "";
  }
  let hexStr = "";
  for (let i = 0; i < uint8arr.length; i++) {
    let hex = (uint8arr[i] & 0xff).toString(16);
    hex = hex.length === 1 ? "0" + hex : hex;
    hexStr += hex;
  }
  return hexStr;
}

// content (and optional url) to wrapper html and detected type
function generateHtmlBasedOnType(content, url = "", metadata = null) {
  let expiryTime = "Unknown";
  if (metadata) {
    if (metadata.permanent) {
      expiryTime = "Never (permanent)";
    } else if (metadata.expiry) {
      expiryTime = metadata.expiry.split('T')[0];
    }
  }
  if (content === null || content === undefined) {
    return ["CONTENT NOT FOUND", DEFAULT_MIME_TEXT];
  }
  const contentAsUint8Array = new Uint8Array(content);
  const contentAsString = new TextDecoder("utf-8").decode(contentAsUint8Array);
  // checks to see if characters are all plausibly utf-8 / printable
  const contentIsPrintable = /^[\x00-\x7F]*$/m.test(contentAsString);
  const header = hex(contentAsUint8Array.slice(0, 4));
  let injectorScript, type;
  // matches the first four bytes of the uploaded file
  switch (header) {
    // echo -n 'ftypmp42' | xxd
    // 00000000: 6674 7970 6d70 3432                      ftypmp42
    case "00000018":
    case "0000001c":
      if (hex(contentAsUint8Array.slice(4, 12)) == "667479706d703432") {
        type = "video/mp4";
        break;
      }
    case "25504446":
      type = "application/pdf";
      break;
    case "89504e47":
      type = "image/png";
      break;
    case "47494638":
      type = "image/gif";
      break;
    case "49443304":
      type = "audio/mp3";
      break;
    case "504b0304":
      type = "application/zip";
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      type = "image/jpeg";
      break;
    default:
      if (contentIsPrintable === true) {
        type = DEFAULT_MIME_TEXT;
      } else {
        type = "application/octet-stream";
      }
      break;
  }
  switch (type) {
    case "image/png":
    case "image/gif":
    case "image/jpeg":
      break;
    case "audio/mp3":
    case "video/mp4":
    case "application/pdf":
    case "application/zip":
    case "application/octet-stream":
      injectorScript = "window.location.assign(window.location.href+'&raw')";
      break;
    case DEFAULT_MIME_TEXT:
    default:
      injectorScript = "";
      break;
  }
  const TITLE = `GetPost: ${type}`;
  let contentAsHtmlFromMarked = "";
  let imageUrl = "";
  let description = "";
  // future use
  const encodedPayload = "";
  // strip non-url characters from description
  if (type === DEFAULT_MIME_TEXT) {
    contentAsHtmlFromMarked = marked(new TextDecoder("utf-8").decode(content));
    // use the first 140 characters that aren't special, as the description!
    description = new TextDecoder("utf-8")
      .decode(new Uint8Array(content.slice(0, 140)))
      .replace(/[^0-9a-z\\\ \.\:\?]/gi, "");
  } else {
    description = "GetPost: " + type;
  }
  if (type.startsWith("image/")) {
    imageUrl = url.toString() + "&raw";
    injectorScript = "";
  }
  const contentAsWrappedHtml = `AUTOINSERT_GETPOST__HTML`; // eslint-disable-line
  return [contentAsWrappedHtml, type];
}

function buildResponse(
  blob,
  type = DEFAULT_MIME_HTML,
  headers = {},
  statuscode = 200,
  url = null
) {
  const headersObj = Object.assign(headers, {
    "content-type": type
  });

  // Add CORS headers if cors parameter is present
  if (url) {
    addCorsHeaders(headersObj, url);
  }

  if (statuscode !== 200) {
    return new Response(blob, {
      status: statuscode,
      statusText: blob,
      headers: headersObj,
    });
  }
  return new Response(blob, {
    status: statuscode,
    headers: headersObj
  });
}