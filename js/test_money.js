const assert = require('assert');
const Money = require('./money');
const Portfolio = require('./portfolio');
const runAllTests = require('./Utilities/runAllTests');
const Bank = require('./bank');

const { multiply, divide, create } = Money();

const oneDollar = create(1, "USD");
const fiveDollars = create(5, "USD");
const tenDollars = create(10, "USD");
const fifteenDollars = create(15, "USD");

const oneEuro = create(1, "EUR")
const tenEuros = create(10, "EUR");
const twentyEuros = create(20, "EUR");

const oneWon = create(1, "KRW")
const elevenHundredWon = create(1100, "KRW");

let yakBank;
let expectedValue;
let expectedError;



const MoneyTest = () => {

    const setup = () => {

        yakBank = Bank();
        yakBank.addExchageRate("EUR", "USD", 1.2)
        yakBank.addExchageRate("USD", "KRW", 1100)
    }

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
        assert.deepEqual(taPortfolio.evaluate(yakBank, "USD"), fifteenDollars);        
    }

    const testAdditionOfDollarsAndEuros = () => {
        const tadPortfolio = Portfolio();
        tadPortfolio.add(fiveDollars, tenEuros);
        const tadExpectedValue = create(17, "USD")
        assert.deepStrictEqual(tadPortfolio.evaluate(yakBank, "USD"), tadExpectedValue)
    }

    const testAdditionOfDollarsAndWons = () => {
        const dollarWonPortfolio = Portfolio();
        dollarWonPortfolio.add(oneDollar, elevenHundredWon)
        expectedValue = create(2200, "KRW")
        assert.deepStrictEqual(dollarWonPortfolio.evaluate(yakBank, "KRW"), expectedValue)
    }

    const testAdditionWithMissingExchangeRates = () => {
        missingRatePortfolio = Portfolio();
        missingRatePortfolio.add(oneDollar, oneEuro, oneWon)
        expectedError = new Error('Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]')
        assert.throws(() => {missingRatePortfolio.evaluate(yakBank, "Kalganid")}, expectedError)
    }

    const testConversion = () => {
        const convertedUSD = yakBank.convert(fiveDollars, "USD")
        assert.deepStrictEqual(convertedUSD, fiveDollars)
        yakBank.addExchageRate("EUR", "USD", 1.3)
        assert.deepStrictEqual(create(1.3, "USD"), yakBank.convert(oneEuro, "USD")) 
    }

    return Object.freeze({ 
                        setup,
                        testAddition, 
                        testDivision, 
                        testMultiplication,
                        testAdditionOfDollarsAndEuros,
                        testAdditionOfDollarsAndWons,
                        testAdditionWithMissingExchangeRates,
                        testConversion
                    })

}

const tests = MoneyTest();
runAllTests(tests)




