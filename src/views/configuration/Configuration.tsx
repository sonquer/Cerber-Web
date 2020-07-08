import React, { Component } from "react";
import { connect } from 'react-redux';
import { RootState } from "../../app/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { 
    FormControl, 
    Input, 
    FormLabel, 
    Stack, 
    Box,   
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Divider,
    Button,
    CircularProgress,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from "@chakra-ui/core";
import { 
    createNew, 
    nameOnChange, 
    urlOnChange, 
    expectedResponseOnChange, 
    expectedStatusCodeOnChange 
} from '../../features/availability/availabilitySlice';
import { ControlledEditor } from "@monaco-editor/react";
import Header from '../../components/Header';
import Authentication from "../../components/Authentication";
import { loadAsync, createAsync, updateAsync, removeAsync } from '../../features/availability/availabilitySlice';
import { Redirect } from "react-router-dom";

interface IConfigurationParams {
    match: any;
    createNew: () => {},
    nameOnChange: (value: string) => {},
    urlOnChange: (value: string) => {},
    expectedStatusCodeOnChange: (value: number) => {},
    expectedResponseOnChange: (value: string) => {},
    saved: boolean,
    id: string | null,
    name: string | null,
    url: string | null,
    expectedStatusCode: number,
    expectedResponse: string | null,
    token: string | null,
    loadAsync: (id: string, token: string) => void,
    loading: boolean,
    errorMessage: string | null,
    createAsync: (
        name: string, 
        url: string, 
        expectedStatusCode: number, 
        expectedResponse: string, 
        logLifetimeThresholdInHours: number,
        token: string
    ) => void,
    updateAsync: (
        id: string,
        name: string, 
        url: string, 
        expectedStatusCode: number, 
        expectedResponse: string, 
        logLifetimeThresholdInHours: number,
        token: string
    ) => void,
    removeAsync: (
        id: string,
        token: string
    ) => void
}

class Configuration extends Component<IConfigurationParams, {}> {
    editorRef: { getValue: () => {} } | null = null;

    componentDidMount() {
        const { params } = this.props.match;
        if (params.id === 'create') {
            const { createNew } = this.props;

            createNew();
        } else {
            this.props.loadAsync(params.id, this.props.token ?? '');
        }
    }

    render() {
        const { params } = this.props.match;

        if (this.props.loading) {
            return (<div style={{textAlign:'center'}}>
                <Authentication />
                <Header />
                <CircularProgress mt={2} isIndeterminate color="green"></CircularProgress>
            </div>);
        }

        return (
            <Stack>
                {this.props.saved ? <Redirect to="/" /> : null}
                <Authentication />
                <Header />
                {this.props.errorMessage != null ? this.errorWindow() : null}
                <Breadcrumb style={{textAlign:'center', marginTop: 10}}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Configuration</BreadcrumbLink>
                    </BreadcrumbItem>
                    {params.id !== 'create' ?
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>{params.id}</BreadcrumbLink>
                    </BreadcrumbItem> : null}
                </Breadcrumb>
                <Divider />
                <Box style={{width:'50%', margin:'0 auto'}}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input 
                            id="name" 
                            placeholder='Google' 
                            value={this.props.name ?? ''} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.nameOnChange(event.target.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="url">Url</FormLabel>
                        <Input 
                            id="url" 
                            placeholder='http://google.com' 
                            value={this.props.url ?? ''} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.urlOnChange(event.target.value)}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="expected-status-code">Expected status code</FormLabel>
                        <Input 
                            id="expected-status-code" 
                            placeholder='200' 
                            value={this.props.expectedStatusCode ?? ''} 
                            type='number'
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.expectedStatusCodeOnChange(event.target.valueAsNumber)}/>
                    </FormControl>
                    <div>
                        Expected response
                        <div style={{border:'1px #E2E8F0 solid'}}>
                            <ControlledEditor
                                height="380px"
                                language="javascript"
                                onChange={(_:any, value: string | undefined) => {
                                    this.props.expectedResponseOnChange(value ?? '')
                                }}
                                value={this.props.expectedResponse} />
                        </div>
                    </div>
                    <Button mt={2}
                        variantColor="teal"
                        onClick={() => {
                            if (params.id === 'create') {
                                this.props.createAsync(this.props.name ?? '',
                                    this.props.url ?? '',
                                    this.props.expectedStatusCode,
                                    this.props.expectedResponse ?? '',
                                    12,
                                    this.props.token ?? '');
                            } else {
                                this.props.updateAsync(params.id,
                                    this.props.name ?? '',
                                    this.props.url ?? '',
                                    this.props.expectedStatusCode,
                                    this.props.expectedResponse ?? '',
                                    12,
                                    this.props.token ?? '');
                            }
                        }}>
                            Save
                    </Button>
                    {params.id !== 'create' ?
                    <Button mt={2} ml={2}
                        variantColor="pink"
                        onClick={() => {
                            this.props.removeAsync(params.id, this.props.token ?? '');
                        }}>
                            Delete
                    </Button> : null}
                </Box>
            </Stack>
        );
    }

    errorWindow() {
        const { errorMessage } = this.props;

        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Error!</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
        );
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        id: state.availiability.id,
        name: state.availiability.name,
        url: state.availiability.url,
        expectedStatusCode: state.availiability.expectedStatusCode,
        expectedResponse: state.availiability.expectedResponse,
        token: state.account.token,
        loading: state.availiability.loading,
        saved: state.availiability.saved,
        errorMessage: state.availiability.errorMessage
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ 
        createNew,
        nameOnChange,
        urlOnChange,
        expectedStatusCodeOnChange,
        expectedResponseOnChange,
        loadAsync,
        createAsync,
        updateAsync,
        removeAsync
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);