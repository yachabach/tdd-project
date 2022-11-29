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
        let total = moneys.reduce( (sum, money) => {
            return sum + convert(money, currency);
        }, 0);
        return create(total, currency)
    }

    return { add, evaluate }
}

module.exports = Portfolio; 