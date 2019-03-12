const fc = require('fast-check');
const {
  encode,
  decode,
  __test: {
    CHARACTERS_TO_INTEGERS,
    INTEGERS_TO_CHARACTERS,
  },
}= require('../index');

const DID_NOT_THROW = Symbol()

describe('properties', () => {
	it('is a bijection', () => {
		fc.assert(fc.property(
			fc.integer(1, Number.MAX_SAFE_INTEGER),
			seed => decode(encode(seed)) === seed
		))
	});

  it('encodes integers into record locator strings', () => {
		fc.assert(fc.property(
			fc.integer(1, Number.MAX_SAFE_INTEGER),
			seed =>
        encode(seed).split('').forEach(letter =>
          INTEGERS_TO_CHARACTERS.includes(letter))
    ))
  });

  it('decodes record locator strings into integers', () => {
    fc.assert(fc.property(
      fc.constantFrom(...Object.keys(CHARACTERS_TO_INTEGERS)),
      locator => typeof decode(locator) === 'number'
    ))
  })

  it('applies canonicalisation to B, S, 0 and 1', () => {
		fc.assert(fc.property(
			fc.integer(1, Number.MAX_SAFE_INTEGER),
			seed =>
				seed === decode(
					encode(seed)
						.replace(/P/g, 'B')
						.replace(/F/g, 'S')
						.replace(/O/g, '0')
						.replace(/I/g, '1')
				)
    ))
	});

  it('returns in uppercase', () => {
		fc.assert(fc.property(
			fc.integer(1, Number.MAX_SAFE_INTEGER),
			seed => encode(seed) === encode(seed).toUpperCase()
		))
  });

  it('throws when given a negative value', () =>
    fc.assert(fc.property(
      fc.integer(-Number.MAX_SAFE_INTEGER, -1),
      badSeed => {
        try {
          encode(badSeed)
          throw DID_NOT_THROW
        }
        catch (err) {
          if (err === DID_NOT_THROW) return false
          return true
        }
      }
    ))
  );

  it('throws when decode() is given a value that is not composed of 0-9 and A-Z characters', () => {
    fc.assert(fc.property(
      fc.unicodeString(),
      badSeed => {
        try {
          decode(badSeed)
          throw DID_NOT_THROW
        }
        catch (err) {
          if (err === DID_NOT_THROW) return false
          return true
        }
      }
    ))
  })
});
