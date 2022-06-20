import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

// Icons
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components (Temporary for placeholder)
import categories from './../components/categories';
import foods from './../components/foods';
// Styles
import {
  StyledContainer,
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
  CardThumbnail,
  CardDetails,
  CardTextHolder,
  CardSubtitle,
  CardTitle,
  AddToFavouritesBtn,
  TitleHome,
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


const HomePage = ({navigation}) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);

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
        const stallCategories = [];
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
                    } = doc.data();

                    stallDatas.push({
                        category: category,
                        location: location,
                        name: name,
                        price: price,
                        url: url,
                        coordinate: coordinate,
                    })

                    setStallData(stallDatas);
                })
            })
    }
    
    useEffect(() => {
        getUser();
        getStalls();
    }, []);

    // Logging out process
    const onPressLogOut = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [{
                text: "Cancel",
                onPress: () => {
                    navigation.navigate("HomePage");
                    console.log('User decided not to log out');
                },
                style: 'cancel'
            }, {
                text: 'Log Out',
                onPress: onSigningOut ,
            }]
        );
    }

    const onSigningOut = () => {
        firebase.auth()
          .signOut()
          .then(() => console.log('User signed out!'));
    }

    const ListCategories = () => {
        return (
            <CategoriesListContainer
                data = {stallData}
                extraData = {selectedCategoryIndex}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View style={{width: 60}}/>}
                renderItem={({item}) => (
                    <CategoryBtn>
                        <CategoryBtnText>
                            {item.category[0]}
                        </CategoryBtnText>
                    </CategoryBtn>
                )}
            />
        );
      };

    const Card = ({food}) => {
        return (
        <CardButton>
            <CardHome>
                <CardThumbnailHolder>
                    <CardThumbnail source={{uri: food.url}} />
                </CardThumbnailHolder>
                <CardDetails>
                    <CardTextHolder>
                        <CardSubtitle>Restaurant</CardSubtitle>
                        <CardTitle>{food.name}</CardTitle>
                    </CardTextHolder>
                    <AddToFavouritesBtn>
                        <Octicons name="heart" size={20} color={brand} />
                    </AddToFavouritesBtn>
                </CardDetails>
            </CardHome>
        </CardButton>
        )
    }

    const Card2 = ({food}) => {
        return (
        <CardButton>
            <CardHome card2={true}>
                <CardThumbnailHolder card2={true}>
                    <CardThumbnail card2={true} source={{uri: food.url}} />
                </CardThumbnailHolder>
                <CardDetails card2={true}>
                    <CardSubtitle>Restaurant</CardSubtitle>
                    <CardTitle>{food.name}</CardTitle>
                    <CardSubtitle>Location</CardSubtitle>
                    <CardTitle>0.1 km</CardTitle>
                </CardDetails>
            </CardHome>
        </CardButton>
        )
    }

    return(
        <StyledContainer home={true}>
        <StatusBar style="dark" />
            <HeaderHome>
                <View>
                    <View style={{flexDirection: "row"}}>
                        <Greetings>Best Foods </Greetings>
                    {/* <Greetings user={true}>user</Greetings> */ } 
                    </View>
                    <Greetings>Near You! </Greetings>
                    { /*
                    <Greetings sub={true}>
                        What do you want to eat today?
                    </Greetings>
                    */}
                </View>
                <ProfilePictureHolder
                    onPress={onPressLogOut}
                >
                    <ProfilePicture 
                        source={require('./../assets/avatar.jpg')}
                    />
                </ProfilePictureHolder>
            </HeaderHome>
            <LocationHolder>
                <Octicons 
                    name="location"
                    size={20}
                    color={red}
                    style={{paddingRight:10}} 
                    />
                <Greetings sub={true}>Kent Ridge, Singapore</Greetings>
            </LocationHolder>
            <BodyOneHome>
                <StyledFormArea search={true}>
                    <MyTextInput 
                        icon="search"
                        placeholder="Search here"
                    />
                </StyledFormArea>
                <SortBtn>
                    <Icon name="tune" size={28} color={primary} />
                </SortBtn>
            </BodyOneHome>
            <View>
                <ListCategories />
            </View>
            <View>
                <CardContainer
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    data={stallData}
                    ListFooterComponent={<View style={{width: 40}}/>}
                    renderItem={({item}) => <Card food={item} />}
                />
            </View>
            <TitleHome>
                <Greetings title={true}>Popular</Greetings>
            </TitleHome>
            <View>
            <CardContainer
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    data={stallData}
                    ListFooterComponent={<View style={{width: 40}}/>}
                    renderItem={({item}) => <Card2 food={item} />}
                />
            </View>
        </StyledContainer>
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

export default HomePage;