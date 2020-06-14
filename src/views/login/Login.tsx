import React, { Component } from "react";
import { connect } from 'react-redux';
import styles from './Login.module.css';
import { Formik, Field, FormikHelpers } from 'formik';
import { RootState } from "../../app/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { loginAsync } from '../../features/account/accountSlice';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core"
import Header from "../../components/Header";

interface ILoginFormProperties {
    name: string,
    password: string
}

interface ILoginForm {
    field: any,
    form: {
        errors: {
            name: boolean,
            password: boolean
        },
        touched: {
            name: boolean,
            password: boolean
        }
    }
}

interface ILoginProps {
    loginAsync: any,
    loginError: string | null
}

class Login extends Component<ILoginProps, {}> {
    render() {
        return (
            <div>
                <Header />
                {this.props.loginError != null ? this.loginErrorWindow() : null}
                <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" className={styles.loginWindow}>
                    <Formik
                        initialValues={{ name: '', password: '' } as ILoginFormProperties}
                        onSubmit={async (values: ILoginFormProperties, actions: FormikHelpers<ILoginFormProperties>) => {
                            const { loginAsync } = this.props;
                            await loginAsync();
                            actions.setSubmitting(false);
                        }}>
                        {(props: any) => (
                            <form onSubmit={props.handleSubmit}>
                            <Field name="name">
                                {({ field, form }: ILoginForm) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor="name">Login</FormLabel>
                                        <Input {...field} id="name" placeholder="name" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form }: ILoginForm) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <Input {...field} id="password" placeholder="password" type="password" />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                variantColor="teal"
                                isLoading={props.isSubmitting}
                                type="submit">
                                Submit
                            </Button>
                            </form>
                        )}
                    </Formik>
                </Box>
            </div>
        );
    }

    loginErrorWindow() {
        const { loginError } = this.props;

        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Error!</AlertTitle>
                <AlertDescription>{loginError}</AlertDescription>
            </Alert>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.account.token,
        loginError: state.account.loginError
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ loginAsync }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)