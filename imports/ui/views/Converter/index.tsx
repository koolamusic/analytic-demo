import React, { useState, ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactEventHandler } from 'react';
import { fx } from 'money';
import { ButtonGroup, Button } from "@chakra-ui/core"

const DEFAULT_FROM = 'GHC'
interface FxRate {
    from: string,
    to: string
}
const init: FxRate = {
    from: 'GHC',
    to: 'NGN'
}

// declare conversion rates
fx.base = 'GHC'
fx.rates = {
    "KES": 17.95,
    "CFA": 105.1,
    "ZAR": 2.58,
    "NGN": 64.2,
    "USD": 0.18,
    "GHC": 1,   // always include the base rate (1:1)
}


const Converter: React.FC = () => {
    const [value, setValue] = useState<number>(0)
    const [exchange, setExchange] = useState<FxRate>(init)
    console.log(value, exchange)

    // Change event for input form
    let handleChange: ReactEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: number = parseFloat(e.target.value);
        const rate: number = input && !NaN ? fx.convert(parseFloat(e.target.value), exchange) : 'ERROR!!';
        setValue(rate)
    }

    let changeCurrency = (value: any) => {
        console.log(fx.settings)
        const changeRate = exchange;
        changeRate.to = value;

        setExchange(changeRate)
        console.log();
    }
    fx.settings = exchange;


    return (
        <div>
            <p>Covert to your Currency</p>
            <ButtonGroup spacing="2">
                <Button onClick={() => changeCurrency('KES')}>KES</Button>
                <Button onClick={() => changeCurrency('NGN')}>NGN</Button>
                <Button onClick={() => changeCurrency('CFA')}>CFA</Button>
            </ButtonGroup>
            <h3>{value}</h3>
            <form>
                <input type="tel" placeholder="input todo" onChange={e => handleChange(e)} />
                <Button type="submit">Convert</Button>
            </form>
        </div>
    )
}

export default Converter