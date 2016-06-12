'use strict';
const lang = require('zero-lang');

function isGoodHead(head, rest) {
  let isGood = true;
  lang.some(rest, (lin) => {
    if (lang.indexOf(lin, head) > 0) {
      isGood = false;
    }
  });

  if (isGood) {
    lang.each(rest, (lin) => {
      if (lang.indexOf(lin, head) === 0) {
        lin.shift();
      }
    });
  }
  return isGood;
}

function eachHead(bases) {
  const result = [];
  let badLinearization = 0;

  while (bases.length) {
    const base = bases.shift();
    if (!base.length) {
      continue;
    }

    if (isGoodHead(base[0], bases)) {
      result.push(base.shift());
      badLinearization = 0;
    } else {
      badLinearization += 1;
      if (badLinearization === bases.length) {
        throw new TypeError('Bad Linearization');
      }
    }
    if (base.length) {
      bases.push(base);
    }
  }
  return result;
}

module.exports = function c3mroMerge() {
  const args = lang.toArray(arguments);
  return eachHead(lang.map(args, lang.toArray));
};

