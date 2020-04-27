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
    Tab 
} from '@chakra-ui/core';

class Availability extends Component<{match: any}> {
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
                <Tabs style={{width:'50%', margin:'0 auto', textAlign:'left'}}>
                    <TabList>
                        <Tab>
                            <small>Status:</small>
                            &nbsp;
                            <Badge variantColor="green">Ok</Badge></Tab>
                        <Tab>
                            Charts
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <List spacing={3} marginTop={5}>
                                <ListItem>
                                    <ListIcon icon="check-circle" color="green.500" />
                                    <small>[2020.04.01 16:00]</small> <Code>200 OK</Code> in <Code>31ms</Code>
                                </ListItem>
                                <ListItem>
                                    <ListIcon icon="check-circle" color="green.500" />
                                    <small>[2020.04.01 16:01]</small> <Code>200 OK</Code> in <Code>11ms</Code>
                                </ListItem>
                                <ListItem>
                                    <ListIcon icon="check-circle" color="green.500" />
                                    <small>[2020.04.01 16:02]</small> <Code>200 OK</Code> in <Code>43ms</Code>
                                </ListItem>
                                <ListItem>
                                    <ListIcon icon="warning" color="pink.500" />
                                    <small>[2020.04.01 16:03]</small> <Code>500 Internal server error</Code> in <Code>7010ms</Code>
                                </ListItem>
                            </List>
                        </TabPanel>
                        <TabPanel>
                            <p>Charts</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Availability)