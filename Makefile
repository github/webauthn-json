# Note: the first command becomes the default `make` target.
NPM_COMMANDS = build dev

.PHONY: $(NPM_COMMANDS)
$(NPM_COMMANDS):
	cd src && npm run $@
