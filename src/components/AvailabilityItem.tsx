import React, { Component } from "react";
import { Box, Grid, Image } from "@chakra-ui/core";
import history from "../utils/history";

interface IAvailabilityItemProps {
    Id: string;
    IsAvailable: boolean;
    Name?: string;
}

class AvailabilityItem extends Component<IAvailabilityItemProps, {}> {
    render() {
        return (
            <Box w="100%" h="42px" bg="gray.100" p={1} border="1px #A0AEC0 solid" onClick={this.clicked}>
                <Grid templateColumns="42px calc(100% - 42px)">
                    <Box w="100%" h="100%">
                        {this.props.IsAvailable 
                        ? <Image size="32px" src="/img/ok.png" alt="ok.png" />
                        : <Image size="32px" src="/img/error.png" alt="error.png" />}
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