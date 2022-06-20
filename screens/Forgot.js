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

const Forgot = ({navigation}) => {
    const [email, setEmail] = useState();

    return (
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
                            navigation.navigate("ConfirmCode");
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
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

                            <MessageBox>...</MessageBox>
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