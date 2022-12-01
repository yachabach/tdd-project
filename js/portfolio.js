const Money = require('./money');

const {create, amountOf, currencyOf} = Money();

const Portfolio = () => {

    let moneys = [];

    const add = (...newMoneys)  => {
        moneys = moneys.concat(newMoneys)
    }

    const evaluate = (bank, currency) => {
        let failures = [];
        let total = moneys.reduce( (sum, money) => {
            try {
                const convertedAmount = bank.convert(money, currency);
                return sum + amountOf(convertedAmount);
            } catch (e) {
                failures.push(e.message);
                return sum;
            }
        }, 0);
        if (!failures.length) {
            return create(total, currency)
        }
        throw new Error('Missing exchange rate(s):[' + failures.join() + ']', )
        }
    return { add, evaluate }
}

module.exports = Portfolio; 