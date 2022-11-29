const Money = require('./money')
const assert = require('assert')

const { multiply, divide, create } = Money()

const tenDollars = create(10, "USD");
console.log(tenDollars)
const twentyDollars = create(20, "USD");
assert.deepStrictEqual(multiply(tenDollars)(2), twentyDollars)