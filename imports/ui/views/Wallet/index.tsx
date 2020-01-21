import React from 'react'
import { Button } from '@chakra-ui/core'
import CountUp from 'react-countup'

interface WalletState {
    initialBalance: number,
    balance: number
}
export default class Wallet extends React.Component {
    state: WalletState = {
        initialBalance: 10,
        balance: 25455
    }

    // componentDidMount () {
    //     const script = document.createElement("script");
    //     script.src = "https://use.typekit.net/foobar.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    // }

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
        const { initialBalance, balance } = this.state
        return (
            <div>
                <h1>Your Wallet</h1>
                <h4>You currently have</h4>
                <p>in your account</p>

                <CountUp
                    className="account-balance"
                    start={initialBalance}
                    end={balance}
                    duration={1}
                    delay={0}
                    separator=", "
                    decimals={2}
                    decimal="."
                    prefix="₵ "
                    suffix=" in your wallet"
                    onEnd={() => console.log('Ended! 👏')}
                    onStart={() => console.log('Started! 💨')}
                />

                <section>
                    <Button onClick={this.generateFunds}>Fund your Wallet</Button>
                </section>
            </div>
        )
    }
}