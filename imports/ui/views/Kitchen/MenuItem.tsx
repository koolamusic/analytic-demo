import React from 'react'
import { Input as Field, Button } from '@chakra-ui/core'

const WizardFormFirstPage: React.FunctionComponent = (props: any) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="firstName"
                type="text"
                size="lg"
                placeholder="First Name"
            />
            <Field
                name="lastName"
                type="text"
                size="lg"
                placeholder="Last Name"
            />
            <div>
                <Button type="submit" className="next">   Next </Button>
            </div>
        </form>
    )
}

export default WizardFormFirstPage