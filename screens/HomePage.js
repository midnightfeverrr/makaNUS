import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Alert,
} from 'react-native';

// Icons
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

// Distance Calculator
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

// Homepage Render
const HomePage = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [nearbyStallData, setNearbyStallData] = useState(null);

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
                    } = doc.data();

                    const userLat = userData.coordinate.latitude;
                    const userLng = userData.coordinate.longitude;
                    const stallLat = doc.data().coordinate.latitude;
                    const stallLng = doc.data().coordinate.longitude;
                    const distanceRaw = getDistanceFromLatLonInKm(userLat, userLng, stallLat, stallLng);
                    const distance = Math.round(distanceRaw * 10) / 10
                    console.log(distance)

                    db.collection("stalls").doc(doc.data().name).update(
                        {
                            distance: distance
                        }
                    )

                    stallDatas.push({
                        category: category,
                        location: location,
                        name: name,
                        price: price,
                        url: url,
                        coordinate: coordinate,
                        distance: distance,
                    })

                    setStallData(stallDatas);
                })
            })
    }

    // Getting Nearby Stall Data
    const getNearbyStalls = async () => {
        const stallDatas = [];
        await db
            .collection('stalls').orderBy("distance").limit(5)
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

                    setNearbyStallData(stallDatas);
                })
            })
    }

    
    useEffect(() => {
        getUser();
<<<<<<< HEAD
    }, []);

    useEffect(() => {
        getStalls();
        getNearbyStalls();
    }, [userData]);

=======
        getStalls();
        getNearbyStalls();
    }, []);

>>>>>>> 9e77c5e0e54c529d02730f02b72248c35579b1b2

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
        // Add To Favorite
        const handleFavorite = async () => {
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
        }

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
                        <CardSubtitle>Distance</CardSubtitle>
                        <CardTitle>{food.distance}km</CardTitle>
                    </CardTextHolder>
                    <AddToFavouritesBtn onPress={handleFavorite}>
                    <Octicons name="heart" size={20} color={brand}/>
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
            { /*
            <View>
                <ListCategories />
            </View>
            */
            }
            <View style={{paddingTop:20}}>
                <CardContainer
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    data={nearbyStallData}
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
