# record-locator [![Build Status](https://travis-ci.org/dkhr/record-locator.svg?branch=master)](https://travis-ci.org/dkhr/record-locator)
A Node.js module that encodes integers into a short, easy to read and pronounceable string.

## What is a 'Record Locator'?
A record locator is an alphanumeric string that represents an integer.

A record locator can be used to provide human-readable representation of a database primary key, providing users with a short, easy to read and pronounceable string. Record locators can be useful when you need to generate a document reference, confirmation number, reservation number or a booking references to share with your users.

*[DKHR](https://dkhr.com/)* uses record locators to provide [Taxfox](https://taxfox.co.uk/) customers an easy way to  reference PDF documents associated to them.

### Examples
* The integer `8128` encodes to the record locator `9Y2`
* The integer `3141592` encodes to the record locator `4ZVYR`
* The integer `355688197484` encodes to the record locator `DEADBEEF`

You can encode more than 33.5 million integers in a five-character record locator: the largest five-character record locator, `ZZZZZ`, represents the integer `33554431`.

For more information, see [Wikipedia's record locator article](https://en.wikipedia.org/wiki/Record_locator).

## Installation
Use Node.js's default package manager ([npm](https://docs.npmjs.com/getting-started/what-is-npm)) to install the record-locator module into your project:
```
npm install --save record-locator
```

## Usage
Encoding an integer into a record locator string:
```javascript
var recordLocator = require('record-locator');
var documentId = 3141592;
var documentReference = recordLocator.encode(documentId);

// console.log output: 4ZVYR
console.log(documentReference);
```

Decoding a record locator string back into an integer:
```javascript
var recordLocator = require('record-locator');
var documentReference = '4ZVYR';
var documentId = recordLocator.decode(documentReference);

// console.log output: 3141592
console.log(documentReference);
```

### Error Handling
The record-locator module will throw an exception error under the following circumstances:
* `encode()` or `decode()` is called with no argument
* `encode()` or `decode()` is called with an empty value
* `encode()` is called with a value that is not number
* `encode()` is called with a value that is not a positive integer

You can use a standard `try/catch` block to handle these error scenarios:

```javascript
var recordLocator = require('record-locator');
var invalidDocumentId = -12345;
var documentReference;

try {
	documentReference = recordLocator.encode(invalidDocumentId);
} catch (e) {
	// console.log output: [Error: Argument is not a positive integer]
	console.log(e);
}

```

For more information on error handling, see Joyent's reference: [Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)

## Character Canonicalization
Certain characters, such as the letters "B" and "S", as well as the numbers 0 (zero) and 1 (one), are not used in record locators as there is the potential for confusion with other characters.

These specific characters are automatically replaced by `encode()` and `decode()` as follows:

| Character | Replacement Character |
|-----------|-----------------------|
| B         | P                     |
| S         | F                     |
| 0         | O                     |
| 1         | I                     |

## Related Libraries
The following third-party libraries provide alternative implementations that can also encode and decode record locators:
* Jesse Vincent's Perl module: [Number::RecordLocator](http://search.cpan.org/~jesse/Number-RecordLocator/lib/Number/RecordLocator.pm)
* Oliver Jakoubek's PHP library: [php-recordlocator](https://github.com/jakoubek/php-recordlocator)