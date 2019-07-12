# Note: the first command becomes the default `make` target.
NPM_COMMANDS = build dev test lint setup print-schemas clean

.PHONY: $(NPM_COMMANDS)
$(NPM_COMMANDS):
	npm run $@
