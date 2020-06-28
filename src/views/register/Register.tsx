import React, { Component } from "react";
import { connect } from 'react-redux';
import styles from './Register.module.css';
import { Formik, Field, FormikHelpers } from 'formik';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core"
import { RootState } from "../../app/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { registerAsync } from '../../features/account/accountSlice';
import Header from "../../components/Header";
import { Redirect } from "react-router-dom";

interface IRegisterFormProperties {
    email: string,
    password: string
}

interface IRegisterForm {
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

interface IRegisterProps {
    registerAsync: (email: string, password: string) => void,
    registrationError: string | null,
    registrationCompleted: boolean
}

class Register extends Component<IRegisterProps, {}> {
    render() {
        return (
            <div>
                {this.props.registrationCompleted ? <Redirect to="/login" /> : null}
                <Header />
                {this.props.registrationError != null ? this.registrationErrorWindow() : null}
                <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" className={styles.registerWindow}>
                    <Formik
                        initialValues={{ email: '', password: '' } as IRegisterFormProperties}
                        onSubmit={async (values: IRegisterFormProperties, actions: FormikHelpers<IRegisterFormProperties>) => {
                            const { registerAsync } = this.props;
                            await registerAsync(values.email, values.password);
                            actions.setSubmitting(false);
                        }}>
                        {(props: any) => (
                            <form onSubmit={props.handleSubmit}>
                            <Field name="email">
                                {({ field, form }: IRegisterForm) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input {...field} id="email" placeholder="email" type="email" />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form }: IRegisterForm) => (
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
                                Create account
                            </Button>
                            </form>
                        )}
                    </Formik>
                </Box>
            </div>
        );
    }

    registrationErrorWindow() {
        const { registrationError } = this.props;

        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Error!</AlertTitle>
                <AlertDescription>{registrationError}</AlertDescription>
            </Alert>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        registrationError: state.account.registrationError,
        registrationCompleted: state.account.registrationCompleted
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        registerAsync
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)