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
import { View } from 'react-native';

// colors
const {brand, darkLight, tertiary, primary} = Colors;

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import app from './../firebase'
import 'firebase/compat/firestore';

// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const Forgot = ({navigation}) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    // Handling error message in Formik
    const handleMessage = (message, type = false) => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <ForgotContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/LogoOnly.png')} />
                <PageTitle><PageTitle style={{color: "#3E3E3E"}}>maka</PageTitle>NUS</PageTitle>
                <SubTitle>Reset Your Password!</SubTitle>

                <Formik
                    initialValues={{username: ""}}
                    onSubmit={async (values)  => {
                        firebase.auth().sendPasswordResetEmail(values.email)
                        .then(() => {
                            console.log('A password reset email has been sent.');
                            navigation.navigate("Login")
                        })
                        .catch(error => {
                            if (error.code === 'auth/user-not-found') {
                                console.log('That email address is invalid!');
                                handleMessage("No account associated with the email address!");
                              }

                            if (error.code === 'auth/invalid-email') {
                              console.log('That email address is invalid!');
                              handleMessage("The email address is invalid!");
                            }

                            if (error.code === 'auth/missing-email') {
                                console.log('Please enter your email!');
                                handleMessage("Please enter your email!");
                            }

                              console.log(error.code)
                        })
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label= "Email Address"
                                icon= 'mail'
                                placeholder= "email"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('email')}
                                onBlur= {handleBlur('email')}
                                value= {values.email}
                                keyboardType= "email-address"
                            />

                            <MessageBox type={messageType}>{message}</MessageBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Send Code</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText></ExtraText>
                                <TextLink onPress={() => navigation.navigate("Login")}>
                                    <TextLinkContent>Back to Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
            </ForgotContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
      <View>
        <LeftIcon>
            <Octicons name={icon} size={25} color={brand} />
        </LeftIcon>        
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props}/>
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword )}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={darkLight} />
            </RightIcon>
        )}
      </View>);
};

export default Forgot;