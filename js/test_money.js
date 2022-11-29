const assert = require('assert');
const Money = require('./money');
const Portfolio = require('./portfolio');
const runAllTests = require('./Utilities/runAllTests')

const { multiply, divide, create } = Money();

const MoneyTest = () => {

    const testMultiplication = () => {
        let tenEuros = create(100, "EUR");
        let twentyEuros = create(20, "EUR");
        assert.deepStrictEqual(multiply(tenEuros)(2), twentyEuros);
    }

    const testDivision = () => {
        let originalMoney = create(4002, "KRW");
        let actualMoneyAfterDivision = divide(originalMoney)(4);
        let expectedMoneyAfterDivision = create(1000.5, "KRW");
        assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);
    }

    const testAddition = () => {
        let fiveDollars = create(5, "USD");
        let tenDollars = create(10, "USD");
        let fifteenDollars = create(15, "USD");
        const portfolio = Portfolio();
        portfolio.add(fiveDollars, tenDollars);
        assert.deepEqual(portfolio.evaluate("USD"), fifteenDollars);        
    }

    return Object.freeze({ testAddition, testDivision, testMultiplication})

}

const tests = MoneyTest();
runAllTests(tests)




