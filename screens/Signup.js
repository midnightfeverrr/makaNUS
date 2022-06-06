import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// form
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
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
    TextLinkContent
} from './../components/styles';
import {View} from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// colors
const {brand, darkLight, tertiary, primary} = Colors;

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle><PageTitle style={{color: "#3E3E3E"}}>maka</PageTitle>NUS</PageTitle>
                <SubTitle>Make an Account</SubTitle>

                <Formik
                    initialValues={{fullName: "", email: "", phoneNumber: "", Username: "", password: "", confirmPassword: ""}}
                    onSubmit={(values)  => {
                        console.log(values);
                        navigation.navigate("Login");
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label= "Full name"
                                icon= 'person'
                                placeholder= "John Doe"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('fullName')}
                                onBlur= {handleBlur('fullName')}
                                value= {values.fullName}
                                keyboardType= "email-address"
                            />

                            <MyTextInput 
                                label= "Email Address"
                                icon= 'mail'
                                placeholder= "johndoe@gmail.com"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('email')}
                                onBlur= {handleBlur('email')}
                                value= {values.email}
                                keyboardType= "email-address"
                            />

                            <MyTextInput 
                                label= "Phone Number"
                                icon= 'device-mobile'
                                placeholder= "(+65) xxxx-xxxx"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('phoneNumber')}
                                onBlur= {handleBlur('phoneNumber')}
                                value= {values.phoneNumber}
                                keyboardType= "numeric"
                            />

                            <MyTextInput 
                                label= "Username"
                                icon= 'mention'
                                placeholder= "johndoe"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('Username')}
                                onBlur= {handleBlur('Username')}
                                value= {values.Username}
                                keyboardType= "email-address"
                            />
                            <MyTextInput 
                                label= "Password"
                                icon= 'lock'
                                placeholder= "* * * * * *"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('password')}
                                onBlur= {handleBlur('password')}
                                value= {values.password}
                                secureTextEntry = {hidePassword}
                                isPassword={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                            />

                            <MyTextInput 
                                label= "Confirm Password"
                                icon= 'lock'
                                placeholder= "* * * * * *"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('confirmPassword')}
                                onBlur= {handleBlur('confirmPassword')}
                                value= {values.confirmPassword}
                                secureTextEntry = {hidePassword}
                                isPassword={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                            />

                            <MessageBox>...</MessageBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Sign up</ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink onPress={() => navigation.navigate("Login")}>
                                    <TextLinkContent>Log in!</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
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

export default Signup;