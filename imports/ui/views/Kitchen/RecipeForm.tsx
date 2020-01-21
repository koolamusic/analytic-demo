import React from 'react'
import { Button, Box, Heading, Textarea } from '@chakra-ui/core'

const RecipeForm: React.FunctionComponent = (props: any) => {
    return (
        <Box p={4}>
            <Heading as="h4" size="md">Give Us Your Recipe</Heading>
            <br />
            <Textarea placeholder="Recipe Goes Here" onChange={e => {
                props.updateState('recipe', e.target.value);
            }} />
            <br />
            <Button type="button" className="next" onClick={() => {
                props.onSubmit();
            }}>Submit</Button>
        </Box>
    )
}

export default RecipeForm