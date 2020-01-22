import React from 'react'
import { Flex, Box } from "@chakra-ui/core"
// import { withTracker } from 'meteor/react-meteor-data'


export default class Message extends React.Component {

    render() {
        const { announcement, message } = this.props
        return (
            <Box>
                <div>Kwame_NAME <div> Today, TIME</div></div>
                {announcement ?
                    <React.Fragment>
                        {message} <div>Tada!!!</div>
                    </React.Fragment> :
                    <div>{message}</div>
                }
            </Box>
        )
    }
}

// export default withTracker(() => {

// })(Message)
