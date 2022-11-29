const { AssertionError } = require("assert")
const { assert } = require("console")

const runAllTests = (tests) => {

    Object.keys(tests)
        .filter(k => k.startsWith("test") && typeof tests[k] === 'function')
        .slice().reverse()
        .forEach(f => {
            console.log("\nRunning: %s()", f)
            try {
                tests[f]()
            } catch (e) {
                if (e instanceof AssertionError) {
                    console.log("\nASSERTION ERROR...")
                    console.log("Expected Value: ", e.expected)
                    console.log("Actual Value: ", e.actual, "\n")
                } else { throw e;}
            }
        })
}

module.exports = runAllTests