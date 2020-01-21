import React from 'react'
import { Button } from '@chakra-ui/core'

// interface WalletState {
//     balance: number
// }
export default class Wallet extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            balance: 25455
        }
    }

    generateFunds = (): void => {
        const RANDOM = [12, 15, 90, 3, 312, 313, 90, 3, 32];
        const HIGH = [245, 145, 190, 713, 1312, 6313, 2910, 5892, 832];
        const min = RANDOM[Math.floor(Math.random() * (RANDOM.length - 0)) + 0]
        const max = HIGH[Math.floor(Math.random() * (RANDOM.length - 0)) + 0]
        const newBalance: number = Math.floor(Math.random() * (+max - +min)) + +min;
        this.setState(
            {
                balance: newBalance
            }
        )

        // Should Call a Meteor Method to Update user Wallet
    }
    render() {
        const { balance } = this.state
        return (
            <div>
                <h1>Your Wallet</h1>
                <h4>You currently have</h4>
                <h1>{balance}</h1>
                <p>in your account</p>
                <section>
                    <Button onClick={this.generateFunds}>Fund your Wallet</Button>
                </section>
            </div>
        )
    }
}