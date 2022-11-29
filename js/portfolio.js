const Money = require('./money');

const {create, amountOf, currencyOf} = Money();

const Portfolio = () => {

    let moneys = [];

    const convert = (money, currency) => {
        const eurToUsd = 1.2;
        if (currencyOf(money) === currency) {
            return amountOf(money)
        }
        return amountOf(money) * eurToUsd
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