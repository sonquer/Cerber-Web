import React, { Component } from "react";
import { Box, Image } from "@chakra-ui/core";

class Header extends Component {
    render() {
        return (
            <Box bg="green.500" p={2} borderBottom={'1px #1A202C solid'}>
                <Box d="flex" alignItems="center">
                    <Image src='/img/cerberus.svg' style={{width:32}}/>
                    <Box
                        color="white"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="m"
                        textTransform="uppercase"
                        ml={2} >
                            Cerber
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Header;