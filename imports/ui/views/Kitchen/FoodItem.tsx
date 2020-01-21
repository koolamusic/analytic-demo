import React from 'react'
import { useHistory } from 'react-router-dom';

import { Input as Field, Button, Box, Heading } from '@chakra-ui/core'

const FoodItem: React.FunctionComponent = (props: any) => {
    const history = useHistory();

    return (
        <Box p={4}>
            <Heading as="h4" size="md">Enter the Food and Nutritional Value</Heading>
            <br/>
            <Field
                name="food"
                type="text"
                size="lg"
                placeholder="Enter Your Food"
                onChange={e => props.updateState('food', e.target.value)}
            />
            <br/>
            <Field
                name="nutrition"
                type="text"
                size="lg"
                placeholder="Enter Nutritional Value"
                onChange={e => props.updateState('nutrition', e.target.value)}
            />
            <br/>
            <Button type="button" className="next" onClick={() => {
                history.push('/kitchen/country');
            }}>Next</Button>
        </Box>
    )
}

export default FoodItem