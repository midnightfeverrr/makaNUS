import React, {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";

// Icons
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    StyledContainerView,
    HeaderHome,
    Greetings,
    ProfilePictureHolder,
    ProfilePicture,
    StyledFormArea,
    StyledTextInput,
    LeftIcon,
    LocationHolder,
    BodyOneHome,
    SortBtn,
    CategoriesListContainer,
    CategoryBtn,
    CategoryBtnText,
    CardHome,
    CardButton,
    CardContainer,
    CardThumbnailHolder,
    CardThumbnailOpacity,
    CardThumbnail,
    CardDetails,
    CardTextHolder,
    CardSubtitle,
    CardTitle,
    AddToFavouritesBtn,
    TitleHome,
    Colors,
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
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

// Searchpage render
const SearchPage = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";
    const [search, setSearch] = useState({
        loading: false,
        data: stallData,
        error: null,
        searchValue: '',
    });

    // Search Function
    const searchFunction = text => {
        if (text) {
          const updatedData = stallData.filter(item => {
            const item_data = `${item.name.toUpperCase()}`;
            const text_data = text.toUpperCase();
            return item_data.indexOf(text_data) > -1;
          });
          setSearch({data: updatedData, searchValue: text});
        } else {
          setSearch({data: stallData, searchValue: text});
        }
    };

    // Database Query
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

                    setStallData(stallDatas);}
                )
            })
    }

    useEffect(() => {
        getUser();
        getStalls();
    }, []);

    const Card = ({food}) => {
        return (
        <CardButton onPress={() => navigation.navigate("StallPage", {itemId: food.name})}>
            <CardHome search={true}>
                <CardThumbnailHolder search={true}>
                    <CardThumbnail search={true} source={{uri: food.url == "" ? defaultImage : food.url}} />
                </CardThumbnailHolder>
                <CardDetails search={true}>
                    <CardTextHolder search={true}>
                        <CardSubtitle>Restaurant</CardSubtitle>
                        <CardTitle>{food.name}</CardTitle>
                    </CardTextHolder>
                    <CardTextHolder search={true}>
                        <CardSubtitle>Distance</CardSubtitle>
                        <CardTitle>{food.distance}km</CardTitle>
                    </CardTextHolder>
                    
                </CardDetails>
            </CardHome>
        </CardButton>
        )
    }

    return (
        <StyledContainerView>
        <StatusBar style="dark" />
            <HeaderHome>
                <View>
                        <Greetings>Browse Foods! </Greetings>
                </View>
            </HeaderHome>
            <BodyOneHome>
                <StyledFormArea search={true}>
                    <MyTextInput 
                        icon="search"
                        placeholder="Search here"
                        value={search.searchValue}
                        onChangeText={text => searchFunction(text)}
                        autoCorrect={false}
                    />
                </StyledFormArea>
            </BodyOneHome>    
            <View style={{paddingTop:20}}>
                <CardContainer
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={search.data}
                    ListFooterComponent={<View style={{height: 180}}/>}
                    renderItem={({item}) => <Card
                        food={item} 
                    />}
                />
            </View>
        </StyledContainerView>
    )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
      <View>
        <LeftIcon search={true}>
            <Octicons name={icon} size={25} color={darkLight} />
        </LeftIcon>        
        <StyledTextInput {...props}/>
      </View>);
};

export default SearchPage;