import React, { useState, ChangeEvent, ReactEventHandler } from 'react';
import { fx } from 'money';
import { Input, Box, Heading, ButtonGroup, InputRightElement, Button, InputGroup } from "@chakra-ui/core"

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
    const [input, setInput] = useState<any>(0)
    const [value, setValue] = useState<number>(0)
    const [exchange, setExchange] = useState<FxRate>(init)
    console.log(value, exchange, input)

    // Change event for input form
    let handleChange: ReactEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: number = parseFloat(e.target.value);
        const rate: number = input && !NaN ? fx.convert(parseFloat(e.target.value), exchange) : '0';
        setValue(rate)
        setInput(input)
    }

    let changeCurrency = (value: string) => {
        const changeRate = exchange;
        changeRate.to = value;
        setExchange(changeRate)
        console.log(value, exchange, input)
        handleConversion()

    }
    let handleConversion = (): void => {
        const convertedRate: number = input && !NaN ? fx.convert(parseFloat(input), exchange) : '0';
        setValue(convertedRate)
    }

    return (
        <Box my="4">
            <h3>Convert to your Local Currency</h3>
            <Box my='2'>

                <ButtonGroup spacing="2">
                    <Button onClick={() => changeCurrency('KES')}>KES</Button>
                    <Button onClick={() => changeCurrency('NGN')}>NGN</Button>
                    <Button onClick={() => changeCurrency('CFA')}>CFA</Button>
                </ButtonGroup>
            </Box>
            <Box my='5'>
                <Heading as="h1" size="2xl">{value}</Heading>
            </Box>

            <form onSubmit={handleConversion}>
                <InputGroup size='lg'>

                    <Input type="tel" placeholder="Input Number" onChange={e => handleChange(e)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm">₵</Button>
                    </InputRightElement>
                </InputGroup>
            </form>
        </Box>
    )
}

export default Converter