Welcome to GetPost v1.1!
------

## What? Is this?

GetPost is an [imagebin](https://en.wikipedia.org/wiki/Image_hosting_service) and [pastebin](https://www.urbandictionary.com/define.php?term=Pastebin) - a tool for sharing text and photos. It is designed to be simple, secure, and understandable - as a starting place for more powerful (and more complicated) tools.

You can try it out now at https://public.getpost.workers.dev, or by running the command:

 > curl --data-binary @path/to/a/file.png https://public.getpost.workers.dev

Want to post from the command line, and copy the link in one fell swoop? Try this in fish! 

"curl --data-binary @/dev/stdin https://public.getpost.workers.dev | grep share\ link | awk -F': ' '{print $2}' |xclip -sel clip -in;
xclip -sel clip -out;" 

Save the quoted thing as a file in local/bin. then set it up as a function. "function postf --argument f; cat $f | post; end"

You can deploy your own version for free - to servers worldwide! It has (almost) no "moving parts", very little surface area, (nearly) no chance of global downtime, and will (theoretically) never require manual security updates - rare claims for (useful) server/client software to make!

## Name

The name is a portmanteau of the two most common [HTTP request "verbs"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - "GET" and "POST"; these are coincidentally the two basic functions of a pastebin or imagebin.

## Features

 * Upload anything smaller than 10MB, share your original file, byte-for-byte (or as HTML). Delete when you want.
 * "No Rights Reserved" - libre / open source, no ads, no tracking, no hosting costs, no profit model
 * "native" support for markdown documents, PDFs, and common types of images.
   * Server-side rendering of [markdown](https://daringfireball.net/projects/markdown/) via [marked](https://github.com/markedjs/marked).
   * Extremely minimal CSS styling, and a [highly readable font](https://fonts.google.com/specimen/Ubuntu) for rendered text.
   * No external resources - no third party dependencies, which means no third party tracking and no third parties breaking.
   * Images sharable via embed in basic HTML with no loss of original quality.
 * Usable from the command line, without Javascript, and optionally - over Tor.
 * Plausible meta-tags for ergonomic sharing on [Twitter](https://business.twitter.com/en/blog/twitter-cards-101.html) and [Facebook](https://developers.facebook.com/tools/debug/).
 * Helpful debug tooling, including exception traceback reporting, '/headers' - for returning headers, and '/echo' - returning message body.


## Why? (would one be interested)

Hearkening back to... eras before Github Gists became ubiquitous, it was common for enterprising computer-y people to setup a small webserver, for hosting resumes, and sharing odds and ends with individuals online. This was nice, because it was trivial for to use (easy one-line SCP terminal commands, and your file is online!) - and relatively flexible, but - if maintaining webservers was easy, "SecDevOps" wouldn't be a real word.

Running a server off your home computer is doable. I do it. But - if you're not careful, you expose your real-world location to third parties. Petty losers escalating online drama, can use your IP address, to knock your whole house offline. A blown breaker, or downed tree limb, can take your site offline. If you forget to apply important security updates, random viruses/bots/worms can take your site offline. Sure, renting a cheap server in a computer warehouse can alleviate some of these issues, but the cheapest computers are $/mo, and still require proper care and feeding.

Depending upon your threat model, self-hosting services can be great. But for most people who use the internet, this is not an especially viable option.

So, this service trades the ability to host on your own machine, for the ability to be deployed "for free" with either:

 * a only few mouse clicks, and a copy and paste.
 * running a simple script

This project trades the ability to self-host, for the ability to move fast, and stand on the shoulders of a relatively benign corporate
giant. I added no restrictions on reuse to the code I wrote, to encourage third party modification and reuse.


## Design

GetPost is built on [Cloudflare Workers](https://workers.dev), as a very thin layer on top of Cloudflare's KV store.

From Cloudflare:

 > Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency, making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.

Neat.

 > Workers KV is generally good for use-cases where you need to write relatively infrequently, but read quickly and frequently. It is optimized for these high-read applications, only reaching its full performance when data is being frequently read. Very infrequently read values are stored centrally, while more popular values are maintained in all of our data centers around the world.

Perfect.

 > KV achieves this performance by being eventually-consistent. Changes may take up to 60 seconds to propagate. Workers KV isn't ideal for situations where you need support for atomic operations or where values must be read and written in a single transaction.

Fine.

> All values are encrypted at rest with 256-bit AES-GCM, and only decrypted by the process executing your Worker scripts or responding to your API requests.

This seems reasonable.


### Upload

File upload was originally implemented using normal [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) semantics for multipart forms,
including files. This incurred a software complexity debt, due to current implementations of Cloudflare Workers, and required the inclusion of a hard-to-follow
state machine to decode. Upon further consideration, the "complicated" semantics of adding boundaries to each "field" in the form were deprecated, in lieu of
adding frontend javascript that mimics the behavior of curl's "--data-binary" raw POST upload. A few lines of Javascript wait on the "submit" button, and
intercept button presses, instead sending the file's contents (without encoding or wrapping!) to the server. No multipart forms, no boundaries, no parsing.

### Referencing

Posts are referenced by by ULID - [Universally Unique Lexicographically Sortable Identifier](https://github.com/ulid/spec).

ULIDs are identifiers encoding a timestamp and random number in [Base 32](https://www.crockford.com/base32.html).

ULIDs offer a number of convenient properties compared to the more common
[UUID](https://www.ibm.com/support/knowledgecenter/en/SS6SG3_6.3.0/lr/ref/rlinfuuid4.html).

ULIDs...

 * ..are lexicographically sortable, where earlier objects sort to lower values.
 * ..are Canonically encoded as a 26 character string, as opposed to the 36 character hex UUID, for shorter URLs.
 * ..use [Crockford's base32](https://www.crockford.com/base32.html) - to avoid 0/o/O and 1/I/L confusion.

A second ULID is generated for use as a delete key.


## Trust and Security

Trust and security are subtle topics - and entire lectures could be given on the tradeoffs and optimisations made, even for a simple application like this!

Fundementally, webbrowsers are poorly designed to enable secure computing contexts. A modern webbrowser is an extremely multi-tenacy computing environments, with design
incentives that seldom align with user needs for confidentiality and integrity of data in rest and at motion.

By "modern sensibilities" - GetPost is pretty good, for a website!

 * It optionally works over Tor, with javascript disabled.
 * Data in motion is encrypted with TLS.
    * Theoretically, this means your internet service provider, regional government, and local police cannot see what you upload, or how to access it.
 * Data at rest is encrypted with AES-256.
    * The data is encrypted by Cloudflare "automatically" - such that only the project administrator or need-to-know members of the cloudflare team have the potential to access it without the link.
 * There are no advertisement scripts to deliver malware.
 * There is one cookie, the `__cfduid` cookie - bound to the "project.workers.dev" domain. This cannot be used to track you elsewhere.
 * There are no account passwords to lose or be reset by third parties.
 * There is no dynamically loaded javascript.
 * The service is hosted by an existing company with a strong brand and a strong revenue stream that would be jeopardised by malfeasance.

When I originally designed GetPost, I sketched an API design that - if properly implemented - would prevent site administrators from being able to view or
edit user-uploaded content. If the user's webbrowser and the software backend support the same asymmetric encryption schemes, data could be stored in a manner
only accessible with a just-in-time generated or user-provided private key. Such a scheme may be worth prototyping, but any naive implementation with design
goals to protect non-domain-expert users from prying eyes risks conveying false hope in absence of appropriate discussion.

Let's say, as I had originally considered, one wished to use the phenomenal [TweetNaCl-js](https://github.com/dchest/tweetnacl-js) library, to further protect
user content. It is [well documented](https://github.com/dchest/tweetnacl-js/blob/master/README.md), currently maintained, [audited by Cure53](https://cure53.de/tweetnacl.pdf), and works on robustly in any javascript runtime.

It offers both:

 * Secret-key authenticated encryption (secretbox)

> Secret key encryption (also called symmetric key encryption) is analogous to a safe. You can store something secret through it and anyone who has the key
> can open it and view the contents. SecretBox functions as just such a safe, and like any good safe any attempts to tamper with the contents are easily
> detected.

 * Public-key authenticated encryption (box)

> Imagine Alice wants something valuable shipped to her. Because it’s valuable, she wants to make sure it arrives securely (i.e. hasn’t been opened or
> tampered with) and that it’s not a forgery (i.e. it’s actually from the sender she’s expecting it to be from and nobody’s pulling the old switcheroo).

> One way she can do this is by providing the sender (let’s call him Bob) with a high-security box of her choosing. She provides Bob with this box, and
> something else: a padlock, but a padlock without a key. Alice is keeping that key all to herself. Bob can put items in the box then put the padlock onto
> it. But once the padlock snaps shut, the box cannot be opened by anyone who doesn’t have Alice’s private key.

> Here’s the twist though: Bob also puts a padlock onto the box. This padlock uses a key Bob has published to the world, such that if you have one of Bob’s
> keys, you know a box came from him because Bob’s keys will open Bob’s padlocks (let’s imagine a world where padlocks cannot be forged even if you know the
> key). Bob then sends the box to Alice.

> In order for Alice to open the box, she needs two keys: her private key that opens her own padlock, and Bob’s well-known key. If Bob’s key doesn’t open the
> second padlock, then Alice knows that this is not the box she was expecting from Bob, it’s a forgery.

> This bidirectional guarantee around identity is known as mutual authentication.

(both quotes from the excellent [PyNaCl Documentation](https://pynacl.readthedocs.io/en/latest/public/) )

These two primitives are formally known as `x25519-xsalsa20-poly1305` and `xsalsa20-poly1305`, widely implemented, almost understandable, and are generally agreed to be "good."

But even with the technical capacity to encrypt one's memes and love letters in such a capacity that ["nobody"]() can read them, at least [until quantum computers grow up] - we're still left with open questions.

Some "hard problems" in the technical space include...

 * key generation
   * frontend or backend? optional or required?
 * key validation and exchange
   * what if a user forgets their key? how is the key protected in transit?
 * detecting and preventing backdoor insertion in the backend
   * what if the API doesn't change at all, but every post from a hard-coded IP range is forwarded to fbi.gov?
 * detecting and preventing backdoor insertion in the frontend
   * what if the backend doesn't change at all, but your employer man-in-the-middles the TLS connection and replaces the frontend with a page that forwards all uploads to fbi.gov?

Some harder problems in differently-technical spaces include...

 * how is content moderated?
   * how are doxx removed?
   * how are objectionable images removed?
 * what are the consequences of giving anon an illusion of power?
 * what recourse does an admin have to deplatform abusers?
 * how can an admin incentivise appropriate stewardship of common-pool resources?

These are problems I did not want to solve, to release this tool.

These are problems that have, can, and should be discussed and approached - but with care and patience.

All these trains of thought echo throughout computing in general - it's easy to pick on the JavaScript ecosystem, and the Chromium monoculture - but it's not like there are better solutions available with the same benefits! There's no free lunch!

To excerpt liberally from ["Reflections on Trusting Trust"  - the Turing Award acceptance lecture given](https://users.ece.cmu.edu/~ganger/712.fall02/papers/p761-thompson.pdf) by [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson) - one of the forefathers of modern computing...

 > The moral is obvious. You can’t trust code that you did
 > not totally create yourself. (Especially code from com-
 > panies that employ people like me.) No amount of
 > source-level verification or scrutiny will protect you
 > from using untrusted code. In demonstrating the possi-
 > bility of this kind of attack, I picked on the C compiler.

 > I could have picked on any program-handling program
 > such as an assembler, a loader, or even hardware mi-
 > crocode. As the level of program gets lower, these bugs
 > will be harder and harder to detect. A well-installed
 > microcode bug will be almost impossible to detect.

Thompson wrote this in reference to his thought experiment, of a compiler designed to compile vulnerabilities into programs it builds - but the same sentiment extends here; it's awfully hard to prevent systemic defaults in the technology used to make a tool, from fundamentally trashing the assumptions underpinning the security model.


So, rather than overextend in effort to provide a probably-false sense of security, the underlying model can be summarised.

 * GetPost trades fancy encryption for simple behavior.
 * [80 bits](https://security.stackexchange.com/questions/69374/is-an-80-bit-password-good-enough-for-all-practical-purposes) of entropy secures your posts from being accessed or deleted by third parties. This is better than most passwords.
 * No technical features have been added which might serve to try and prevent a GetPost administrator from editing or deleting your content.
 * Cloudflare has the capacity and occasional inclination to [view](https://web.archive.org/web/20210303133004/https://community.cloudflare.com/t/how-secure-is-my-javascript-workers-source-code-from-cloudflare-employees/176398/19) the source of customer applications in deployment. On the other hand, they "don’t look at data in KV."


### Hacking

It's free and easy to get started with your own GetPost instance, either on a domain you already own, or a free "*.workers.dev" subdomain.

Because I trust you, I included a set of credentials allowing anyone to deploy to "https://staging.getpost.workers.dev" - as well as a set of end-to-end tests,
and lots of source code comments. Also spared interested parties from painful toolchain misadventures!

GetPost doesn't require the use of Cloudflare's Wrangler tool, the Node Package Manager, or a Rust buildchain. It does require `curl`, `python3`, and a
Linux-like environment (termux or WSL should work.).

To keep the main worker.js file managable, a simple well documented Python script - `autoinsert.py` - loads files from the `deps` folder into `worker.js` to make `worker.packed.js`.

The `deploy.sh` script calls autoinsert.py to assemble the packed worker, loads credentials from a file in the local directory, and uploads the
`worker.packed.js` file to Cloudflare.

You can get started by cloning this repository, making a small edit to `worker.js` or one of the resources in `deps` - and running `./deploy.sh staging`.

This loads the credentials from the `.staging` file, assembles your changes, and uploads the file.

Your script will then start running on "https://staging.getpost.workers.dev" - and you can verify it works as expected by running `./test.sh staging`

This loads other values from the `.staging` file, makes a series of requests to the the staging URL, and prints "SUCCESS" if the responses to the inputs are
all correct.

Be excellent to one another, and follow the instructions in SETUP.md to create your own account with your own credentials, if you intend to do any real work -
after all, other folks may also avail themselves of the workers deploy API key!

### Setup Your Own!

To get started, go to https://workers.dev and sign up or sign in.

A free account works fine, offering 100k reads a day, and 1000 uploads.

<img src="https://getpost.bitsandpieces.io/post?key=01F02FEZJGGBJNFBN81EMBVN9G&raw" width="500px">

Navigate to the KV section under Workers, and add a new KV instance, name it something descriptive, or "NAMESPACE".

<img src="https://public.getpost.workers.dev/post?key=01F02FQH631DXZZP401AMRHAJH&raw" width="500px">

Create a Worker.

<img src="https://public.getpost.workers.dev/post?key=01F02F9AB4YPK80W46HPS56BF7&raw" width="500px">

Deploy it, and then exit the editor, rename it to something useful..
<img src="https://public.getpost.workers.dev/post?key=01F02J5TFS8NVJYG50DABWDJ9W&raw" width="500px">


Edit the worker settings, adding a "KV Namespace Binding" - from the namespace you created, to the word "NAMESPACE"

This is labeled as:


> Bind an instance of a KV Namespace to access its data in a Worker.

<img src="https://public.getpost.workers.dev/post?key=01F02G38TWT0J5DGYZ6EKBBPNJ&raw" width="500px">


Create an API key to deploy your worker by opening https://dash.cloudflare.com/profile/api-tokens .

The token needs to edit the worker scripts and edit the worker KV. Different permissions may be useful, depending upon your exact use case.

<img src="https://getpost.bitsandpieces.io/post?key=01F02G74Y9XFP9XTY9B962V260&raw" width="500px">

Copy the example `.staging` file to a new name, ie `.mydeploy`

Edit it, removing the hashes (for now) and replacing values with:

 * your account ID (from the URL, or the box on the side of the workers pane)
 * your cloudflare API key
 * your URL, ie `https://xray.yankee.workers.dev`

You should then be able to run `./deploy.sh mydeploy` and `./test.sh mydeploy` - once you're happy with the state of your deploy via manual testing, you can
add hashes to the appropriate spots in `.mydeploy` and verify future modifications don't break key functionality!
