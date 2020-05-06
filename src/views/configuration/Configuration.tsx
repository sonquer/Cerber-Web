import React, { Component } from "react";
import { connect } from 'react-redux';
import { RootState } from "../../app/store";

class Configuration extends Component<{match: any}, {}> {
    render() {
        return (<div>{JSON.stringify(this.props.match.params)}</div>);
    }
}


const mapStateToProps = (state: RootState) => {
    return {};
}

const mapDispatchToProps = (dispatch: any) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);