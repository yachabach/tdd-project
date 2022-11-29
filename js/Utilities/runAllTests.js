const { AssertionError } = require("assert")
const { assert } = require("console")

const runAllTests = (tests) => {

    Object.keys(tests)
        .filter(k => k.startsWith("test") && typeof tests[k] === 'function')
        .slice().reverse()
        .forEach(f => {
            console.log("Running: %s()", f)
            try {
                tests[f]()
            } catch (e) {
                if (e instanceof AssertionError) {
                    console.log(e)
                } else { throw e;}
            }
        })
}

module.exports = runAllTests