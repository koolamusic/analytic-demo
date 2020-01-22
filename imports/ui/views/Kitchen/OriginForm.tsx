import React from 'react'
import { useHistory } from 'react-router-dom';

import { Button, Select, Box, Heading } from '@chakra-ui/core'
import * as Analytics from '/imports/ui/analytics'

const OriginForm: React.FunctionComponent = (props: any) => {
    const history = useHistory();

    return (
        <Box p={4}>
            <Heading as="h4" size="md">Please Select Your Country</Heading>
            <br />
            <Select placeholder="Select Your Country" onChange={e => {
                props.updateState('country', e.target.value);
            }}>
                <option value="CM">Benin Republic</option>
                <option value="CM">Cameroon</option>
                <option value="CM">Cote D' Ivoire</option>
                <option value="GH">Ghana</option>
                <option value="CM">Kenya</option>
                <option value="NG">Nigeria</option>
                <option value="CM">South Africa</option>
            </Select>
            <br />
            <Button type="button" className="next" onClick={() => {
                history.push('/kitchen/recipe');
            }}>Next</Button>
        </Box>
    )
}

export default OriginForm