import React from 'react'
import { connect } from 'dva'

class ChartDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h5>ChartDemo</h5>
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

export default connect(mapStateToProps)(ChartDemo)
