import React from 'react'
import { useHistory } from 'react-router-dom';

import { Button, Select, Box, Heading } from '@chakra-ui/core'

const OriginForm: React.FunctionComponent = (props: any) => {
    const history = useHistory();

    return (
        <Box p={4}>
            <Heading as="h4" size="md">Please Select Your Country</Heading>
            <br />
            <Select placeholder="Select Your Country" onChange={e => {
                props.updateState('country', e.target.value);
            }}>
                <option value="GH">Ghana</option>
                <option value="CM">Camaroon</option>
                <option value="NG">Nigeria</option>
            </Select>
            <br />
            <Button type="button" className="next" onClick={() => {
                history.push('/kitchen/recipe');
            }}>Next</Button>
        </Box>
    )
}

export default OriginForm