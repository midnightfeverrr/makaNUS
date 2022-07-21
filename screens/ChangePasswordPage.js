// Import Statements
import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    ButtonsContainer,
    AddToFavouritesBtn,
    Colors,
    MessageBox,
    LeftIcon,
    RightIcon,
    StyledTextInput,
    StyledFormArea,
    StyledButton,
    ButtonText,
} from './../components/styles';
import { Formik } from 'formik';

// colors
const {
    darkLight, 
    tertiary,
} = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders ChangePasswordPage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of ChangePasswordPage.
 */
const ChangePasswordPage = ({navigation}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [hideOldPassword, setHideOldPassword] = useState(true);
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    /** 
     * Handling error message in Formik.
     */
    const handleMessage = (message, type = false) => {
        setMessage(message);
        setMessageType(type);
    }

    /**
     * Get User Data From Firestore.
     */
    const getUser = async () => {
        await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((querySnapshot) => {
            if( querySnapshot.exists ) {
                console.log('User Data', querySnapshot.data());
                setUserData(querySnapshot.data());
            }
        })
    }    
    
    /**
     * React hook to fetch user data upon accessing the page.
     */
    useEffect(() => {
        getUser();
    }, []);    

    /**
     * Anonymous class that renders Text Input for Formik.
     *
     * @param {string} icon Name of Icon.
     * @param {boolean} isPassword Determine whether input is password or not.
     * @param {boolean} hidePassword Determine whether to show password or not.
     * @param {boolean} setHidePassword Set state to hide password/show password.
     * @param {*} props Other props set on the render method.
     * @returns Render of Formik Text Input.
     */
    const MyTextInput = ({icon, isPassword, hidePassword, setHidePassword, ...props}) => {
        return (
        <View>
            <LeftIcon editprofile={true}>
                <Ionicons name={icon} size={20} color={tertiary} />
            </LeftIcon>        
            <StyledTextInput editprofile={true} {...props}/>
            {isPassword && (
                <RightIcon editprofile={true} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={darkLight} />
                </RightIcon>
            )}
        </View>);
    };

    return (
        <StyledContainer>
            <ButtonsContainer back2={true}>
                <AddToFavouritesBtn 
                    profile={true}
                    onPress={() => navigation.goBack()}>
                    <Octicons name="arrow-left" size={30} color={tertiary} />
                </AddToFavouritesBtn>
            </ButtonsContainer>
            <InnerContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/LogoOnly.png')} />
                <PageTitle><PageTitle style={{color: "#3E3E3E"}}>maka</PageTitle>NUS</PageTitle>
                <SubTitle>Change Account Password</SubTitle>
                    <Formik
                        initialValues={{oldPassword: "", password: "", confirmPassword: ""}}
                        onSubmit={async (values)  => {
                            if (values.oldPassword !== userData.password){
                                handleMessage('You entered the wrong password!')
                            } 
                            if (values.password !== values.confirmPassword){
                                handleMessage('New password does not match!')
                            } else {
                            db.collection("users").doc(firebase.auth().currentUser.uid)
                            .update({
                                password: values.password
                            })
                            firebase.auth().currentUser.updatePassword(values.password)
                            .catch(error => {
                                if (error.code === 'auth/weak-password') {
                                    console.log('Password must be at least 8 characters!');
                                    handleMessage("Password must be at least 8 characters!");
                                }                  
                            });
                            
                            navigation.navigate("EditProfilePage")
                            
                            Alert.alert(
                                "Password Change",
                                "You have successfully changed your password!",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => console.log("OK Pressed"),
                                        style: "OK",
                                    },
                                ],
                                {
                                    cancelable: false,
                                    onDismiss: () =>
                                    console.log(
                                        "This alert was dismissed by tapping outside of the alert dialog."
                                    ),
                                }
                            )
                        }}
                    }
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    icon= 'lock-closed-outline'
                                    placeholder= "old password"
                                    placeholderTextColor= {darkLight}
                                    onChangeText= {handleChange('oldPassword')}
                                    onBlur= {handleBlur('oldPassword')}
                                    value= {values.oldPassword}
                                    secureTextEntry = {hideOldPassword}
                                    isPassword={true}
                                    hidePassword = {hideOldPassword}
                                    setHidePassword = {setHideOldPassword}
                                />
                                <MyTextInput 
                                    icon= 'lock-closed-outline'
                                    placeholder= "new password"
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
                                    icon= 'lock-closed-outline'
                                    placeholder= "confirm new password"
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
                                    <ButtonText>Save Changes</ButtonText>
                                </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

export default ChangePasswordPage;