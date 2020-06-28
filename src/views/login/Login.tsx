import React, { Component } from "react";
import { connect } from 'react-redux';
import styles from './Login.module.css';
import { Formik, Field, FormikHelpers } from 'formik';
import { RootState } from "../../app/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { loginAsync, rememberMeOnChange } from '../../features/account/accountSlice';
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    FormErrorMessage, 
    Alert, 
    AlertIcon, 
    AlertTitle, 
    AlertDescription, 
    Checkbox
} from "@chakra-ui/core"
import Header from "../../components/Header";
import { Redirect } from "react-router-dom";

interface ILoginFormProperties {
    email: string,
    password: string
}

interface ILoginForm {
    field: any,
    form: {
        errors: {
            email: boolean,
            password: boolean
        },
        touched: {
            email: boolean,
            password: boolean
        }
    }
}

interface ILoginProps {
    rememberMeOnChange: (value: boolean) => void,
    loginAsync: (email: string, password: string) => void,
    loginError: string | null,
    loginCompleted: boolean
}

class Login extends Component<ILoginProps, {}> {
    render() {
        return (
            <div>
                {this.props.loginCompleted ? <Redirect to="/" /> : null}
                <Header />
                {this.props.loginError != null ? this.loginErrorWindow() : null}
                <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" className={styles.loginWindow}>
                    <Formik
                        initialValues={{ email: '', password: '' } as ILoginFormProperties}
                        onSubmit={async (values: ILoginFormProperties, actions: FormikHelpers<ILoginFormProperties>) => {
                            const { loginAsync } = this.props;
                            await loginAsync(values.email, values.password);
                            actions.setSubmitting(false);
                        }}>
                        {(props: any) => (
                            <form onSubmit={props.handleSubmit}>
                            <Field name="email">
                                {({ field, form }: ILoginForm) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input {...field} id="email" placeholder="email" tyle='email' />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                            <Box mt={2}>
                                <Checkbox variantColor="green" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                    this.props.rememberMeOnChange(ev.target.checked);
                                }}>Remember me</Checkbox>
                            </Box>
                            <Button
                                mt={2}
                                variantColor="teal"
                                isLoading={props.isSubmitting}
                                type="submit">
                                Login
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
        loginError: state.account.loginError,
        loginCompleted: state.account.loginCompleted
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ 
        loginAsync,
        rememberMeOnChange
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)