import React, { ChangeEvent } from 'react';
import { InputGroup, Box, Link, Stack, Input, Button, InputRightElement } from '@chakra-ui/core'
import { Accounts } from 'meteor/accounts-base';


const Signup: React.FunctionComponent = (): any => {
    interface AuthInterface {
        username: string,
        password: string
    }
    const authInit: AuthInterface = {
        username: "",
        password: ""
    }
    const [show, setShow] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<AuthInterface>(authInit);
    const handleClick = () => setShow(!show);

    const handleChange = (input: string, event: any) => {
        let updatedValue: AuthInterface = value
        switch (input) {
            case 'password':
                updatedValue['password'] = event.target.value
                break;
            case 'username':
                updatedValue['username'] = event.target.value
                break;
            default:
                updatedValue = value
                break;
        }
        setValue(Object.assign(value, updatedValue));
        console.log(value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const options = value
        console.log("MEROS===>", options);
        Accounts.createUser(options, (err) => {
            if (err) {
                console.log(err);
                return alert('An Error Occured')
            }
            // else {
            return window.location.replace('/');
            // }
        });
    }


    return (
        <Box my="6">

            <form onSubmit={(e) => handleSubmit(e)}>
                <Stack spacing="6" >
                    <Input
                        size="lg"
                        type={'username'}
                        onChange={(e: any) => handleChange('username', e)}
                        placeholder="Enter Username"
                    />

                    <InputGroup size="lg">
                        <Input
                            pr="4.5rem"
                            size="lg"
                            onChange={(e: any) => handleChange('password', e)}
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Button type="submit" size='lg'>Signup</Button>
                    <Link href="/login">Have an account, Login</Link>

                </Stack>
            </form>
        </Box>
    );
}

export default Signup
