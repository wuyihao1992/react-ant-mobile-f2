import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd-mobile';
import {showToast} from "../../../components/messenger";

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
                <Button type="warning" onClick={() => {showToast('toast', 'error')}}>warning</Button>
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
