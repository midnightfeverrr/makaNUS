import React, {useState} from 'react';
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

import categories from './../components/categories';
import foods from './../components/foods';
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
  CategoryBtnImgCon,
  CardHome,
  AddToCartBtn,
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
/*
const docRef = db.collection("users").doc(firebase.auth().currentUser.uid);
// Getting user data
const data = docRef.get().then((doc) => {
  if (doc.exists) {
      console.log("Document data:", doc.data());
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
*/

const HomePage = ({navigation}) => {
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