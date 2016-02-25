all:
	npm install

test:
	npm test

zip: all test
	rm -f s3-to-cloudwatch.zip
	zip -r s3-to-cloudwatch.zip index.js node_modules
