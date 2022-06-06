import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// form
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    ForgotContainer,
    PageLogo,
    PageTitle, 
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    Colors,
    StyledButton,
    ButtonText,
    MessageBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
} from './../components/styles';
import {View} from 'react-native';

// colors
const {brand, darkLight, tertiary, primary} = Colors;

const ForgotSent = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <StyledContainer>
            <ForgotContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/LogoOnly.png')} />
                <PageTitle><PageTitle style={{color: "#3E3E3E"}}>maka</PageTitle>NUS</PageTitle>
                <SubTitle welcome={true}>A code has been sent to your email.</SubTitle>

                <Formik
                    initialValues={{Code: ""}}
                    onSubmit={(values)  => {
                        console.log(values);
                        navigation.navigate("ForgotSent");
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                icon= 'mention'
                                placeholder= "Enter the code here"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('Code')}
                                onBlur= {handleBlur('Code')}
                                value= {values.Code}
                                keyboardType= "numeric"
                            />

                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Send Code</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Didn't receive the code? </ExtraText>
                                <TextLink onPress={() => navigation.navigate("Login")}>
                                    <TextLinkContent>Click here to resend</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
            </ForgotContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
      <View>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput forgot={true} {...props}/>
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword )}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={darkLight} />
            </RightIcon>
        )}
      </View>);
};

export default ForgotSent;