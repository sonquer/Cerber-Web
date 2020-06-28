import React, { Component } from "react";
import { RootState } from "../app/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

interface IAuthenticationProps {
    token: string | null
}

class Authentication extends Component<IAuthenticationProps> {
    render() {
        if (this.props.token === null) {
            return <Redirect to='/login' />
        }

        return null;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.account.token
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)