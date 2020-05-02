import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../app/store';
import { Box, Grid, Heading, Divider, Image } from '@chakra-ui/core';
import AvailabilityItem from '../../components/AvailabilityItem';
import styles from './Home.module.css';

class Home extends Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <Box p={5}>
                    <Image size="64px" src="/img/health-ok.svg" className={styles.imageCenter}/>
                    <Heading as="h3" size="lg" marginTop={10}>Everything is looking good</Heading>
                    <small>
                        View past events in the status history.
                    </small>
                </Box>
                <Divider />
                <Box w="50%" margin="0 auto">
                    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                        <AvailabilityItem Id='1' IsAvailable={true} Name='Search.Api' />
                        <AvailabilityItem Id='2' IsAvailable={false} Name='Main.Api' />
                    </Grid>
                </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)