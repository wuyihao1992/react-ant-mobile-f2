import React from 'react'
import { connect } from 'dva'
import { Button, WhiteSpace } from 'antd-mobile';

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
                <Button type="warning">warning</Button><WhiteSpace />
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
