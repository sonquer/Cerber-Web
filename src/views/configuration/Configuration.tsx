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
    Divider
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

interface IConfigurationParams {
    match: any;
    createNew: () => {},
    nameOnChange: (value: string) => {},
    urlOnChange: (value: string) => {},
    expectedStatusCodeOnChange: (value: number) => {},
    expectedResponseOnChange: (value: string) => {},
    id: string | null,
    name: string | null,
    url: string | null,
    expectedStatusCode: number,
    expectedResponse: string | null
}

class Configuration extends Component<IConfigurationParams, {}> {
    editorRef: { getValue: () => {} } | null = null;

    componentDidMount() {
        const { params } = this.props.match;        
        if (params.id === 'create') {
            const { createNew } = this.props;

            createNew();
        }
    }

    render() {
        return (
            <Stack>
                <Authentication />
                <Header />
                <Breadcrumb style={{textAlign:'center', marginTop: 10}}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#">Configuration</BreadcrumbLink>
                    </BreadcrumbItem>
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
                </Box>
            </Stack>
        );
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        id: state.availiability.id,
        name: state.availiability.name,
        url: state.availiability.url,
        expectedStatusCode: state.availiability.expectedStatusCode,
        expectedResponse: state.availiability.expectedResponse
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ 
        createNew,
        nameOnChange,
        urlOnChange,
        expectedStatusCodeOnChange,
        expectedResponseOnChange,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);