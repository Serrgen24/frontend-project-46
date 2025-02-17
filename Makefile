install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npx jest --watchAll;

test-coverage:
	npx jest --coverage

start:
	node ./bin/index.js __fixtures__/file1.json __fixtures__/file2.json

yml:
	node ./bin/index.js __fixtures__/file1.yml __fixtures__/file2.yaml
	node ./bin/index.js __fixtures__/file1.json __fixtures__/file2
	