const Money = require('./money');

const {create, amountOf, currencyOf} = Money();

const Portfolio = () => {

    let moneys = [];

    const exchangeRates = new Map();
    exchangeRates.set("EUR->USD", 1.2);
    exchangeRates.set("USD->KRW", 1100);


    const convert = (money, currency) => {
        const exchangeKey = currencyOf(money) + '->' + currency;

        if (currencyOf(money) === currency) {
            return amountOf(money)
        }
        return amountOf(money) * exchangeRates.get(exchangeKey)
    }

    const add = (...newMoneys)  => {
        moneys = moneys.concat(newMoneys)
    }

    const evaluate = (currency) => {
        let failures = [];
        let total = moneys.reduce( (sum, money) => {
            const convertedAmount = convert(money, currency)
            console.log('Converting to', currency, ' - converted amount = ', convertedAmount)
            if (!convertedAmount) {
                failures.push(currencyOf(money) + '->' + currency);
                return sum;
            }
            return sum + convertedAmount;
        }, 0);
        if (!failures.length) {
            return create(total, currency)
        }
        throw new Error('Missing exchange rate(s):[' + failures.join() + ']', )
        }

    return { add, evaluate }
}

module.exports = Portfolio; 