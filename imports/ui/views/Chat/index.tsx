import React, { useState, ChangeEvent, ReactEventHandler } from 'react';

import Message from './message';


const Chat: React.FC = () => {


    return (
        <div>
            <div class="hint-box-container ">
                <div class="hide-hint-button"></div>
                <div class="hint-box">
                    <h2>Hint</h2>
                    <div>You can send messages anonymously or tell us your name. To set your name, just send a message saying "My name is _____" and we'll introduce you!</div>
                </div>
            </div>

            <div class="messages-box">
                <div class="messages-scroll">
                    <div class="header">
                        <h1>Welcome to the Chat Room!</h1>
                    </div>
                    <div class="messages">

                    </div>
                </div>
            </div>

            <div class="new-message-container">
                <form>
                    <input type="text" class="message-input" placeholder="Type your message here..."></input><button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat
