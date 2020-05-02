import React, { Component } from "react";
import { Box, Grid, Image, Icon } from "@chakra-ui/core";
import history from "../utils/history";

interface IAvailabilityItemProps {
    Id: string;
    IsAvailable: boolean;
    Name?: string;
}

class AvailabilityItem extends Component<IAvailabilityItemProps, {}> {
    render() {
        return (
            <Box w="100%" h="36px" bg="gray.100" p={1} border="1px #A0AEC0 solid" onClick={this.clicked}>
                <Grid templateColumns="36px calc(100% - 36px)">
                    <Box w="100%" h="100%">
                        {this.props.IsAvailable 
                        ? <Icon name="check-circle" color="green.500" size='24px'/>
                        : <Icon name="warning" color="pink.500" size='24px' />}
                    </Box>
                    <Box w="100%" h="100%">
                        <p>
                            {this.props.Name || 'unknown?'}
                        </p>
                    </Box>
                </Grid>
            </Box>
        )
    }

    clicked = () => {
        history.push(`/availability/${this.props.Id}`);
    }
}

export default AvailabilityItem;