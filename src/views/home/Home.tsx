import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../app/store';
import { Box, Grid, Heading, Divider, Image, Menu, MenuButton, Button, MenuList, MenuItem, CircularProgress } from '@chakra-ui/core';
import AvailabilityItem from '../../components/AvailabilityItem';
import styles from './Home.module.css';
import Header from '../../components/Header';
import { push } from 'connected-react-router';
import { bindActionCreators } from '@reduxjs/toolkit';
import Authentication from '../../components/Authentication';
import { loadAsync } from '../../features/availabilityList/availabilityListSlice';

interface IHomeProps {
    push: (path: string) => void,
    token: string | null,
    loadAsync: (token: string) => void,
    availabilityItems: {
        id: string,
        name: string,
        status: string
    }[],
    loading: boolean
}

class Home extends Component<IHomeProps> {
    async componentDidMount() {
        if(this.props.token !== null) {
            this.props.loadAsync(this.props.token);
        }
    }

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
                    <Box style={{textAlign:'center'}}>
                        {this.props.loading ? <CircularProgress isIndeterminate color="green"></CircularProgress> : this.renderItems()}
                    </Box>
                </div>
            </div>
        );
    }

    newAvailabilityItem = () => {
        this.props.push(`/configuration/create`);
    }

    renderItems = () => {
        return (
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {this.props.availabilityItems.map(item => (
                    <AvailabilityItem Id={item.id} IsAvailable={item.status === 'ST_OK'} Name={item.name} Navigation={this.props.push} />
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.account.token,
        availabilityItems: state.availabilityList.availabilityItems,
        loading: state.availabilityList.loading
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ push, loadAsync }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)