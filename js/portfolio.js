const Money = require('./money');

const {create, valueOf} = Money();

const Portfolio = () => {

    let moneys = [];

    const add = (...newMoneys)  => {
        moneys = moneys.concat(newMoneys)
    }

    const evaluate = (currency) => {
        let total = moneys.reduce( (sum, money) => {
            return sum + valueOf(money);
        }, 0);
        return create(total, currency)
    }

    return { add, evaluate }
}

module.exports = Portfolio;