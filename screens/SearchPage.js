// Import Statements
import React, {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { View } from "react-native";
import { Octicons } from '@expo/vector-icons';
import {
    StyledContainerView,
    HeaderHome,
    Greetings,
    StyledFormArea,
    StyledTextInput,
    LeftIcon,
    BodyOneHome,
    CardHome,
    CardButton,
    CardContainer,
    CardThumbnailHolder,
    CardThumbnail,
    CardDetails,
    CardTextHolder,
    CardSubtitle,
    CardTitle,
    Colors,
} from './../components/styles';

// colors
const { darkLight } = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders SearchPage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of SearchPage.
 */
const SearchPage = ({navigation}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [search, setSearch] = useState({
        loading: false,
        data: stallData,
        error: null,
        searchValue: '',
    });

    // Default Image(s)
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";
    
    /**
     * Search function for search bar.
     *
     * @param {String} text String that is used to search for an itinerary title.
     */
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
     * Function to fetch user's favorite stalls
     * data from Firestore database.
     */
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

    /**
     * React hook to fetch user data
     * and stall data upon accessing the page.
     */
    useEffect(() => {
        getUser();
        getStalls();
    }, []);

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} food stall data of a particular stall.
     * @returns Render of Cards that displays searched stalls.
     */
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

    /**
     * Anonymous class that renders Text Input for Search Bar.
     *
     * @param {string} label Text for label above the form.
     * @param {string} icon Name of Icon.
     * @param {boolean} isPassword Determine whether input is password or not.
     * @param {boolean} hidePassword Determine whether to show password or not.
     * @param {boolean} setHidePassword Set state to hide password/show password.
     * @param {*} props Other props set on the render method.
     * @returns Render of Formik Text Input.
     */
    const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
        return (
          <View>
            <LeftIcon search={true}>
                <Octicons name={icon} size={25} color={darkLight} />
            </LeftIcon>        
            <StyledTextInput {...props}/>
          </View>);
    };

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

export default SearchPage;