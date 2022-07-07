import React, { useState, useEffect } from 'react';
import { Octicons } from "@expo/vector-icons";
import {
  View,
  Alert,
} from 'react-native';

// Icons
import { 
    StyledContainer,
    StyledContainerView,
    InnerContainer,
    HeaderHome,
    ButtonsContainer,
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
const StallCategoryPage = ({navigation, route}) => {
    const [categoryStall, setCategoryStall] = useState(null);
    const { itemId } = route.params;

    const getCategoryStalls = async () => {
        const stallDatas = [];
        await db.collection("stalls")
            .where("category", "array-contains", itemId)
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

                    setCategoryStall(stallDatas);
                })
            })
    }

    useEffect(() => {
        getCategoryStalls();
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
                    <View style={{flexDirection: 'row'}}>
                    <AddToFavouritesBtn stall2={true} onPress={() => navigation.goBack()}>
                        <Octicons name="arrow-left" size={20} color={tertiary} />
                    </AddToFavouritesBtn>
                        <Greetings title={true}>Food in {itemId} category!</Greetings>
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
                    data={categoryStall}
                    ListFooterComponent={<View style={{height: 40}}/>}
                    renderItem={({item}) => <Card food={item} />}
                />
            </InnerContainer>
        </StyledContainerView>
    );
}

export default StallCategoryPage;