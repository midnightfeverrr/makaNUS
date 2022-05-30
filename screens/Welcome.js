import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';


import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    Colors,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    Avatar
} from './../components/styles';

// colors
const {brand, darkLight} = Colors;

const Welcome = ({navigation}) => {
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}><PageTitle style={{color: "#3E3E3E"}}> Welcome to maka</PageTitle>NUS</PageTitle>
                    <SubTitle welcome={true}>John Doe</SubTitle>
                        <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/LogoOnly.png')} />
                        <Line />
                            <StyledButton onPress={() => {navigation.navigate("Login")}}>
                                <ButtonText>Logout</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </StyledContainer>
    );
}

export default Welcome;