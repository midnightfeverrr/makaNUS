// Import Statements
import React, { useState, useEffect } from 'react';
import { Octicons } from "@expo/vector-icons";
import { View } from 'react-native';
import { 
    StyledContainerView,
    HeaderHome,
    Greetings,
    CardContainer,
    StyledReviewBody,
    ProfilePicture,
    ReviewerProfilePicture,
    CardSubtitle,
    Colors,
    AddToFavouritesBtn,
    CardReview,
    ReviewDetails,
    StyledRatingBar,
    CardThumbnail
} from '../components/styles';

// colors
const { tertiary, yellow } = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders StallReviewsPage.
 * 
 * @param {*} navigation Navigation prop.
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of StallReviewsPage.
 */
const StallReviewsPage = ({navigation, route}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);

    // Route Parameters
    const { params } = route.params;

    // Default Image(s)
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
     * Function to fetch stall data from Firestore database.
     */
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

    /**
     * React hook to fetch user data 
     * and stall's reviews data upon accessing the page.
     */
    useEffect(() => {
        getUser();
        getStallReviews();
    }, []);

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} review review data of a particular stall's review.
     * @returns Render of Cards that displays stall's reviews.
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

        /**
         * Anonymous class to render a particular review's picture.
         * 
         * @returns Render of a particular review's picture.
         */
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

        /**
         * State for reviewer's datas.
         */
        const [reviewerData, setReviewerData] = useState(null);
        const [reviewerDataImg, setReviewerDataImg] = useState(null);

        /**
         * Function to get the reviewer's data
         * of a particular review.
         * 
         * @returns Clean-up function.
         */
        const getReviewer = async () => {
            let unmounted = false;
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
            return () => {
                unmounted = true;
            };
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