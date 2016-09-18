var chai = require('chai');
var recordLocator = require('../index');

var should = chai.should();

describe('record locator module', function () {
	it('should encode integers into record locator strings', function () {
		recordLocator.encode(270600).should.equal('AAAA');
		recordLocator.encode(1048575).should.equal('ZZZZ');
		recordLocator.encode(345560).should.equal('DKHR');
	});

	it('should decode record locator strings back into integers', function () {
		recordLocator.decode('AAAA').should.equal(270600);
		recordLocator.decode('ZZZZ').should.equal(1048575);
		recordLocator.decode('DKHR').should.equal(345560);
	});

	it('should apply canonicalisation to B, S, 0 and 1', function () {
		recordLocator.encode(recordLocator.decode('BS01')).should.equal('PFOI');
	});

	it('should return decoded record locator strings in uppercase', function () {
		recordLocator.encode(recordLocator.decode('dkhr')).should.equal('DKHR');
	});

	describe('error handling', function () {
		it('should throw an error when encode() is given no argument', function () {
			(function () {
				recordLocator.encode();
			}).should.throw(Error);
		});

		it('should throw an error when decode() is given no argument', function () {
			(function () {
				recordLocator.decode();
			}).should.throw(Error);
		});

		it('should throw an error when encode() is given an empty value', function () {
			(function () {
				recordLocator.encode('');
			}).should.throw(Error);
		});

		it('should throw an error when decode() is given an empty value', function () {
			(function () {
				recordLocator.decode('');
			}).should.throw(Error);
		});

		it('should throw an error when encode() is given a value that is not number', function () {
			(function () {
				recordLocator.encode('example');
			}).should.throw(Error);
		});

		it('should throw an error when encode() is given a value that is not a positive integer', function () {
			(function () {
				recordLocator.encode(-1);
			}).should.throw(Error);

			(function () {
				recordLocator.encode(0);
			}).should.throw(Error);
		});

		it('should throw an error when decode() is given a value that is not composed of 0-9 and A-Z characters', function () {
			(function () {
				recordLocator.decode('A-B-C');
			}).should.throw(Error);
		});
	});
});
