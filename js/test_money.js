const assert = require('assert');
const Money = require('./money');
const Portfolio = require('./portfolio');
const runAllTests = require('./Utilities/runAllTests')

const { multiply, divide, create } = Money();

const MoneyTest = () => {

    let expectedValue;
    let expectedError;

    const oneDollar = create(1, "USD");
    const fiveDollars = create(5, "USD");
    const tenDollars = create(10, "USD");
    const fifteenDollars = create(15, "USD");

    const oneEuro = create(1, "EUR")
    const tenEuros = create(10, "EUR");
    const twentyEuros = create(20, "EUR");

    const oneWon = create(1, "KRW")
    const elevenHundredWon = create(1100, "KRW");

    const testMultiplication = () => {
        assert.deepStrictEqual(multiply(tenEuros)(2), twentyEuros);
    }

    const testDivision = () => {
        const originalMoney = create(4002, "KRW");
        const actualMoneyAfterDivision = divide(originalMoney)(4);
        const expectedMoneyAfterDivision = create(1000.5, "KRW");
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
        const tadExpectedValue = create(17, "USD")
        assert.deepStrictEqual(tadPortfolio.evaluate("USD"), tadExpectedValue)
    }

    const testAdditionOfDollarsAndWons = () => {
        const dollarWonPortfolio = Portfolio();
        dollarWonPortfolio.add(oneDollar, elevenHundredWon)
        expectedValue = create(2200, "KRW")
        assert.deepStrictEqual(dollarWonPortfolio.evaluate("KRW"), expectedValue)
    }

    const testAdditionWithMissingExchangeRates = () => {
        missingRatePortfolio = Portfolio();
        missingRatePortfolio.add(oneDollar, oneEuro, oneWon)
        expectedError = new Error('Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]')
        assert.throws(() => {missingRatePortfolio.evaluate("Kalganid")}, expectedError)
    }

    return Object.freeze({ 
                        testAddition, 
                        testDivision, 
                        testMultiplication,
                        testAdditionOfDollarsAndEuros,
                        testAdditionOfDollarsAndWons,
                        testAdditionWithMissingExchangeRates
                    })

}

const tests = MoneyTest();
runAllTests(tests)




