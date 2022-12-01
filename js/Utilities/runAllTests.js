const { AssertionError } = require("assert");

const failColor = '\x1b[31m';
const passColor = '\x1b[32m';
const reset = '\x1b[0m';

const runAllTests = (tests) => {

    Object.keys(tests)
        .filter(k => k.startsWith("test") && typeof tests[k] === 'function')
        .slice().reverse()
        .forEach(f => {
            console.log("\nRunning: %s()...", f)
            try {
                tests.setup();
                tests[f]();
                console.log(`${f}()......${passColor}PASSED${reset}`)
            } catch (e) {
                if (e instanceof AssertionError) {
                    console.log(`\n${failColor}TEST FAILED...${reset}`)
                    console.log(`${failColor}ASSERTION ERROR${reset}: ${e.message}`)
                    console.log("Expected Value: ", e.expected)
                    console.log("Actual Value: ", e.actual)
                } else { throw e;}
            }
            console.log("------------------")
        })
}

module.exports = runAllTests