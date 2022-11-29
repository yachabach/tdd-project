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

    const valueOf = (obj) => {return obj.amount;}

    return Object.freeze({multiply, divide, create, valueOf});
    // return Object.freeze({amount, currency});
}

module.exports = Money;
 