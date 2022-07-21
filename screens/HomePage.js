import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import { Octicons } from '@expo/vector-icons';
import {
  StyledContainer,
  HeaderHome,
  Greetings,
  ProfilePictureHolder,
  ProfilePicture,
  LocationHolder,
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
const { brand, red } = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.firestore();

/**
 * Function to calculate distance 
 * between two coordinate points.
 * 
 * @param {double} lat1 Latitude of the first coordinate point.
 * @param {double} lon1 Longitude of the first coordinate point.
 * @param {double} lat2 Latitude of the second coordinate point.
 * @param {double} lon2 Longitude of the second coordinate point.
 * @returns Calculated distance of two coordinate points.
 */
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
  
/**
 * Function to convert degrees to radian.
 * 
 * @param {double} deg Distance in degrees.
 * @returns Calculated distance of two coordinate points in radians.
 */
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

/**
 * Anonymous class that renders HomePage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of HomePage.
 */
const HomePage = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [stallData, setStallData] = useState(null);
    const [nearbyStallData, setNearbyStallData] = useState(null);
    const [popularStallData, setPopularStallData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    const defaultImage2 = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/default.jpg?alt=media&token=bd1e73fa-4b63-422a-bd0e-1140c94640d1";

    /**
     * Function to refresh the page.
     */
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getStalls()
        .then(getNearbyStalls())
        .then(getPopularStalls())
        .then(getCategories())
        .then(() => setRefreshing(false));
      }, []);

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
     * Function to fetch user's address using Expo Location.
     */
    const getAddress = async () => {
        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            maximumAge: 10000,
            timeout: 5000
        });
        let address = await Location.reverseGeocodeAsync({
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        });

        address.find( p => {setDistrict(p.district);})
        address.find( p => {setCountry(p.country);})
    }

    /**
     * Function to fetch stall data from Firestore database.
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
                    } = doc.data();

                    const userLat = userData
                    ? userData.coordinate.latitude
                    : null;
                    const userLng = userData
                    ? userData.coordinate.longitude
                    : null;
                    const stallLat = doc.data().coordinate.latitude;
                    const stallLng = doc.data().coordinate.longitude;
                    if (userLat == null || userLng == null) {
                        return;
                    } else {
                    const distanceRaw = getDistanceFromLatLonInKm(userLat, userLng, stallLat, stallLng);
                    const distance = Math.round(distanceRaw * 10) / 10;
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

                    setStallData(stallDatas);}
                })
            })
    }

    /**
     * Function to fetch nearby stall data from Firestore database.
     */
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

    /**
     * Function to fetch popular stall data from Firestore database.
     */
    const getPopularStalls = async () => {
        const stallDatas = [];
        await db
            .collection('stalls').orderBy("numOfRatings", "desc").limit(5)
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

                    setPopularStallData(stallDatas);
                })
            })
    }

    /**
     * Function to fetch stall category data from Firestore database.
     */
    const getCategories = async () => {
        const categoryDatas = [];
        await db
            .collection('categories')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const {
                        category,
                        uri
                    } = doc.data();

                    categoryDatas.push({
                        category: category,
                        uri: uri
                    })

                    setCategoryData(categoryDatas);
                })
            })
    }
    
    /**
     * React hook to fetch user data and address
     * upon accessing the page, and refreshing it every minute.
     */
    useEffect(() => {
        let unmounted = false;
        getUser();
        getAddress();

        const interval=setInterval(()=>{
            getUser()
           },60000)
             
             
        return()=>
        unmounted = true, 
        clearInterval(interval)
    }, []);

    /**
     * React hook to fetch stall data, nearby stall data,
     * popular stall data, and stall category data
     * upon getting user data, and refreshing it every minute.
     */
    useEffect(() => {
        let unmounted = false;
        getStalls();
        getNearbyStalls();
        getPopularStalls();
        getCategories();

        const interval=setInterval(()=>{
            getNearbyStalls()
           },60000)
             
             
        return()=>
        unmounted = true, 
        clearInterval(interval)
    }, [userData]);
    
    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} food stall data of a particular stall.
     * @returns Render of Cards that displays nearby stalls.
     */
    const Card = ({food}) => {
        /**
         * State that shows whether a stall is in favorite.
         */
        const [favorited, setFavorited] = useState(false);

        /**
         * Function to check whether a particular stall
         * is in user's favorite page or not.
         * 
         * @returns Clean-up function.
         */
        const isInFavorite = async () => {
            let unmounted = false;
            await db.collection("users").doc(firebase.auth().currentUser.uid)
            .collection("favorites").doc(food.name).get().then(
                (DocumentSnapshot) => {
                if (DocumentSnapshot.exists) {
                    setFavorited(true);
                } else {
                    setFavorited(false);
                }}
            )
            return () => {
                unmounted = true;
            };
        }
        isInFavorite();

        /**
         * Function to save a particular stall
         * to user's favorite page.
         * 
         * @returns Clean-up function.
         */
        const handleFavorite = async () => {
            let unmounted = false;
            await db.collection("users").doc(firebase.auth().currentUser.uid)
            .collection("favorites").doc(food.name).get().then(
                (DocumentSnapshot) => {
                if (DocumentSnapshot.exists) {
                    db.collection("users").doc(firebase.auth().currentUser.uid)
                    .collection("favorites").doc(food.name).delete();
                    setFavorited(false);
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
                    })
                    setFavorited(true);
                    console.log("updated")
                }}
            )
            return () => {
                unmounted = true;
            };
        }

        /**
         * Anonymous class that renders the favorite icon.
         * If the stall is in user's favorite page,
         * the icon will be highlighted (fill-icon), vice versa.
         * 
         * @returns Render of Favorite (Love) Icon
         */
        const FavoriteIcon = () => {
            if (favorited) {
                return (
                    <AddToFavouritesBtn onPress={handleFavorite}>
                        <Octicons name="heart-fill" size={20} color={brand}/>
                    </AddToFavouritesBtn>
                )
            } else {
                return (
                    <AddToFavouritesBtn onPress={handleFavorite}>
                        <Octicons name="heart" size={20} color={brand}/>
                    </AddToFavouritesBtn>
                )
            }
        }

        return (
        <CardButton onPress={() => navigation.navigate("StallPage", {itemId: food.name})}>
            <CardHome>
                <CardThumbnailHolder>
                    <CardThumbnail source={{uri: food.url == "" ? defaultImage2 : food.url}} />
                </CardThumbnailHolder>
                <CardDetails>
                    <CardTextHolder>
                        <CardSubtitle>Restaurant</CardSubtitle>
                        <CardTitle>{food.name}</CardTitle>
                        <CardSubtitle>Distance</CardSubtitle>
                        <CardTitle>{food.distance}km</CardTitle>
                    </CardTextHolder>
                    <FavoriteIcon />
                </CardDetails>
            </CardHome>
        </CardButton>
        )
    }

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} food stall data of a particular stall.
     * @returns Render of Cards that displays popular stalls.
     */
    const Card2 = ({food}) => {
        return (
        <CardButton onPress={() => navigation.navigate("StallPage", {itemId: food.name})}>
            <CardHome card2={true}>
                <CardThumbnailHolder card2={true}>
                    <CardThumbnail card2={true} source={{uri: food.url == "" ? defaultImage2 : food.url}} />
                </CardThumbnailHolder>
                <CardDetails card2={true}>
                    <CardSubtitle>Restaurant</CardSubtitle>
                    <CardTitle>{food.name}</CardTitle>
                </CardDetails>
            </CardHome>
        </CardButton>
        )
    }

    /**
     * Anonymous class that renders a flatlist element.
     *
     * @param {*} food stall data of a particular stall category.
     * @returns Render of Cards that displays stall categories.
     */
    const CardCategory = ({food}) => {
        return (
            <CardButton onPress={() => navigation.navigate("StallCategoryPage", {itemId: food.category})}>
            <CardHome category={true}>
                <CardThumbnailHolder category={true}>
                    <CardThumbnail category={true} source={{uri: food.uri}} />
                    <CardTitle category={true}>{food.category}</CardTitle>
                </CardThumbnailHolder>
            </CardHome>
        </CardButton>
        )
    };

    return(
        <StyledContainer 
        home={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
                    onPress={() => navigation.navigate("Profile")}
                >
                    <ProfilePicture 
                        source={{ uri: userData
                                  ? userData.userImg || defaultImage
                                  : defaultImage }}
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
                <Greetings sub={true}>{district}, {country}</Greetings>
            </LocationHolder>
            { /*
            <View>
                <ListCategories />
            </View>
            */
            }
            <TitleHome>
                <Greetings title={true}>Foods Nearby</Greetings>
            </TitleHome>
            <View style={{paddingTop:20}}>
                <CardContainer
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    data={nearbyStallData}
                    ListFooterComponent={<View style={{width: 40}}/>}
                    renderItem={({item}) => <Card
                        food={item} 
                    />}
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
                    data={popularStallData}
                    ListFooterComponent={<View style={{width: 40}}/>}
                    renderItem={({item}) => <Card2 
                        food={item} 
                    />}
                />
            </View>
            <TitleHome>
                <Greetings title={true}>Browse</Greetings>
            </TitleHome>
            <View>
                <CardContainer
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={categoryData}
                    ListFooterComponent={<View style={{height: 50}}/>}
                    renderItem={({item}) => <CardCategory
                        food={item} 
                    />}
                />
            </View>
        </StyledContainer>
    )
}

export default HomePage;
