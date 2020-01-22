import React from 'react'
import { useHistory } from 'react-router-dom';

import { RadioGroup, Radio, Box, Heading, Button } from '@chakra-ui/core'

const WizardFormFirstPage: React.FunctionComponent = (props: any) => {
    const history = useHistory();

    return (
        <Box p={4}>
            <Heading as="h4" size="md">Select the Menu to Change</Heading>
            <p>Use the form to suggest any meal, you'd like to have on the kitchen Menu</p>
            <br />
            <RadioGroup onChange={e => {
                props.updateState('menu', e.target.value);
            }}>
                <Radio value="breakfast">BreakFast</Radio>
                <Radio value="lunch">Lunch</Radio>
                <Radio value="supper">Supper</Radio>
            </RadioGroup>
            <br />
            <Button type="button" className="next" onClick={() => {
                history.push('/kitchen/food');
            }}>Next</Button>
        </Box>
    );
}

export default WizardFormFirstPage