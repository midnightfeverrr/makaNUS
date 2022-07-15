import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
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
    CardHome,
    ReviewerProfilePicture,
    ProfilePicture,
    ReviewDetails,
    ReviewDetailsScroll,
    StallDetails,
    StyledRatingBar,
    CardSubtitle,
    StyledReviewDetails,
    StyledReviewBox,
    TextLink,
    TextLinkContent,
    CardButton
} from './../components/styles';

// colors
const {
    brand, 
    darkLight, 
    tertiary, 
    primary, 
    secondary,
    red,
    yellow,
    green
} = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.firestore();

// Stallpage render
const StallPage = ({navigation, route}) => {
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    const defaultImage2 = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";
    const { itemId } = route.params;

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

    // Get Stall Data
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

    // Get Stall's Reviews
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

    // Check if stall is in user's favorite
    const [favorited, setFavorited] = useState(false);
    const isInFavorite = async () => {
        await db.collection("users").doc(firebase.auth().currentUser.uid)
        .collection("favorites").doc(itemId).get().then(
            (DocumentSnapshot) => {
            if (DocumentSnapshot.exists) {
                setFavorited(true);
            } else {
                setFavorited(false);
            }}
        )
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getStalls();
        getStallReviews();
        isInFavorite();
    }, [userData]);

    // Favorite Button
    const handleFavorite = async () => {
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
    }

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

    // Misc
    const priceString = "$";
    const stallLat = stallData ? stallData.coordinate.latitude : null;
    const stallLng = stallData ? stallData.coordinate.longitude : null;
    const stallUrl = "http://maps.google.com?q=" + stallLat + "," + stallLng;

    // Maps Button
    const handleClick = () => {
        Linking.canOpenURL(stallUrl).then(supported => {
          if (supported) {
            Linking.openURL(stallUrl);
          } else {
            console.log("Don't know how to open URI: " + stallUrl);
          }
        });
      };

    // Restaurant Overall Card
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
                    <StyledReviewBox inside={true} style={{backgroundColor: green}}>
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

    // Review Card
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

    return (
        <StyledContainer stall={true}>
            <StallPhoto source={{uri: stallData
                                    ? stallData.url
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
                                    ? stallData.url
                                    : defaultImage2 }}/>
                </CardThumbnailHolder>
            </StallRow>
            <LabelContainer>
                <Title Label2={true}>Review</Title>
                <TextLink 
                    onPress={() => navigation.navigate("MakeReviewPage", {params: itemId})}>
                    <TextLinkContent profile={true}>add review</TextLinkContent>
                </TextLink>
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