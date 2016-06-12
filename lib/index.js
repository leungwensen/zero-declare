'use strict';
const lang = require('zero-lang');
const c3mroMerge = require('./c3mro');

function declare(/* name, superClasses, protoObj */) {
  const args = lang.toArray(arguments);
  const lin = '_linearization';
  const Tmp = function Tmp() {};
  const name = lang.isString(args[0]) ? args.shift() : '';
  let superClasses = lang.isArray(args[0]) || lang.isFunction(args[0]) ? args.shift() : [];
  superClasses = lang.isArray(superClasses) ? superClasses : [superClasses];
  const finalProtoObj = args[0] ? args.shift() : {};

  let bases = [];

  lang.each(superClasses, (clazz) => {
    clazz[lin] = clazz[lin] || [clazz];
    bases.push(clazz[lin]);
  });

  if (bases.length) {
    bases.push(superClasses);
    bases = c3mroMerge.apply(null, bases);
  }

  let ctor = function ctor() {};
  const tempConstructor = finalProtoObj.constructor;
  if (tempConstructor !== Object.prototype.constructor) {
    ctor = tempConstructor;
  }

  ctor[lin] = [ctor].concat(bases);
  ctor.parents = lang.toArray(bases);

  let protoObj = {};
  let uberClass;
  while ((uberClass = bases.pop())) {
    protoObj = lang.extend(protoObj, uberClass.prototype);
    Tmp.prototype = protoObj;
    protoObj.constructor = uberClass;
    protoObj = new Tmp();
  }

  ctor.className = name;
  ctor.prototype = protoObj;
  ctor.prototype.constructor = ctor;

  lang.extend(ctor.prototype, finalProtoObj);

  return ctor;
}

declare.c3mro = c3mroMerge;
declare.c3mroMerge = c3mroMerge;

module.exports = declare;
