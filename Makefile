################################################################################
#                              Cheddar Makefile
# Available Targets:
#  default: Production build
#  build  : Development build
#  %.node : Builds binding/%
#  install: Installs to given path
#
# Phony targets:
#  clean  : Removed unecessary stuff from directory
#  test   : Performs tests
#  bench  : Performs benchmarks
#
################################################################################

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
TESTRUNNER=$(PREFIX)/babel-node
COVERAGE=$(PREFIX)/babel-istanbul
TEST=$(PREFIX)/_mocha
TFLAGS=cover $(TEST)

BENCHMARK=benchmark/

# Bindings
BINDING_SRC = $(wildcard bindings/*/binding.gyp)
BINDING_TARGETS = $(patsubst bindings/%/binding.gyp, %.node, $(BINDING_SRC))

## Rules
all: default

# The binding task
# Compiles all gyp bingings
# from bingings/foo/binding.gyp
%.node:
	node-gyp rebuild -C bindings/$*/

# The default task
# The **production** build
default: $(BINDING_TARGETS) $(JC)
	NODE_ENV=production $(JC) $(JCFLAGS) --minified --compact true
	$(BIN_MAKE)

# Development build task
# This builds and includes source maps
build: $(BINDING_TARGETS) $(JC)
	$(JC) $(JCFLAGS) --source-maps
	$(BIN_MAKE)

# Runs install with default method
# Perhaps pass args later?
install: ./bin/install
	./bin/install --method=path

# Runs browser_repl build for web REPL
# Uses browserify to compiled babelified code
# browser_build: $(JC)
# 	$(PREFIX)/browserify dist/cli/browser_repl.js -o Cheddar.js

# Performs testing, including coverage
# At the moment uses mocha for testing
# and babel-istanbul for coverage
test: $(TESTRUNNER) $(COVERAGE) $(TEST)
	$(TESTRUNNER) $(COVERAGE) $(TFLAGS)

benchmark: $(BENCHMARK) $(OUT)
	node $(BENCHMARK)

clean: $(OUT)
	rm -rf $(OUT)

.PHONY: test benchmark clean
