const Money = () => {

    let amount;
    let currency;

    const create = (amt, cur) => {
        amount = amt;
        currency = cur;
        return Object.freeze({amount, currency})
    }
    
    const multiply = (obj) => {
        return (multiplier) => {
            return create(obj.amount * multiplier, obj.currency)
        }
    }

    const divide = (obj) => {
        return (divisor) => {
            return create(obj.amount / divisor, obj.currency)
        }
    }

    const amountOf = (obj) => {return obj.amount;}
    const currencyOf = (obj) => {return obj.currency;}

    return Object.freeze({multiply, divide, create, amountOf, currencyOf});
}

module.exports = Money;
 