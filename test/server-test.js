/* jslint node: true */
/* jslint mocha: true */
'use strict';

var assert = require('assert');

suite('Synchronous testing', function() {
    var val;

    setup(function(callback) {
        val = 3.14159;
        callback.call();
    });

    teardown(function() {
        val = undefined;
    });

    test('sync test', function() {
        asset.equal(3.14159, val);
    });
});