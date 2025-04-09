install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
ifeq ($(CI), true)
	npx jest
else
	npx jest --watchAll;
endif

test-coverage:
	npx jest --coverage
