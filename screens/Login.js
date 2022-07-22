// Import Statements
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
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

// colors
const {brand, darkLight, tertiary, primary} = Colors;

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import app from './../firebase';
import 'firebase/compat/firestore';
import { GeoPoint } from 'firebase/firestore';

/**
 * Anonymous class that renders LoginPage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of LoginPage.
 */
const Login = ({navigation}) => {
    // States
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    /** 
     * Handling error message in Formik.
     */
    const handleMessage = (message, type = false) => {
        setMessage(message);
        setMessageType(type);
    }

    /**
     * React hook to ask user's permission
     * to access user's current location.
     */
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return Alert.alert(
                status,
                errorMsg,
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                        style: "OK",
                    },
                ]
            )
          }
    
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            maximumAge: 10000,
            timeout: 5000
          });
          setLocation(location);
        })();
      }, []);

    /**
     * Anonymous class that renders Text Input for Formik.
     *
     * @param {string} label Text for label above the form.
     * @param {string} icon Name of Icon.
     * @param {boolean} isPassword Determine whether input is password or not.
     * @param {boolean} hidePassword Determine whether to show password or not.
     * @param {boolean} setHidePassword Set state to hide password/show password.
     * @param {*} props Other props set on the render method.
     * @returns Render of Formik Text Input.
     */
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

    /**
     * Function to handle sign-up using Google.
     */
    const handleGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithRedirect(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            console.log(error.code)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/LogoOnly.png')} />
                <PageTitle><PageTitle style={{color: "#3E3E3E"}}>maka</PageTitle>NUS</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{email: "", password: ""}}
                    // Authentication using Firebase & Submitting data to Firestore
                    onSubmit= {async (values) => {
                        firebase.auth()
                          .signInWithEmailAndPassword(values.email, values.password)
                          .then(async () => {
                            const db = firebase.firestore();
                            const coordinates = new GeoPoint(location.coords.latitude, location.coords.longitude);
                            await db.collection("users").doc(firebase.auth().currentUser.uid)
                            .update({
                                coordinate: coordinates,
                            });
                            console.log('User signed in!');
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
                
                            if (error.code === 'auth/wrong-password') {
                                console.log('Wrong password.');
                                handleMessage("Wrong Password!");
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
                    }
                }
                >
                    {({handleChange, handleBlur, handleSubmit,  values}) => (
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
                            <MessageBox type={messageType}>{message}</MessageBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText></ExtraText>
                                <TextLink onPress={() => navigation.navigate("Forgot")}>
                                    <TextLinkContent>Forgot Password?</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                            <Line />
                            <StyledButton onPress={() => navigation.navigate("Signup")}>
                                <ButtonText>Sign Up</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

export default Login;