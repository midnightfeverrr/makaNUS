import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// form
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
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
    TextLinkContent
} from './../components/styles';
import {View} from 'react-native';

// colors
const {brand, darkLight, tertiary, primary} = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/LogoOnly.png')} />
                <PageTitle><PageTitle style={{color: "#3E3E3E"}}>maka</PageTitle>NUS</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{email: "", password: ""}}
                    onSubmit={(values)  => {
                        console.log(values);
                        navigation.navigate("Welcome");
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
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
                            <MessageBox>...</MessageBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                            <Line />
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={primary} size={25} />
                                <ButtonText google={true}>Sign in with Google</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Don't have an account? </ExtraText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <TextLinkContent>Sign up!</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
      <View>
        <LeftIcon>
            <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>        
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props}/>
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword )}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
            </RightIcon>
        )}
      </View>);
};

export default Login;