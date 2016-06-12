const assert = chai.assert;
const declare = require('../lib');
mocha.setup('bdd');

describe('declare', () => {
  it('exists', () => {
    assert.typeOf(declare, 'function');
  });
});

require('./declare.spec');

mocha.run();
