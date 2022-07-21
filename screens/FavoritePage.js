// Import Statements
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
    StyledContainerView,
    InnerContainer,
    HeaderHome,
    Greetings,
    CardHome,
    CardButton,
    CardContainer,
    CardThumbnailHolder,
    CardThumbnail,
    CardDetails,
    CardSubtitle,
    CardTitle,
    Colors,
    AddToFavouritesBtn,
} from '../components/styles';

// colors
const { tertiary } = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders FavoritePage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of FavoritePage.
 */
const FavoritePage = ({navigation}) => {
    // States
    const [favoriteStall, setFavoriteStall] = useState(null);

    // Default Image(s)
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";

    /**
     * Function to fetch user's favorite stalls
     * data from Firestore database.
     */
    const getFavoriteStalls = async () => {
        const stallDatas = [];
        await db.collection("users").doc(firebase.auth().currentUser.uid)
            .collection("favorites")
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

                    setFavoriteStall(stallDatas);
                })
            })
    }

    /**
     * React hook to fetch user data upon accessing the page.
     */
    useEffect(() => {
        getFavoriteStalls();
    }, []);

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} food stall data of a particular stall.
     * @returns Render of Cards that displays favorited stalls.
     */
    const Card = ({food}) => {
        return (
        <CardButton onPress={() => navigation.navigate("StallPage", {itemId: food.name})}>
            <CardHome card3 ={true}>
                <CardThumbnailHolder card2={true}>
                    <CardThumbnail card2={true} source={{uri: food.url == "" ? defaultImage : food.url}} />
                </CardThumbnailHolder>
                <CardDetails card2={true}>
                    <CardSubtitle>Restaurant</CardSubtitle>
                    <CardTitle>{food.name}</CardTitle>
                </CardDetails>
            </CardHome>
        </CardButton>
        )
    }

    return (
        <StyledContainerView>
            <InnerContainer fav={true}>
                <HeaderHome fav={true}>
                    <View>
                        <Greetings title={true}>Your Favorite Stalls! </Greetings>
                        {/* <Greetings user={true}>user</Greetings> */ } 
                        { /*
                        <Greetings sub={true}>
                            What do you want to eat today?
                        </Greetings>
                        */}
                    </View>
                    <AddToFavouritesBtn 
                        stall={true}
                        onPress={getFavoriteStalls}
                    >
                        <Ionicons name="refresh" size={20} color={tertiary} />
                    </AddToFavouritesBtn>
                </HeaderHome>
                <CardContainer
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={favoriteStall}
                    ListFooterComponent={<View style={{height: 40}}/>}
                    renderItem={({item}) => <Card food={item} />}
                />
            </InnerContainer>
        </StyledContainerView>
    );
}

export default FavoritePage;