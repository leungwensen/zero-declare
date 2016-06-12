'use strict';
const c3mro = require('./c3mro');
const declare = require('./declare');

declare.c3mro = c3mro;
declare.c3mroMerge = c3mro;

module.exports = declare;
