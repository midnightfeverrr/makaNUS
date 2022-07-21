import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

// form
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons } from '@expo/vector-icons';

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { GeoPoint } from 'firebase/firestore';

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
import {View, Alert} from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// colors
const {brand, darkLight, tertiary, primary} = Colors;

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // Handling error message in Formik
    const handleMessage = (message, type = false) => {
        setMessage(message);
        setMessageType(type);
    }

    // Handling Location Permissions, and getting user's location
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

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
                        if (values.password !== values.confirmPassword){
                            handleMessage('Password does not match!')
                        } else {
                        firebase.auth()                                                 
                        .createUserWithEmailAndPassword(values.email, values.password)
                        .then( async () => {
                            const db = firebase.firestore();
                            const coordinates = new GeoPoint(location.coords.latitude, location.coords.longitude);
                            await db.collection("users").doc(firebase.auth().currentUser.uid)
                            .set({
                                fullName: values.fullName,
                                email: values.email,
                                password: values.password,
                                phoneNumber: values.phoneNumber,
                                username: values.Username,
                                coordinate: coordinates,
                                level: 1,
                                xp: 0,
                                userImg: null
                            });
                            console.log('User account created & signed in!');
                            })
                          .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                              console.log('Email address is already in use!');
                              handleMessage("Email address is already in use!");
                            }
                
                            if (error.code === 'auth/invalid-phone-number') {
                                console.log('Phone number is invalid!');
                                handleMessage("Phone number is invalid!");
                            }

                            if (error.code === 'auth/invalid-email') {
                              console.log('That email address is invalid!');
                              handleMessage("The email address is invalid!");
                            }
                            
                            if (error.code === 'auth/weak-password') {
                                console.log('Password must be at least 8 characters!');
                                handleMessage("Password must be at least 8 characters!");
                            }
                
                            Alert.alert(
                                error.code,
                                error.message,
                                [
                                    {
                                        text: "OK",
                                        onPress: () => console.log("OK Pressed"),
                                        style: "OK",
                                    },
                                ],
                                {
                                    cancelable: true,
                                    onDismiss: () =>
                                    console.log(
                                        "This alert was dismissed by tapping outside of the alert dialog."
                                    ),
                                }
                            );
                
                          });
                    }}
                }
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label= "Full name"
                                icon= 'person'
                                placeholder= "full name"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('fullName')}
                                onBlur= {handleBlur('fullName')}
                                value= {values.fullName}
                            />

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

                            <MyTextInput 
                                label= "Phone Number"
                                icon= 'device-mobile'
                                placeholder= "xxxx-xxxx"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('phoneNumber')}
                                onBlur= {handleBlur('phoneNumber')}
                                value= {values.phoneNumber}
                                keyboardType= "numeric"
                            />

                            <MyTextInput 
                                label= "Username"
                                icon= 'mention'
                                placeholder= "username"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('Username')}
                                onBlur= {handleBlur('Username')}
                                value= {values.Username}
                            />
                            <MyTextInput 
                                label= "Password"
                                icon= 'lock'
                                placeholder= "password"
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
                                label= " Confirm Password"
                                icon= 'lock'
                                placeholder= "confirm password"
                                placeholderTextColor= {darkLight}
                                onChangeText= {handleChange('confirmPassword')}
                                onBlur= {handleBlur('confirmPassword')}
                                value= {values.confirmPassword}
                                secureTextEntry = {hideConfirmPassword}
                                isPassword={true}
                                hidePassword = {hideConfirmPassword}
                                setHidePassword = {setHideConfirmPassword}
                            />

                            <MessageBox type={messageType}>{message}</MessageBox>
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

// Form Style
const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
      <View>
        <LeftIcon>
            <Octicons name={icon} size={20} color={brand} />
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