const assert = require('assert');
const Money = require('./money');
const Portfolio = require('./portfolio');
const runAllTests = require('./Utilities/runAllTests')

const { multiply, divide, create } = Money();

const MoneyTest = () => {

    let expectedValue

    const oneDollar = create(1, "USD");
    let fiveDollars = create(5, "USD");
    let tenDollars = create(10, "USD");
    let fifteenDollars = create(15, "USD");

    let tenEuros = create(10, "EUR");
    let twentyEuros = create(20, "EUR");

    const elevenHundredWon = create(1100, "KRW");

    const testMultiplication = () => {
        assert.deepStrictEqual(multiply(tenEuros)(2), twentyEuros);
    }

    const testDivision = () => {
        let originalMoney = create(4002, "KRW");
        let actualMoneyAfterDivision = divide(originalMoney)(4);
        let expectedMoneyAfterDivision = create(1000.5, "KRW");
        assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);
    }

    const testAddition = () => {

        const taPortfolio = Portfolio();
        taPortfolio.add(fiveDollars, tenDollars);
        assert.deepEqual(taPortfolio.evaluate("USD"), fifteenDollars);        
    }

    const testAdditionOfDollarsAndEuros = () => {
        const tadPortfolio = Portfolio();
        tadPortfolio.add(fiveDollars, tenEuros);
        let tadExpectedValue = create(17, "USD")
        assert.deepStrictEqual(tadPortfolio.evaluate("USD"), tadExpectedValue)
    }

    const testAdditionOfDollarsAndWons = () => {
        const dollarWonPortfolio = Portfolio();
        dollarWonPortfolio.add(oneDollar, elevenHundredWon)
        expectedValue = create(2200, "KRW")

        assert.deepStrictEqual(dollarWonPortfolio.evaluate("KRW"), expectedValue)
    }

    return Object.freeze({ 
                        testAddition, 
                        testDivision, 
                        testMultiplication,
                        testAdditionOfDollarsAndEuros,
                        testAdditionOfDollarsAndWons
                    })

}

const tests = MoneyTest();
runAllTests(tests)




