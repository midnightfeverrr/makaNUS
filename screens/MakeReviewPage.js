// Import Statements
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Octicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
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
    darkLight, 
    tertiary, 
    yellow
} = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders MakeReviewPage.
 *
 * @param {*} navigation Navigation prop.
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of MakeReviewPage.
 */
const MakeReviewPage = ({navigation, route}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(defaultImage);

    // Route Parameters
    const { params } = route.params;

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
     * Function to fetch stall data from Firestore database.
     */
    const getStalls = async () => {
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

    /**
     * React hook to fetch user and stall data upon accessing the page.
     */
    useEffect(() => {
        getUser(); 
        getStalls();
    }, []);

    /**
     * Anonymous class to render star rating.
     * 
     * @returns Render of Star Rating.
     */
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

    /**
     * Anonymous class that renders Text Input for Formik.
     *
     * @param {string} icon Name of Icon.
     * @param {*} props Other props set on the render method.
     * @returns Render of Formik Text Input.
     */
    const MyTextInput = ({icon,  ...props}) => {
        return (
        <View style={{width: '80%'}}>
            <StyledTextInput review={true} {...props}/>
        </View>);
    };

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
                        let newAvgRating = ((stallData.rating * stallData.numOfRatings) + defaultRating) / (stallData.numOfRatings + 1); 
                        newAvgRating = newAvgRating.toPrecision(2);
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
                        .then(() => {
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
                            .collection('stalls')
                            .doc(params)
                            .update({
                                rating: newAvgRating,
                                numOfRatings: stallData.numOfRatings + 1
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
                        {uploading ? (
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="small" color="#000000" />
                            <Greetings sub={true}> {transferred}% completed</Greetings>
                            </View>
                        ) : null}
                    </StyledFormArea>
                )}
                </Formik>
            </AddPhotobox>
        </InnerContainer>
        </StyledContainer>
    );
}

export default MakeReviewPage;