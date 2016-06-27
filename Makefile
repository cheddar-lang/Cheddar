PREFIX=./node_modules/.bin
SELF=$(lastword $(MAKEFILE_LIST))
## Compiler
# The compiler to use for the ES7 -> ES5 transformation
JC=$(PREFIX)/babel
# Location of files
SRC=src/
OUT=dist/
# The flags to pass to the compiler
JCFLAGS=$(SRC) -d $(OUT)
# The binary files to copy
BIN=cli/cheddar
EXE=cheddar
BIN_MAKE=$(foreach BIN_FILE,$(BIN),chmod 755 $(SRC)$(BIN_FILE) && cp $(SRC)$(BIN_FILE) $(OUT)$(BIN_FILE)${\n})

## Tests
TESTRUNNER=node
COVERAGEPATH=coverage
COVERAGE=$(PREFIX)/istanbul
TEST=$(PREFIX)/_mocha
TFLAGS=cover $(TEST)

## Rules
all: default

# The default task
# The **production** build
default: $(JC) $(SRC)
	$(JC) $(JCFLAGS) --minified
	$(BIN_MAKE)

# Development build task
# This builds and includes source maps
build: $(JC) $(SRC)
	$(JC) $(JCFLAGS) --source-maps
	$(BIN_MAKE)

# Runs install with default method
# Perhaps pass args later?
install: ./bin/install
	./bin/install --method=path

# Runs browser_repl build for web REPL
# Uses browserify to compiled babelified code
browser_build: $(JC) $(SRC)
	$(PREFIX)/browserify dist/cli/browser_repl.js -o Cheddar.js

# Performs testing, including coverage
# At the moment uses mocha for testing
# and babel-istanbul for coverage
test:
	@$(MAKE) -f $(SELF) build
	$(TESTRUNNER) $(COVERAGE) $(TFLAGS)
	$(PREFIX)/remap-istanbul -i $(COVERAGEPATH)/coverage.json -o $(COVERAGEPATH)/lcov-report -t html
clean:
	rm -rf ./dist/

.PHONY: test