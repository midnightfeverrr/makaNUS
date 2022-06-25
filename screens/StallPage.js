import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, Octicons } from "@expo/vector-icons";
import {
    StyledContainer,
    Colors,
    ProfileImage,
    Greetings,
    StallPhoto,
    MenuPhoto,
    ReviewButton,
    Title,
    DetailsContainer,
    Line,
    AddToFavouritesBtn,
    ButtonsContainer,
    CardThumbnailHolder,
    StallRow,
    LabelContainer,
    CardThumbnail,
    CardButton,
    CardHome,
    CardDetails,
    CardTitle,
    CardSubtitle,
    CardContainer,
} from './../components/styles';

// colors
const {
    brand, 
    darkLight, 
    tertiary, 
    primary, 
    secondary,
    red
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
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
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

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getStalls();
    }, [userData]);

    {/* const handleFavorite = async () => {
        await db.collection("users").doc(firebase.auth().currentUser.uid)
        .collection("favorites").doc(food.name).get().then(
            (DocumentSnapshot) => {
            if (DocumentSnapshot.exists) {
                db.collection("users").doc(firebase.auth().currentUser.uid)
                .collection("favorites").doc(food.name).delete();
                console.log("deleted")
            } else {
                db.collection("users").doc(firebase.auth().currentUser.uid)
                .collection("favorites").doc(food.name).set({
                    category: food.category,
                    coordinate: food.coordinate,
                    distance: food.distance,
                    location: food.location,
                    name: food.name,
                    price: food.price,
                    url: food.url,
                    icon: "heart-fill"
                })
                console.log("updated")
            }}
        )
    } */}

    const ReviewCard = () => {
        return (
            <CardButton>
            <CardHome card4={true}>
                <CardThumbnailHolder stall2={true}>
                    <CardThumbnail stall2={true} source={{
                            uri: userData
                            ? userData.img
                            : defaultImage }} />
                </CardThumbnailHolder>
                <CardDetails stall={true}>
                    <CardSubtitle>"Lorem Ipsum dolor sit amet, consectetur.."</CardSubtitle>
                </CardDetails>
            </CardHome>
        </CardButton>
        )
    }

    const priceString = "$";

    return (
        <StyledContainer stall={true}>
            <StallPhoto source={{uri: stallData
                                    ? stallData.url
                                    : defaultImage }} />
            <ButtonsContainer back={true}>
                <AddToFavouritesBtn>
                    <Octicons name="arrow-left" size={30} color={primary} />
                </AddToFavouritesBtn>
            </ButtonsContainer>
            <DetailsContainer stall={true}>
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
                    <AddToFavouritesBtn stall={true} onPress={() => (null)}>
                        <Octicons name="heart" size={30} color={brand}/>
                    </AddToFavouritesBtn>
                    <AddToFavouritesBtn stall={true} onPress={() => (null)}>
                        <FontAwesome name="map-marker" size={30} color={tertiary} />
                    </AddToFavouritesBtn>
                </ButtonsContainer>
            </DetailsContainer>
            <LabelContainer>
                <Title Label={true}>Menu</Title>
                <Title Label={true}>Reviews</Title>
            </LabelContainer>
            <StallRow>
                <CardThumbnailHolder stall={true}>
                    <CardThumbnail source={{uri: stallData
                                    ? stallData.url
                                    : defaultImage }}/>
                </CardThumbnailHolder>
                {/*<CardContainer
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={nearbyStallData}
                    ListFooterComponent={<View style={{width: 40}}/>}
                    renderItem={({item}) => <Card food={item} />}
                    />*/}
            </StallRow>
        </StyledContainer>
    );
};


export default StallPage;