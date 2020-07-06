import React, { Component } from "react";
import { Box, Image, Badge } from "@chakra-ui/core";
import { NavLink } from "react-router-dom";

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
                            <NavLink to="/">
                                Cerber
                                <Badge variant="subtle" variantColor="yellow" ml={2}>
                                    beta
                                </Badge>
                            </NavLink>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Header;