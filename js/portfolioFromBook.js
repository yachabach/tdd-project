const Money = require('./money')

const {create} = Money();

class Portfolio {
    constructor(){
        this.moneys = [];
    }

    add(...moneys){
        this.moneys = this.moneys.concat(moneys);
        console.log("In portfolio: ", ...moneys)
    }

    evaluate(currency){
        let total = this.moneys.reduce( (sum, money) => {
            return sum + money.amount;
        }, 0)
        return create(total, currency)
    }
}

module.exports = Portfolio;