# This Makefile is a wrapper around the scripts from `package.json`.
# https://github.com/lgarron/Makefile-scripts

# Note: the first command becomes the default `make` target.
NPM_COMMANDS = build build-main build-types build-extended build-extended-types build-browser-global build-bin build-demo build-inspector dev dev-inspector clean test setup lint format prepack postpublish

.PHONY: $(NPM_COMMANDS)
$(NPM_COMMANDS):
	npm run $@

# We write the npm commands to the top of the file above to make shell autocompletion work in more places.
DYNAMIC_NPM_COMMANDS = $(shell cat package.json | npx jq --raw-output ".scripts | keys_unsorted | join(\" \")")
.PHONY: update-Makefile
update-Makefile:
	sed -i "" "s/^NPM_COMMANDS = .*$$/NPM_COMMANDS = ${DYNAMIC_NPM_COMMANDS}/" Makefile

VERSION=$(shell cat package.json | npx jq --raw-output ".version")

.PHONY: format-bin
format-bin:
	echo "#!/usr/bin/env node\nconst version = \"${VERSION}\";" > /tmp/webauthn-json-bin.tmp.js
	cat dist/bin/webauthn-json-bin.js >> /tmp/webauthn-json-bin.tmp.js
	cp /tmp/webauthn-json-bin.tmp.js dist/bin/webauthn-json-bin.js
	chmod +x dist/bin/webauthn-json-bin.js
