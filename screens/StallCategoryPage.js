// Import Statements
import React, { useState, useEffect } from 'react';
import { Octicons } from "@expo/vector-icons";
import { View } from 'react-native';
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
 * Anonymous class that renders StallCategoryPage.
 * 
 * @param {*} navigation Navigation prop.
 * @param {*} route Argument that carries over the parameters passed from the previous screen.
 * @returns Render of StallCategoryPage.
 */
const StallCategoryPage = ({navigation, route}) => {
    // States
    const [categoryStall, setCategoryStall] = useState(null);

    // Route Parameters
    const { itemId } = route.params;

    // Default Image(s)
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";

    /**
     * Function to fetch stall data
     * according to its category from Firestore database.
     */
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

    /**
     * React hook to fetch stall data upon accessing the page.
     */
    useEffect(() => {
        getCategoryStalls();
    }, []);

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} food stall data of a particular stall.
     * @returns Render of Cards that displays stalls according to its category.
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