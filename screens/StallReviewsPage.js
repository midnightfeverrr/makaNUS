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
    StyledRatingBar,
    CardThumbnail
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

// StallReviewsPage Render
const StallReviewsPage = ({navigation, route}) => {
    const [userData, setUserData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    const defaultImage2 = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";
    const { params } = route.params;

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

    // Get Stall's Reviews
    const getStallReviews = async () => {
        const reviewDatas = [];
        await db
        .collection("stalls")
        .doc(params)
        .collection("reviews")
        .orderBy("createdAt", "desc")
        .limit(3)
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

    useEffect(() => {
        getUser();
        getStallReviews();
    }, []);

    const Card = ({review}) => {
        // Render Star Ratings
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

        // Render Review Picture
        const ReviewPicture = () => {
            if (review.reviewImg == null || review.reviewImg == "") {
                return null;
            } else {
                return (
                <CardThumbnail
                review={true}
                source={{ uri: 
                    review.reviewImg !== null
                    ? review.reviewImg || defaultImage2
                    : defaultImage2 }}
                />
                )
            }
        }

        
        const [reviewerData, setReviewerData] = useState(null);
        const [reviewerDataImg, setReviewerDataImg] = useState(null);
        const getReviewer = async () => {
            await db
            .collection("users")
            .doc(review.name)
            .onSnapshot((querySnapshot) => {
                if( querySnapshot.exists ) {
                    console.log("breakpoint")
                    setReviewerData(querySnapshot.data().username);
                    setReviewerDataImg(querySnapshot.data().userImg);
                }
            })
        } 
        getReviewer();

        return (
        <CardReview>
            <ReviewerProfilePicture>
                <ProfilePicture 
                    review={true}
                    source={{ uri: 
                        reviewerDataImg
                        ? reviewerDataImg || defaultImage
                        : defaultImage }}
                />
            </ReviewerProfilePicture>
            <ReviewDetails review={true}>
                <CardSubtitle review={true}>{reviewerData ? reviewerData : ""}</CardSubtitle>
                <CustomRatingBar />
                <CardSubtitle timestamp={true}>{review.createdAt}</CardSubtitle>
                <CardSubtitle review2={true}>{review.review}</CardSubtitle>
                <ReviewPicture />
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
                <Greetings title={true}>Stall Reviews </Greetings>
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

export default StallReviewsPage;