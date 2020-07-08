import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../app/store';
import { 
    Code,
    Divider,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    List,
    ListItem,
    ListIcon,
    Tabs,
    TabPanels,
    TabList,
    TabPanel,
    Tab,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalCloseButton,
    Button,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    CircularProgress,
    Box
} from '@chakra-ui/core';
import Editor from "@monaco-editor/react";
import { Chart } from "react-google-charts";
import { push } from 'connected-react-router';
import styles from './Availability.module.css';
import Header from '../../components/Header';
import { bindActionCreators } from '@reduxjs/toolkit';
import Authentication from '../../components/Authentication';
import { loadAsync } from '../../features/availability/availabilitySlice';

interface IAvailabilityProps {
    id: string | null,
    name: string | null,
    url: string | null,
    expectedStatusCode: number | null,
    expectedResponse: string | null,
    availabilityLogs: {    
        createdAt: string,
        statusCode: number,
        body: string,
        responseTime: number
    }[],
    match: any,
    status: 'ST_OK' | 'ST_ERROR',
    push: (path: string) => void,
    token: string | null,
    loadAsync: (id: string, token: string) => void,
    loading: boolean
}

class Availability extends Component<IAvailabilityProps, {isOpen: boolean, value: string, statusCode: number}> {
    constructor(props: IAvailabilityProps) {
        super(props);

        this.state = {
            isOpen: false,
            value: '',
            statusCode: 0
        };
    }

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;

        if (this.props.token !== null) {
            this.props.loadAsync(params.id, this.props.token);
        }
    }

    render() {
        const { match } = this.props;
        const { params } = match;

        const {
            url,
            availabilityLogs,
            expectedStatusCode,
            expectedResponse,
            status
        } = this.props;

        return (
            <div style={{textAlign:'center'}}>
                <Authentication />
                <Header />
                <div style={{margin:10}}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="#">{params.id}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                <Code margin={2}>{url}</Code>
                {this.props.loading 
                    ? <div style={{textAlign:'center'}}><CircularProgress isIndeterminate color="green"></CircularProgress></div> 
                    : null}
                </div>
                <Divider/>
                <div style={{textAlign:'left', width:'50%', margin:'0 auto'}}>
                    <div style={{marginBottom:'8px', marginTop:'8px'}}>
                        <Menu>
                            <Button as={MenuButton} rightIcon="chevron-down" variantColor='gray' size='xs'>
                                Actions
                            </Button>
                            <MenuList>
                                <MenuItem onClick={() => this.editAvailabilityItem(params.id)}>Edit</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                    <Tabs>
                        <TabList>
                            <Tab>
                                <small>Status:</small>
                                &nbsp;
                                {status === 'ST_OK' ? <Badge variantColor="green">Ok</Badge> : <Badge variantColor="red">Error</Badge>}
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {this.props.loading === false && this.props.availabilityLogs.length > 0 ?
                                <Chart
                                    chartType='AreaChart'
                                    data={this.chartLogs()}
                                    width={'100%'}
                                    options={{
                                        hAxis: {minValue: 0},
                                        vAxis: {minValue:0},
                                        colors: ['#38a169'],
                                        backgroundColor: 'white',
                                        legend: 'none',
                                        animation: {
                                            startup: true,
                                            easing: 'linear',
                                            duration: 512,
                                        },
                                        enableInteractivity: false,
                                    }} /> : null
                                }
                                {this.props.loading === false && this.props.availabilityLogs.length <= 0 ? <Box>No data.</Box> : null}
                                <Divider/>
                                <List spacing={3} marginTop={5}>
                                    {availabilityLogs.map(log => (
                                        <ListItem key={log.createdAt} onClick={() => this.onOpen(log.body, log.statusCode)} className={styles.listItem}>
                                            {log.statusCode === expectedStatusCode && log.body === expectedResponse
                                                ? <ListIcon icon="check-circle" color="green.500" /> 
                                                : <ListIcon icon="check-circle" color="pink.500" />}
                                            <small>[{log.createdAt}]</small> <Code>{log.statusCode}</Code> in <Code>{log.responseTime}ms</Code>
                                        </ListItem>
                                    ))}
                                </List>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <Modal isOpen={this.state.isOpen} onClose={this.onClose} size='full'>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>
                        <Code>{this.state.statusCode}</Code>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Editor
                            height="50vh"
                            language="javascript"
                            value={this.state.value} />
                    </ModalBody>

                    <ModalFooter>
                        <Button variantColor="teal" mr={3} onClick={this.onClose} size="xs">Close</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        );
    }

    chartLogs = () : Array<[string, string | number]> => {
        let data : Array<[string, string | number]> = [['Time', 'Availability']];

        const { availabilityLogs, expectedResponse, expectedStatusCode } = this.props;

        availabilityLogs?.slice(0, 10)?.map(log => {
            let date = new Date(Date.parse(log.createdAt));
            let hours = date.getHours();
            let minutes = date.getMinutes();
            
            data.push([`${hours}:${minutes}`, log.statusCode !== expectedStatusCode || log.body !== expectedResponse ? 0 : 100])
        });

        return data;
    }

    editAvailabilityItem = (id: string) => {
        this.props.push(`/configuration/${id}`);
    }

    onOpen = (value: string, statusCode: number) => {
        this.setState({isOpen: true, value: value, statusCode: statusCode});
    }

    onClose = () => {
        this.setState({isOpen: false, value: '', statusCode: 0});
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        id: state.availiability.id,
        name: state.availiability.name,
        url: state.availiability.url,
        expectedStatusCode: state.availiability.expectedStatusCode,
        expectedResponse: state.availiability.expectedResponse,
        availabilityLogs: state.availiability.availabilityLogs,
        status: state.availiability.status,
        token: state.account.token,
        loading: state.availiability.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ push, loadAsync }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Availability)