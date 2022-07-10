import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Alert, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Octicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

// form
import { Formik } from 'formik';

import {
    StyledContainer,
    ButtonsContainer,
    HeaderHome,
    Greetings,
    ProfilePicture,
    StyledFormArea,
    StyledTextInput,
    MessageBox,
    CardTextHolder,
    CardTitle,
    AddToFavouritesBtn,
    StyledRatingBar,
    AddPhotobox,
    Colors,
    InnerContainer,
    StyledButton,
    ButtonText,
    ReviewThumbnail,
} from './../components/styles';

// colors
const {
    brand, 
    darkLight, 
    tertiary, 
    primary, 
    secondary,
    red,
    yellow
} = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

// MakeReviewPage Render
const MakeReviewPage = ({navigation, route}) => {
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(defaultImage);
    const { params } = route.params;
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";

    // Choosing Photo From Library
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

    // Uploading image
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
    
        const storageRef = firebase.storage().ref(`reviews/${filename}`);
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

    // Get User Data
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

    const getStalls = async () => {
        const stallDatas=[]
        await db
            .collection('stalls')
            .doc(params)
            .onSnapshot((querySnapshot) => {
                if(querySnapshot.exists) {
                    console.log('Stall Data', querySnapshot.data());
                    setStallData(querySnapshot.data());
                }
            })
    }

    useEffect(() => {
        getUser(); 
        getStalls();
    }, []);

    const CustomRatingBar = () => {
        return (
            <StyledRatingBar>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setDefaultRating(item)}
                            >
                            <Octicons 
                                name={
                                    item <= defaultRating
                                    ? 'star-fill'
                                    : 'star'    
                                }
                                size={25}
                                color={yellow}
                            />
                            </TouchableOpacity>
                        )
                    })
                }
            </StyledRatingBar>
        )
    }

    return (
        <StyledContainer review={true}>
        <ButtonsContainer back4={true}>
                <AddToFavouritesBtn onPress={() => navigation.goBack()}>
                    <Octicons name="arrow-left" size={30} color={tertiary} />
                </AddToFavouritesBtn>
        </ButtonsContainer>
        <StatusBar style="dark" />
        <InnerContainer>
            <HeaderHome>
                <View>
                    <View style={{flexDirection: "row"}}>
                        <Greetings>Add Review </Greetings>
                    </View>
                    <Greetings>for {stallData 
                                    ? stallData.name
                                    : ""} </Greetings>
                </View>
                    <ProfilePicture 
                        source={{ uri: userData
                                  ? userData.userImg || defaultImage
                                  : defaultImage }}
                    />  
            </HeaderHome>
            <CustomRatingBar />
            <AddPhotobox>
                <CardTextHolder addphotos={true}>
                    <CardTitle addphotos={true}>Add Photos</CardTitle>
                </CardTextHolder>
                <AddPhotobox addphotos={true}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary}>
                        <Octicons name={'plus'} size={35} color={tertiary} />
                    </TouchableOpacity>
                { image && <ReviewThumbnail source={{uri:image}}/>}
                </AddPhotobox>  
                <Formik 
                    initialValues={{review: ""}}
                    onSubmit={async (values) => {
                        let imgUrl = await uploadImage();

                        await db
                        .collection('users')
                        .doc(firebase.auth().currentUser.uid)
                        .collection('reviews')
                        .doc(params)
                        .set({
                            rating: defaultRating,
                            review: values.review,
                            reviewImg: imgUrl,
                            createdAt: new Date()
                        })
                        .then(() =>{
                          db
                          .collection('stalls')
                          .doc(params)
                          .collection("reviews")
                          .doc(firebase.auth().currentUser.uid)
                          .set({
                            rating: defaultRating,
                            review: values.review,
                            reviewImg: imgUrl,
                            createdAt: new Date()
                          })
                        })
                        .then(() => {
                          db
                          .collection('users')
                          .doc(firebase.auth().currentUser.uid)
                          .update({
                            xp: userData.xp+10,
                            level: (userData.xp+10) % 100 == 0 ? userData.level + 1 : userData.level
                          })
                        
                          console.log('Review submitted!');
                          navigation.goBack();
                        })
                    }}
                >
                {({handleChange, handleSubmit, values}) => ( 
                    <StyledFormArea review={true}>
                        <MyTextInput 
                            icon="pencil"
                            placeholder="Write your review here..."
                            placeholderTextColor={darkLight}
                            autoCorrect={false}
                            onChangeText= {handleChange('review')}
                            value= {values.review}
                            maxLength= {250}
                            multiline={true}
                            numberOfLines={5}
                            textAlignVertical={"top"}
                            textBreakStrategy={"highQuality"}
                        />
                        <MessageBox>max 250 characters</MessageBox>
                        <StyledButton addphotos={true} onPress={handleSubmit}>
                            <ButtonText>Upload</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                )}
                </Formik>
            </AddPhotobox>
        </InnerContainer>
        </StyledContainer>
    );
}

// Form Style
const MyTextInput = ({icon,  ...props}) => {
    return (
      <View style={{width: '80%'}}>
        <StyledTextInput review={true} {...props}/>
      </View>);
};


export default MakeReviewPage;