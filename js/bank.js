const Money = require('./money')

const Bank = () => {

    const { create, amountOf, currencyOf } = Money();
    const exchangeRates = new Map()

    const addExchageRate = (currencyFrom, currencyTo, rate) => {
        const key = currencyFrom + '->' + currencyTo;
        exchangeRates.set(key, rate);
    }

    const convert = (money, currency) => {
        if (currency === currencyOf(money)) {
            return create(amountOf(money), currencyOf(money))
        }

        const exchangeKey = currencyOf(money) + '->' + currency;
        const rate = exchangeRates.get(exchangeKey)
        if (rate != undefined) {
            return create(amountOf(money) * rate, currency) 
        }
        throw new Error(exchangeKey)
    }

    return { addExchageRate, convert }
}

module.exports = Bank;