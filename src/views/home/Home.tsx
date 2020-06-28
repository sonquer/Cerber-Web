import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../app/store';
import { Box, Grid, Heading, Divider, Image, Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/core';
import AvailabilityItem from '../../components/AvailabilityItem';
import styles from './Home.module.css';
import Header from '../../components/Header';
import { push } from 'connected-react-router';
import { bindActionCreators } from '@reduxjs/toolkit';
import Authentication from '../../components/Authentication';

interface IHomeProps {
    push: (path: string) => void,
    token: string | null
}

class Home extends Component<IHomeProps> {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <Authentication />
                <Header />
                <Box p={5}>
                    <Image size="64px" src="/img/health-ok.svg" className={styles.imageCenter}/>
                    <Heading as="h3" size="lg" marginTop={10}>Everything is looking good</Heading>
                    <small>
                        View past events in the status history.
                    </small>
                </Box>
                <Divider />
                <div style={{ width:'50%', margin:'0 auto', textAlign:'left'}}>
                    <div style={{marginTop:'12px', marginBottom:'12px'}}>
                        <Menu>
                            <Button as={MenuButton} rightIcon="chevron-down" variantColor='gray' size='xs'>
                                Actions
                            </Button>
                            <MenuList>
                                <MenuItem onClick={this.newAvailabilityItem}>Add new</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                    <Box>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                            <AvailabilityItem Id='1' IsAvailable={true} Name='Search.Api' Navigation={this.props.push} />
                            <AvailabilityItem Id='2' IsAvailable={false} Name='Main.Api' Navigation={this.props.push} />
                        </Grid>
                    </Box>
                </div>
            </div>
        );
    }

    newAvailabilityItem = () => {
        this.props.push(`/configuration/create`);
    }
}

const mapStateToProps = (state: RootState) => {
    return {}
}


const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ push }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)