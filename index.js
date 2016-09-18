'use strict';

/**
 * record-locator
 * https://github.com/dkhr/record-locator
 * https://www.npmjs.com/package/record-locator
 *
 * Copyright (c) 2016 DKHR Limited (https://dkhr.com)
 * Licensed under the MIT license. See the LICENSE file for details.
 */

var INTEGERS_TO_CHARACTERS = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var CHARACTERS_TO_INTEGERS = {
	0: 21,
	1: 15,
	2: 0,
	3: 1,
	4: 2,
	5: 3,
	6: 4,
	7: 5,
	8: 6,
	9: 7,
	A: 8,
	B: 22,
	C: 9,
	D: 10,
	E: 11,
	F: 12,
	G: 13,
	H: 14,
	I: 15,
	J: 16,
	K: 17,
	L: 18,
	M: 19,
	N: 20,
	O: 21,
	P: 22,
	Q: 23,
	R: 24,
	S: 12,
	T: 25,
	U: 26,
	V: 27,
	W: 28,
	X: 29,
	Y: 30,
	Z: 31
};

var TOTAL_CHARACTERS = INTEGERS_TO_CHARACTERS.length;
var RADIX = 10;

module.exports = {
	/**
	 * Encodes an integer into a record locator string
	 *
	 * @param  {Number} recordLocator must be a positive integer
	 * @return {String}
	 */
	encode: function (recordLocator) {
		var integers = [];
		if (parseInt(recordLocator, RADIX) > 0) {
			while (recordLocator !== 0) {
				integers.unshift(recordLocator % TOTAL_CHARACTERS);
				recordLocator = parseInt(recordLocator / TOTAL_CHARACTERS, RADIX);
			}

			return integers.map(function (currentValue) {
				return INTEGERS_TO_CHARACTERS[currentValue];
			}).join('');
		}

		throw new Error('Argument is not a positive integer');
	},

	/**
	 * Decodes a record locator string back into an integer
	 *
	 * @param  {String} recordLocator
	 * @return {Number}
	 */
	decode: function (recordLocator) {
		if (/^[0-9A-Z]+$/i.test(recordLocator)) {
			recordLocator = recordLocator.toString().toUpperCase().split('');

			var integer = 0;
			recordLocator.forEach(function (character) {
				var characterInteger = CHARACTERS_TO_INTEGERS[character];
				integer = (integer * TOTAL_CHARACTERS) + characterInteger;
			});

			return integer;
		}

		throw new Error('Argument is not a valid record locator string');
	}
};
