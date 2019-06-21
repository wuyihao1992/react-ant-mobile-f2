import React from 'react'
import { connect } from 'dva'

class FlexDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1>FlexDemo</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.account;

    return {
        user
    }
}

export default connect(mapStateToProps)(FlexDemo)
