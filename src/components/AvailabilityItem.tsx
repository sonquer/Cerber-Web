import React, { Component } from "react";
import { Box, Grid, Icon, Button } from "@chakra-ui/core";

interface IAvailabilityItemProps {
    Id: string;
    IsAvailable: boolean;
    Name?: string;
    Navigation: (path: string) => void
}

class AvailabilityItem extends Component<IAvailabilityItemProps, {}> {
    render() {
        return (
            <Button w="100%" h="36px" border="1px" borderColor="gray.300" onClick={this.clicked}>
                <Grid w="100%" h="36px" templateColumns="36px calc(100% - 36px)">
                    <Box w="100%" h="100%" justifyContent='center' display='flex' alignItems='center'>
                        {this.props.IsAvailable 
                        ? <Icon name="check-circle" color="green.500" size='24px'/>
                        : <Icon name="warning" color="pink.500" size='24px' />}
                    </Box>
                    <Box w="100%" h="100%" justifyContent='center' display='flex' alignItems='center'>
                        <p>
                            {this.props.Name || 'unknown?'}
                        </p>
                    </Box>
                </Grid>
            </Button>
        )
    }

    clicked = () => {
        this.props.Navigation(`/availability/${this.props.Id}`);
    }
}

export default AvailabilityItem;