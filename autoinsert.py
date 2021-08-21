"""Usage: autoinsert.py

    Embeds resources in a worker.js file from the "deps" directory.

"""

from os import supports_effective_ids
import sys, re, glob, os.path

# this was setup for use with docopt-ng... but not much value
# from docopt import docopt
# ARGS = docopt(__doc__)
# ARGS = {"INPUT_JS": "worker.js"}

if not os.path.exists("worker.js"):
    raise FileNotFoundError("Can't find worker.js in local directory.")
else:
    print("found worker.js...")

input_file_name = "worker.js"

# variables contain full contents of javascript file
INPUT_JS = open(input_file_name, "rb").read()

print(f"worker.js is {len(INPUT_JS)} bytes unpacked")

OUTPUT_JS = open(input_file_name, "rb").read()

substitutions = {}

base64_include_prefix = b"src: url("
base64_data_url_prefix = b"data:font/woff2;base64,"
base64_include_suffix = b") format('woff2')"

def read_file_from_deps(file_name):
    return open(f"./deps/{file_name.decode()}", "rb").read()

def escape_pattern(input_pattern):
    return input_pattern.replace(b"(", b"\(").replace(b")", b"\)")

# find all AUTOINSERT tagged fragments using a regular expression matching string-interpolated javascript
for fragment in re.findall(b"\`AUTOINSERT\w+\`", INPUT_JS):
    file_name = (
        fragment.strip(b"`").replace(b"__", b".").replace(b"AUTOINSERT_", b"").lower()
    )
    print("loading:", file_name.decode())
    file_substitution = read_file_from_deps(file_name)
    # include base64 strings from files in CSS
    if re.match(b".+\.css", file_name):
        """
        css base64 include syntax:

            src: url(data:font/woff2;base64,<BASE64STRING>) format('woff2');

        where <BASE64STRING> is a valid base64 encoding of a .woff2 font file
        """
        for base64_include in re.findall(
            escape_pattern(
                base64_include_prefix
                    + b".+"
                    + base64_include_suffix
            ),
            file_substitution
        ):
            base64_file = (
                base64_include
                    .replace(base64_include_prefix, b"")
                    .replace(base64_include_suffix, b"")
            )
            print("loading font:", base64_file.decode())
            file_substitution = file_substitution.replace(
                base64_include,
                base64_include_prefix
                    + base64_data_url_prefix
                    + read_file_from_deps(base64_file)
                    + base64_include_suffix
            )
    substitutions[fragment] = (
        b"`" + file_substitution + b"`"
    )


"""
js import syntax:
import "module-name";
where module-name:
 > The module to import from. This is often a relative or absolute path name to the .js file containing the module. Certain bundlers may permit or require the use of the extension; check your environment. Only single quoted Strings are allowed. Any ".min.js" or ".js" file matching will be inlined.

"""

for import_ in re.findall(b"import\ '\w+'", INPUT_JS):
    file_fragment = (
        import_.replace(b"import '", b"").replace(b".js", b"")[0:-1]
    ).decode("utf-8")
    print("loading import:", file_fragment)
    matches = glob.glob(f"./deps/{file_fragment}*.js")
    for match in matches:
        if match:
            print(match)
            substitutions[import_] = open(match, "rb").read()
            break

# iterate through all substitutions, applying them in turn
for phrase, substitution in substitutions.items():
    print(f"replacing {phrase.decode()} with {len(substitution)} bytes")
    OUTPUT_JS = OUTPUT_JS.replace(phrase, substitution)

# write modified file as "worker.packed.js"
output_file_name = input_file_name.replace(".js", ".packed.js")

open(output_file_name, "wb").write(OUTPUT_JS)
print(f"wrote: {output_file_name} ({len(OUTPUT_JS)} bytes)")
