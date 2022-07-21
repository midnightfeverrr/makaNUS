// Import Statements
import React, { useState, useEffect } from "react";
import { 
    View, 
    ActivityIndicator,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import {
    StyledContainer,
    InnerContainer,
    ButtonsContainer,
    AddToFavouritesBtn,
    Colors,
    ProfilePic,
    ProfileImage,
    Add,
    Greetings,
    LeftIcon,
    RightIcon,
    MessageBox,
    Line,
    StyledTextInput,
    StyledFormArea,
    TextLink,
    TextLinkContent,
    StyledButton,
    ButtonText
} from './../components/styles';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';

// colors
const {
    darkLight, 
    tertiary, 
} = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import app from './../firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const db = firebase.firestore();

/**
 * Anonymous class that renders EditProfilePage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of EditProfilePage.
 */
const EditProfilePage = ({navigation}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(
        userData
        ? userData.userImg
        : defaultImage,
    );

    // Default Image(s)
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    

    /**
     * Function to choose an image from phone gallery via ImagePicker package.
     */
    const choosePhotoFromLibrary = () => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          })
          .then(image => {
            console.log(image);
            const imageUri = image.uri;
            setImage(imageUri);
          })
          .catch(error => {
            console.log('User cancelled image selection!');
          });
      };

    /**
     * Function to upload user's profile picture
     * into Firebase storage.
     * 
     * @returns File Uri.
     */
    const uploadImage = async () => {
        if (image == null) {
          return null;
        }
    
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        console.log(filename)
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        console.log(filename)
    
        setUploading(true);
        setTransferred(0);
    
        const storageRef = firebase.storage().ref(`photos/${filename}`);
        const response = await fetch(uploadUri)
        const blob = await response.blob();
        const task = storageRef.put(blob)
    
        // Set transferred state
        task.on('state_changed', taskSnapshot => {  
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              );

            setTransferred(
              Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
    
        try {
          await task;
          const url = await storageRef.getDownloadURL();
    
          setUploading(false);
          setImage(null);
    
          // Alert.alert(
          //   'Image uploaded!',
          //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
          // );
          return url;
        } catch (error) {
          console.log(error);
          return null;
        }
    };

    /**
     * Function to save changes that the user made to their
     * profile picture and store it to the backend.
     *
     * @returns Clean-up function.
     */
    const handleSubmitPP = async () => {
        let unmounted = false;
        let imgUrl = await uploadImage();
    
        if (imgUrl == null && userData.userImg) {
          imgUrl = userData.userImg;
        }
    
        await db
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .update({
            userImg: imgUrl,
          })
          .then(() => {
            handleMessage('User Profile Picture updated!')
            console.log('User Profile Picture updated!');
          })
          .finally(
            () => {navigation.goBack()}
          );
    
    
        return () => {
          unmounted = true;
        };
    }; 

    /** 
     * Handling error message in Formik.
     */
    const handleMessage = (message, type = false) => {
        setMessage(message);
        setMessageType(type);
    }

    /**
     * Function to fetch user data from Firestore database.
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
        let unmounted = false;
        getUser();
        return () => {
        unmounted = true;
        };
    }, []);

    /**
     * Anonymous class that renders Text Input for Formik.
     *
     * @param {string} icon Name of Icon.
     * @param {boolean} isPassword Determine whether input is password or not.
     * @param {boolean} hidePassword Determine whether to show password or not.
     * @param {boolean} setHidePassword Set state to hide password/show password.
     * @param {*} props Other props set on the render method.
     * @returns Render of ChangePasswordPage.
     */
    const MyTextInput = ({icon, isPassword, hidePassword, setHidePassword, ...props}) => {
        return (
        <View>
            <LeftIcon editprofile={true}>
                <Ionicons name={icon} size={20} color={tertiary} />
            </LeftIcon>        
            <StyledTextInput editprofile={true} {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword )}>
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
                <Greetings profile={true}>
                    Edit Profile
                </Greetings>
                <View style={{ alignSelf: "center" }}>
                    <ProfileImage>
                        { image && <ProfilePic resizeMode="contain" source={{uri:image}}/>}
                    </ProfileImage>
                    <Add onPress={choosePhotoFromLibrary}>
                        <Ionicons name="ios-add" size={42} color="#000000" ></Ionicons>
                    </Add>
                </View>
                {uploading ? (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color="#000000" />
                    <Greetings sub={true}>Please wait... {transferred}% completed</Greetings>
                    </View>
                ) : null}
                <Formik
                    initialValues={{
                        fullName: userData
                        ? userData.fullName
                        : '', 
                        phoneNumber: userData
                        ? userData.phoneNumber
                        : '', 
                        Username: userData
                        ? userData.username
                        : ''}}
                    enableReinitialize={true}
                    onSubmit={async (values)  => {
                        db.collection("users").doc(firebase.auth().currentUser.uid)
                        .update({
                            fullName: values.fullName,
                            phoneNumber: values.phoneNumber,
                            username: values.Username
                        })
                        .then(handleMessage('User Data Updated!'))
                        .catch(error => {
                            if (error.code === 'auth/invalid-phone-number') {
                                console.log('Phone number is invalid!');
                                handleMessage("Phone number is invalid!");
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
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput
                                icon="ios-person-outline"
                                placeholder="Fullname"
                                placeholderTextColor={darkLight}
                                autoCorrect={false}
                                onChangeText= {handleChange('fullName')}
                                onBlur= {handleBlur('fullName')}
                                value= {values.fullName}
                            />
                            <MyTextInput
                                icon="ios-at"
                                placeholder="Username"
                                placeholderTextColor={darkLight}
                                autoCorrect={false}
                                onChangeText= {handleChange('Username')}
                                onBlur= {handleBlur('Username')}
                                value= {values.Username}
                                
                            />
                            <MyTextInput
                                icon="ios-call-outline"
                                placeholder="Phone Number"
                                placeholderTextColor={darkLight}
                                autoCorrect={false}
                                onChangeText= {handleChange('phoneNumber')}
                                onBlur= {handleBlur('phoneNumber')}
                                value= {values.phoneNumber}
                                keyboardType= "numeric"
                            />
                            <MessageBox type={messageType}>{message}</MessageBox>
                            <StyledButton onPress={() => {handleSubmit(); handleSubmitPP();}}>
                                <ButtonText>Save Changes</ButtonText>
                            </StyledButton>
                            <Line />
                        </StyledFormArea>
                    )}
                </Formik>
                <TextLink 
                    profile={true}
                    onPress={() => navigation.navigate("ChangePasswordPage")}
                    >
                    <TextLinkContent profile={true}>
                        Change Password
                    </TextLinkContent>
                </TextLink>
            </InnerContainer>
        </StyledContainer>
    );
}

export default EditProfilePage;