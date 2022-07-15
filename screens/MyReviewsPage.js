import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Octicons } from "@expo/vector-icons";
import {
  View,
  Alert,
  TouchableOpacity
} from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { 
    StyledContainer,
    StyledContainerView,
    InnerContainer,
    HeaderHome,
    Greetings,
    CardHome,
    CardButton,
    CardContainer,
    StyledReviewBody,
    ProfilePicture,
    ReviewerProfilePicture,
    CardDetails,
    CardSubtitle,
    CardTitle,
    Colors,
    AddToFavouritesBtn,
    CardReview,
    ReviewDetails,
    StallDetails,
    StyledRatingBar
} from '../components/styles';

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
const db = firebase.firestore();

// MyReviewsPage Render
const MyReviewsPage = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    const defaultImage2 = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";

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

    // Get User's Reviews
    const getUserReviews = async () => {
        const reviewDatas = [];
        await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("reviews")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const {
                    rating, 
                    review,
                    reviewImg,
                    createdAt,
                } = doc.data();

                reviewDatas.push({
                    name: doc.id,
                    rating: rating,
                    review: review,
                    reviewImg: reviewImg,
                    createdAt: createdAt.toDate().toString(),
                })

                setReviewData(reviewDatas);
            })
        })
    }    

    // Get Stall Data
    const getStalls = async () => {
        const stallDatas = [];
        await db
            .collection('stalls')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const {
                        category,
                        location,
                        name, 
                        price,
                        url,
                        coordinate,
                        distance
                    } = doc.data();

                    stallDatas.push({
                        category: category,
                        location: location,
                        name: name,
                        price: price,
                        url: url,
                        coordinate: coordinate,
                        distance: distance,
                    })

                    setStallData(stallDatas);
                })
            })
    }

    useEffect(() => {
        getUser();
        getUserReviews();
        getStalls();
    }, []);

    const Card = ({review}) => {
        const CustomRatingBar = () => {
            return (
                <StyledRatingBar review={true}>
                    {
                        maxRating.map((item, key) => {
                            return (
                                <Octicons 
                                    name={
                                        item <= review.rating
                                        ? 'star-fill'
                                        : 'star'    
                                    }
                                    size={15}
                                    color={yellow}
                                />
                            )
                        })
                    }
                </StyledRatingBar>
            )
        }

        return (
        <CardReview>
            <ReviewerProfilePicture>
                <ProfilePicture 
                    review={true}
                    source={{ uri: 
                        userData
                        ? userData.userImg || defaultImage
                        : defaultImage }}
                />
            </ReviewerProfilePicture>
            <ReviewDetails review={true}>
                <CardSubtitle review={true}>{userData ? userData.username : ''}</CardSubtitle>
                <CustomRatingBar />
                <CardSubtitle timestamp={true}>{review.createdAt}</CardSubtitle>
                <CardSubtitle review2={true}>{review.review}</CardSubtitle>
                <StallDetails>
                    <ProfilePicture 
                    review2={true}
                    source={{ uri: 
                        review.reviewImg !== null
                        ? review.reviewImg || defaultImage2
                        : defaultImage2 }}
                    />
                    <CardTitle review={true}>{review.name}</CardTitle>
                </StallDetails>
            </ReviewDetails>
        </CardReview>
        )
    }
    

    return (
        <StyledContainerView review={true}>
            <HeaderHome review={true}>
                <AddToFavouritesBtn stall2={true} onPress={() => navigation.goBack()}>
                    <Octicons name="arrow-left" size={30} color={tertiary} />
                </AddToFavouritesBtn>
                <Greetings title={true}>My Reviews </Greetings>
            </HeaderHome>
            <StyledReviewBody>
                <CardContainer
                    review={true}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={reviewData}
                    ListFooterComponent={<View style={{height: 50}}/>}
                    renderItem={({item}) => <Card review={item} />}
                />
            </StyledReviewBody>
        </StyledContainerView>
    );
}

export default MyReviewsPage;