import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Alert,
} from 'react-native';

// Icons
import { Octicons } from '@expo/vector-icons';
import { 
    StyledContainer,
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
} from '../components/styles';

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

// Favoritepage Render
const FavoritePage = ({navigation}) => {
    const [favoriteStall, setFavoriteStall] = useState(null);

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

    useEffect(() => {
        getFavoriteStalls();
        console.log("refreshed")
    }, []);

    const Card = ({food}) => {
        return (
        <CardButton onPress={() => navigation.navigate("StallPage", {itemId: food.name})}>
            <CardHome card3 ={true}>
                <CardThumbnailHolder card2={true}>
                    <CardThumbnail card2={true} source={{uri: food.url}} />
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
                </HeaderHome>
                <CardContainer
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={favoriteStall}
                    ListFooterComponent={<View style={{width: 40}}/>}
                    renderItem={({item}) => <Card food={item} />}
                />
            </InnerContainer>
        </StyledContainerView>
    );
}

export default FavoritePage;