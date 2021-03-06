import React, { useState, useEffect } from 'react';
import { Octicons } from "@expo/vector-icons";
import { 
    StyledContainerView,
    HeaderHome,
    Greetings,
    CardContainer,
    StyledReviewBody,
    ProfilePicture,
    ReviewerProfilePicture,
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
    tertiary, 
    yellow
} = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders MyReviewPage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of MyReviewPage.
 */
const MyReviewsPage = ({navigation}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    const defaultImage2 = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";

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
     * Function to fetch user's reviews data from Firestore database.
     */
    const getUserReviews = async () => {
        const reviewDatas = [];
        await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("reviews")
        .orderBy("createdAt", "desc")
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

    /**
     * React hook to fetch user data
     * and user's reviews data upon accessing the page.
     */
    useEffect(() => {
        getUser();
        getUserReviews();
    }, []);

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} review review data of a particular user's review.
     * @returns Render of Cards that displays user's reviews.
     */
    const Card = ({review}) => {
        /**
         * Anonymous class to render star rating.
         * 
         * @returns Render of Star Rating.
         */
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
                    renderItem={({item}) => <Card review={item} />}
                />
            </StyledReviewBody>
        </StyledContainerView>
    );
}

export default MyReviewsPage;