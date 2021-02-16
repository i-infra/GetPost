## Welcome to the beta of GetPost!

### What? (is this?)

It's a spindly-legged spirit-child mashup of Imgur.com, gist.Github.com, http://sprunge.us, and darkhttpd.

It's stupid-simple simple file / note sharing, that's easy to use.

Instead of requiring users to setup a server of their own, GetPost allows HTML/JS-savvy individuals to setup and administer an extremely hackable (single-file!) service, hosted on Cloudflare, for free, for their communities.

 * Cloudflare has a record of punching Nazis.
 * Cloudflare already spends the electricity to run the servers this code runs on.
 * Cloudflare has a business model.
 * Cloudflare cares about security.

 TL;DR

 * I like the Cloudflare. They do their best. They're US based, but this is mostly fine; so am I.

 On the other hand...

 * Github backs ICE.
 * Imgur requires phone verification to use. And is probably creepy.
 * Github is literally Microsoft
 * http://sprunge.us can't be used by "your dad" and has a single-point-of-failure. And only does text.
 * Github backs ICE.

### GetPost

GetPost is built on Cloudflare Workers, as a very thin layer on top of Cloudflare's KV store to allow easy sharing of arbitrary resources, such as memes, poems, love-notes, DLLs, PDFs, etc...

From Cloudflare:

 > Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency, making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.

Neat.

 > Workers KV is generally good for use-cases where you need to write relatively infrequently, but read quickly and frequently. It is optimized for these high-read applications, only reaching its full performance when data is being frequently read. Very infrequently read values are stored centrally, while more popular values are maintained in all of our data centers around the world.

Perfect.

 > KV achieves this performance by being eventually-consistent. Changes may take up to 60 seconds to propagate. Workers KV isnâ€™t ideal for situations where you need support for atomic operations or where values must be read and written in a single transaction.

Fine.

> All values are encrypted at rest with 256-bit AES-GCM, and only decrypted by the process executing your Worker scripts or responding to your API requests.

Okay, I don't trust this too much, but that's cool.



### Why? (do I care)

Hearkening back to... eras before Github Gists became ubiquitous, it was common for enterprising computer-y people to setup a small webserver, for sharing odds
and ends with individuals online. This was nice, because it was trivial for to use (easy one-line SCP terminal commands, and your file is online!) - and
relatively flexible, but - if maintaining webservers was easy, SecDevOps wouldn't be a real word.

Running a server off your home computer is doable. I do it. But - if you're not careful, you expose your real-world location to third parties. Petty losers,
escalating online drama, can use your IP address, to knock your whole house offline. A blown breaker, or downed tree limb, can take your site offline. If you forget to
apply important security updates, random viruses/bots/worms can take your site offline. Sure, renting a cheap server in a computer warehouse can alleviate some
of these issues, but the cheapest computers are $/mo, and still require proper care and maitenance.

Depending upon your threat model, self-hosting services can be great. But for most people who use the internet, this is not an especialy viable option.

So, this service trades the ability to host on your own machine, for the ability to be deployed "for free" with only few mouse clicks, and a copy and paste.

This project trades the ability to self-host, for the ability to move fast, and stand on the shoulders of a relatively benign corporate
giant. Theoretically - without having to trust them! You kinda have to trust your GetPost admin, but I'm working on that by adding transparent support for
strong encryption, and ultimately, if you are worried about your admin snooping on you, run your own instance!

It's really easy.

### How?

Sign up for a free cloudflare account and make a worker via https://workers.dev.

Free tier covers 1GB of globally backed up / distributed storage, 1000 uploads/day, and 100k reads/day.

After that, it's $5/mo, for "lots of requests." After 100k clicks/day, hopefully you can find $5 and level up your game.

### Okay, so how do I actually use this??

The basic version deployed on https://getpost.bitsandpieces.io offers relatively few pieces of functionality.

The primary point of use is:

#### https://getpost.bitsandpieces.io/post

This page loads an incredibly simple bit of html with a single file select. It uploads it, and saves it - returning the share URL, the delete URL (don't visit
until you want to delete!) - and the expiry time (1 year).

```
GetPost saved 3916 bytes!
share link: http://getpost.bitsandpieces.io/post?key=01EYMS1DTBYAHCJNXBB8A4VP93_6a88a2dce9edc704a7d5fbf5369a1281ba24519216a55394e81419302664bb3a

save link to delete: http://getpost.bitsandpieces.io/delete?key=01EYMS1DTBYAHNICETRYLOLOL4

expires in: 1 year
```

#### You can also use it from the command line!

```
SPX:~/getpost$ curl -X POST --data-binary @../arts/dying\ is\ fine.png 'https://getpost.bitsandpieces.io/post'
GetPost saved 74532 bytes!
share link: https://getpost.bitsandpieces.io/post?key=01EYMS5VKW07DKHKZ6W5JMVCMG_0dc5cfbf9e95fbd313d05c208b5d4077d7fb9a81b1091680210ba319b9fd8594

save link to delete: https://getpost.bitsandpieces.io/delete?key=0NOYPLZDONTWHYWOULDUJMVCMH

expires in: 1 year
```

#### Raw Mode

By default the content is loaded in an HTML context, and dynamically decoded and inserted when the page is rendered. This is the magic that lets you upload markdown, but share
HTML.

If you see content errors, or want to embed GetPosted resources in other pages - add `&raw=true` (or even `&raw`) to the share URL. This will return a
best-guess mimetype (byte inspection code needs work, but handles the common cases) and the raw bytes from the original upload.

### What's the security model?

So there are three-ish "things" you have to trust, until I land my asymmetric encryption work.

Right now:

 * Trust Cloudflare to not lie or cheat.
 * Trust your GetPost admin not to lie or cheat.
 * Trust the computer you use it on not to lie.
 * Trust that the javascript markdown renderer, the one external dep I dynamically link, won't be bought out, I guess.

I'm gonna fill this section out, just, later.

We already have TLS in motion, AES-256 at rest. It's pretty OK, but I have backend access and can hypothetically edit your posts. Fixing this "soon".

### Where's the code? What next?

Code is uh, nuts. IDK. It's basically OK. I hate javascript. I'm sorry.

It's in a Gist here:

https://gist.github.com/infra-gf/afa898c66c63d98e95653c487d8cb2c4

I'm copypastaing it from the Cloudflare web editor periodically. SMH.

### What's next?

 * asymmetric crypto with tweetnacl, kinda was the point
 * PDFs in iframes, fixing some edge cases
 * operational transform editing - editing / versioning with binary diffs
 * pay someone to rebuild this in typescript, and rebuild it in ultra-minimal async python3
 * find some way of coming up wtih $5/mo not-out-of-my-pocket, to run this indefinitely, at scale, for my friends
 * twitter bot lol? signal integration?
 * bug reports, feature requests, halp - plz someone help.
 * more docs IG