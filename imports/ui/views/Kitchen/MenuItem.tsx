import React from 'react'
import { Input as Field, Button } from '@chakra-ui/core'

const WizardFormFirstPage: React.FunctionComponent = (props: any) => {
    const onSubmit = (e: any): void => {
        e.preventDefault()
        console.log(props);
        return props.handleSubmit(e)
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>PAGE ONE</h1>
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