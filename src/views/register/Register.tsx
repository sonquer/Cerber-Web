import React, { Component } from "react";
import { connect } from 'react-redux';
import styles from './Register.module.css';
import { Formik, Field, FormikHelpers } from 'formik';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core"
import { RootState } from "../../app/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { registerAsync } from '../../features/account/accountSlice';
import Header from "../../components/Header";

interface IRegisterFormProperties {
    name: string,
    password: string
}

interface IRegisterForm {
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

interface IRegisterProps {
    registerAsync: any,
    registrationError: string | null
}

class Register extends Component<IRegisterProps, {}> {
    render() {
        return (
            <div>
                <Header />
                {this.props.registrationError != null ? this.registrationErrorWindow() : null}
                <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" className={styles.registerWindow}>
                    <Formik
                        initialValues={{ name: '', password: '' } as IRegisterFormProperties}
                        onSubmit={async (values: IRegisterFormProperties, actions: FormikHelpers<IRegisterFormProperties>) => {
                            const { registerAsync } = this.props;
                            await registerAsync();
                            actions.setSubmitting(false);
                        }}>
                        {(props: any) => (
                            <form onSubmit={props.handleSubmit}>
                            <Field name="name">
                                {({ field, form }: IRegisterForm) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor="name">Login</FormLabel>
                                        <Input {...field} id="name" placeholder="name" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
        registrationError: state.account.registrationError
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        registerAsync
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)