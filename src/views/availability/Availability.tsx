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
    MenuItem
} from '@chakra-ui/core';
import history from '../../utils/history';
import Editor from "@monaco-editor/react";
import { Chart } from "react-google-charts";
import styles from './Availability.module.css';

class Availability extends Component<{match: any}, {isOpen: boolean, value: string}> {
    constructor(props: {match: any}) {
        super(props);

        this.state = {
            isOpen: false,
            value: ''
        };
    }

    render() {
        const { match } = this.props;
        const { params } = match;

        return (
            <div style={{textAlign:'center'}}>
                <div style={{margin:10}}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="#">{params.id}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Code margin={2}>http://google.com/</Code>
                </div>
                <Divider/>
                <div style={{textAlign:'left', width:'50%', margin:'0 auto'}}>
                    <Menu>
                        <Button as={MenuButton} rightIcon="chevron-down" variantColor='gray'>
                            Actions
                        </Button>
                        <MenuList>
                            <MenuItem onClick={() => this.editAvailabilityItem(params.id)}>Edit</MenuItem>
                        </MenuList>
                    </Menu>
                    <Tabs>
                        <TabList>
                            <Tab>
                                <small>Status:</small>
                                &nbsp;
                                <Badge variantColor="green">Ok</Badge>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Chart
                                    chartType='AreaChart'
                                    data={[
                                        ["Time", "Availability"],
                                        ['16:00', 100],
                                        ['16:01', 100],
                                        ['16:02', 100],
                                        ['16:03', 0],
                                        ['16:04', 100]
                                    ]}
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
                                    }} />
                                <Divider/>
                                <List spacing={3} marginTop={5}>
                                    <ListItem onClick={() => this.onOpen('{}')} className={styles.listItem}>
                                        <ListIcon icon="check-circle" color="green.500" />
                                        <small>[2020.04.01 16:04]</small> <Code>200 OK</Code> in <Code>18ms</Code>
                                    </ListItem>
                                    <ListItem onClick={() => this.onOpen('{}')} className={styles.listItem}>
                                        <ListIcon icon="warning" color="pink.500" />
                                        <small>[2020.04.01 16:03]</small> <Code>500 Internal server error</Code> in <Code>7010ms</Code>
                                    </ListItem>
                                    <ListItem onClick={() => this.onOpen('{}')} className={styles.listItem}>
                                        <ListIcon icon="check-circle" color="green.500" />
                                        <small>[2020.04.01 16:02]</small> <Code>200 OK</Code> in <Code>43ms</Code>
                                    </ListItem>
                                    <ListItem onClick={() => this.onOpen('{}')} className={styles.listItem}>
                                        <ListIcon icon="check-circle" color="green.500" />
                                        <small>[2020.04.01 16:01]</small> <Code>200 OK</Code> in <Code>11ms</Code>
                                    </ListItem>
                                    <ListItem onClick={() => this.onOpen('{}')} className={styles.listItem}>
                                        <ListIcon icon="check-circle" color="green.500" />
                                        <small>[2020.04.01 16:00]</small> <Code>200 OK</Code> in <Code>31ms</Code>
                                    </ListItem>
                                </List>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <Modal isOpen={this.state.isOpen} onClose={this.onClose} size='full'>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>
                        <Code>500 Internal server error</Code>
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

    editAvailabilityItem = (id: string) => {
        history.push(`/configuration/${id}`);
    }

    onOpen = (value: string) => {
        this.setState({isOpen: true, value: value});
    }

    onClose = () => {
        this.setState({isOpen: false, value: ''});
    }
}

const mapStateToProps = (state: RootState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Availability)