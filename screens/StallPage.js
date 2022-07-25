// Import Statements
import React, { useState, useEffect } from 'react';
import { 
    View, 
    Linking, 
    Alert,
    RefreshControl
} from 'react-native';
import { FontAwesome, Octicons } from "@expo/vector-icons";
import {
    StyledContainer,
    Colors,
    StallPhoto,
    Title,
    SubTitle,
    DetailsContainer,
    Line,
    AddToFavouritesBtn,
    ButtonsContainer,
    CardThumbnailHolder,
    StallRow,
    LabelContainer,
    CardThumbnail,
    CardTitle,
    CardContainer,
    CardReview,
    ReviewerProfilePicture,
    ProfilePicture,
    ReviewDetailsScroll,
    StyledRatingBar,
    CardSubtitle,
    StyledReviewDetails,
    StyledReviewBox,
    TextLink,
    TextLinkContent,
} from './../components/styles';

// colors
const {
    brand, 
    darkLight, 
    tertiary, 
    primary, 
    red,
    yellow,
    green
} = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders StallPage.
 * 
 * @param {*} navigation Navigation prop.
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of StallPage.
 */
const StallPage = ({navigation, route}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const [refreshing, setRefreshing] = useState(false);

    // Route Parameters
    const { itemId } = route.params;

    // Default Image(s)
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    const defaultImage2 = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";

    /**
     * Function to refresh the page
     */
     const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getStallReviews()
        .then(() => setRefreshing(false));
      }, []);

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
        const stallDatas = [];
        await db
            .collection('stalls')
            .doc(itemId)
            .onSnapshot((querySnapshot) => {
                if( querySnapshot.exists ) {
                    console.log('Stall Data', querySnapshot.data());
                    setStallData(querySnapshot.data());
                }
        })
    }

    /**
     * Function to fetch stall's reviews data from Firestore database.
     */
    const getStallReviews = async () => {
        const reviewDatas = [];
        await db
        .collection("stalls")
        .doc(itemId)
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
     * State that shows whether a stall is in favorite.
     */
    const [favorited, setFavorited] = useState(false);

    /**
     * Function to check whether a particular stall
     * is in user's favorite page or not.
     * 
     * @returns Clean-up function.
     */
    const isInFavorite = async () => {
        let unmounted = false;
        await db.collection("users").doc(firebase.auth().currentUser.uid)
        .collection("favorites").doc(itemId).get().then(
            (DocumentSnapshot) => {
            if (DocumentSnapshot.exists) {
                setFavorited(true);
            } else {
                setFavorited(false);
            }}
        )
        return () => {
            unmounted = true;
        };
    }

    /**
     * React hook to fetch user data upon accessing the page.
     */
    useEffect(() => {
        getUser();
    }, []);

    /**
     * React hook to fetch stall data,
     * stall's reviews data, and check
     * whether the stall is in user's favorite
     * upon getting user's data.
     */
    useEffect(() => {
        getStalls();
        getStallReviews();
        isInFavorite();
    }, [userData]);

    /**
     * Function to save a particular stall
     * to user's favorite page.
     * 
     * @returns Clean-up function.
     */
    const handleFavorite = async () => {
        let unmounted = false;
        await db.collection("users").doc(firebase.auth().currentUser.uid)
        .collection("favorites").doc(itemId).get().then(
            (DocumentSnapshot) => {
            if (DocumentSnapshot.exists) {
                db.collection("users").doc(firebase.auth().currentUser.uid)
                .collection("favorites").doc(itemId).delete();
                setFavorited(false);
                console.log("deleted")
            } else {
                db.collection("users").doc(firebase.auth().currentUser.uid)
                .collection("favorites").doc(itemId).set({
                    category: stallData.category,
                    coordinate: stallData.coordinate,
                    distance: stallData.distance,
                    location: stallData.location,
                    name: stallData.name,
                    price: stallData.price,
                    url: stallData.url,
                })
                setFavorited(true);
                console.log("updated")
            }}
        )
        return () => {
            unmounted = true;
        };
    }

    /**
     * Anonymous class that renders the favorite icon.
     * If the stall is in user's favorite page,
     * the icon will be highlighted (fill-icon), vice versa.
     * 
     * @returns Render of Favorite (Love) Icon
     */
    const FavoriteIcon = () => {
        if (favorited) {
            return (
                <AddToFavouritesBtn stall={true} onPress={handleFavorite}>
                            <Octicons name="heart-fill" size={30} color={brand}/>
                </AddToFavouritesBtn>
            )
        } else {
            return (
                <AddToFavouritesBtn stall={true} onPress={handleFavorite}>
                            <Octicons name="heart" size={30} color={brand}/>
                </AddToFavouritesBtn>
            )
        }
    }

    /**
     * Constants to accomodate rendering of page
     */
    const priceString = "$";
    const stallLat = stallData ? stallData.coordinate.latitude : null;
    const stallLng = stallData ? stallData.coordinate.longitude : null;
    const stallUrl = "http://maps.google.com?q=" + stallLat + "," + stallLng;

    /**
     * Function to redirect user to Google Maps
     * of the particular stall.
     */
    const handleClick = () => {
        Linking.canOpenURL(stallUrl).then(supported => {
          if (supported) {
            Linking.openURL(stallUrl);
          } else {
            console.log("Don't know how to open URI: " + stallUrl);
          }
        });
      };

    /**
     * Anonymous class that renders a box
     * displaying stall's overall rating and the number
     * of rating it has.
     * The color of the box changes according to the
     * rating a particular stall has.
     *
     * @param {*} rating Overall rating of a particular stall.
     * @returns Render of Box that displays rating data.
     */
    const Box = ({rating}) => {
        if (rating >= 4) {
            return (
            <StyledReviewDetails>
                <StyledReviewBox style={{backgroundColor: primary}}>
                    <StyledReviewBox inside={true} style={{backgroundColor: green}}>
                        <CardTitle review2={true}>{stallData ? stallData.rating : 1}</CardTitle>
                        <Octicons name={"star-fill"} color={primary} size={10} />
                    </StyledReviewBox>
                    <SubTitle review={true}>{stallData ? stallData.numOfRatings : 0}</SubTitle>
                    <SubTitle review2={true}>Reviews</SubTitle>
                </StyledReviewBox>
            </StyledReviewDetails>    
        )} else if (rating >= 2 && rating < 4) {
            return (
            <StyledReviewDetails>
                <StyledReviewBox style={{backgroundColor: primary}}>
                    <StyledReviewBox inside={true} style={{backgroundColor: yellow}}>
                        <CardTitle review2={true}>{stallData ? stallData.rating : 1}</CardTitle>
                        <Octicons name={"star-fill"} color={primary} size={10} />
                    </StyledReviewBox>
                    <SubTitle review={true}>{stallData ? stallData.numOfRatings : 0}</SubTitle>
                    <SubTitle review2={true}>Reviews</SubTitle>
                </StyledReviewBox>
            </StyledReviewDetails>    
        )} else if (rating == 0) {
            return (
            <StyledReviewDetails>
                <StyledReviewBox style={{backgroundColor: primary}}>
                    <StyledReviewBox inside={true} style={{backgroundColor: darkLight}}>
                        <CardTitle review2={true}>{stallData ? stallData.rating : 1}</CardTitle>
                        <Octicons name={"star-fill"} color={primary} size={10} />
                    </StyledReviewBox>
                    <SubTitle review={true}>{stallData ? stallData.numOfRatings : 0}</SubTitle>
                    <SubTitle review2={true}>Reviews</SubTitle>
                </StyledReviewBox>
            </StyledReviewDetails>    
        )} else { 
            return (
            <StyledReviewDetails>
                <StyledReviewBox style={{backgroundColor: primary}}>
                    <StyledReviewBox inside={true} style={{backgroundColor: red}}>
                        <CardTitle review2={true}>{stallData ? stallData.rating : 1}</CardTitle>
                        <Octicons name={"star-fill"} color={primary} size={10} />
                    </StyledReviewBox>
                    <SubTitle review={true}>{stallData ? stallData.numOfRatings : 0}</SubTitle>
                    <SubTitle review2={true}>Reviews</SubTitle>
                </StyledReviewBox>
            </StyledReviewDetails>    
            )}
    }

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} review Review data of a particular stall.
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
        <CardReview stall={true}>
            <ReviewerProfilePicture>
                <ProfilePicture 
                    review={true}
                    source={{ uri: 
                        reviewerDataImg
                        ? reviewerDataImg || defaultImage
                        : defaultImage }}
                />
            </ReviewerProfilePicture>
            <ReviewDetailsScroll>
                <CardSubtitle review={true}>{reviewerData ? reviewerData : ""}</CardSubtitle>
                <CustomRatingBar />
                <CardSubtitle timestamp={true}>{review.createdAt}</CardSubtitle>
                <CardSubtitle review2={true}>{review.review}</CardSubtitle>
            </ReviewDetailsScroll>
        </CardReview>
        )
    }

    /**
     * Anonymous class to render add review button.
     * The Button will alert user if user tries to
     * add review, meanwhile already reviewed the stall.
     * 
     * @returns Render of Add Review Button.
     */
    const AddReview = () => {
        const [reviewed, setReviewed] = useState(false);
        const isReviewed = async () => {
            await db
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("reviews")
            .doc(itemId)
            .onSnapshot((querySnapshot) => {
                if( querySnapshot.exists ) {
                    setReviewed(true);
                } else {
                    setReviewed(false);
                }
            })
        } 
        isReviewed();

        if (reviewed) {
            return (
                <TextLink 
                    onPress={() => Alert.alert(
                        "Cannot Add Review!",
                        "Stall has been reviewed",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("OK Pressed"),
                                style: "OK",
                            },
                        ],
                        {
                            cancelable: false,
                        }
                    )}>
                    <TextLinkContent profile={true}>add review</TextLinkContent>
                </TextLink>
            )
        } else {
            return (
                <TextLink 
                    onPress={() => navigation.navigate("MakeReviewPage", {params: itemId})}>
                    <TextLinkContent profile={true}>add review</TextLinkContent>
                </TextLink>
            )
        }
    }

    return (
        <StyledContainer 
        stall={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <StallPhoto source={{uri: stallData
                                    ? stallData.url == "" ? defaultImage2 : stallData.url
                                    : defaultImage2 }} />
            <ButtonsContainer back={true}>
                <AddToFavouritesBtn onPress={() => navigation.goBack()}>
                    <Octicons name="arrow-left" size={30} color={primary} />
                </AddToFavouritesBtn>
            </ButtonsContainer>
            <DetailsContainer>
                <DetailsContainer inner={true}>
                    <Title>{stallData
                            ? stallData.name
                            : ''}</Title>
                    <Line stall={true}></Line>
                    <Title SubTitle={true}>Category</Title>
                    <Title Detail={true}>{stallData
                            ? stallData.category[0]
                            : ''}</Title>
                    <Title SubTitle={true}>Location</Title>
                    <Title Detail={true}>{stallData
                            ? stallData.location
                            : ''}</Title>
                    <Title SubTitle={true}>Price</Title>
                    <Title Detail={true}>{stallData
                            ? priceString.repeat(stallData.price)
                            : ''}</Title>
                    <ButtonsContainer>
                        <FavoriteIcon />
                        <AddToFavouritesBtn stall={true} onPress={handleClick}>
                            <FontAwesome name="map-marker" size={30} color={tertiary} />
                        </AddToFavouritesBtn>
                    </ButtonsContainer>
                </DetailsContainer>
                <Box rating={stallData ? stallData.rating : 1}/>
            </DetailsContainer>
            <LabelContainer>
                <Title Label={true}>Menu</Title>
            </LabelContainer>
            <StallRow>
                <CardThumbnailHolder stall={true}>
                    <CardThumbnail source={{uri: stallData
                                    ? stallData.url == "" ? defaultImage2 : stallData.url
                                    : defaultImage2 }}/>
                </CardThumbnailHolder>
            </StallRow>
            <LabelContainer>
                <Title Label2={true}>Review</Title>
                <AddReview />
            </LabelContainer>
            <View>
                <CardContainer
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={reviewData}
                    ListFooterComponent={<View style={{width: 40}}/>}
                    renderItem={({item}) => <Card 
                        review={item} 
                    />}
                />
            </View>
            <TextLink 
                stall={true}
                onPress={() => navigation.navigate("StallReviewsPage", {params: itemId})}>
                <TextLinkContent profile={true}>see all</TextLinkContent>
            </TextLink> 
        </StyledContainer>
    );
};


export default StallPage;