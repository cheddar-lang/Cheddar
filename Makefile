default:
	babel --minify
build:
	babel
install:
	./bin/install
test:
	babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/mocha/bin/_mocha
clean:
	rm -rf ./dist/
 .PHONY: test
