// Import Statements
import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import {
    StyledContainer,
    InnerContainer,
    ProfilePic,
    ProfileImage,
    Greetings,
    ProfileText,
    StallRow,
    UserInfoSection,
    StatsBox,
    InfoContainer,
    StatsContainer, 
    Colors,
    ButtonsContainer,
    StyledButton,
    ButtonText,
    TextLink,
    TextLinkContent
} from './../components/styles';

// colors
const { tertiary } = Colors;

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

/**
 * Anonymous class that renders ProfilePage.
 *
 * @param {*} navigation Navigation prop.
 * @returns Render of ProfilePage.
 */
const ProfilePage = ({navigation}) => {
    // States
    const [userData, setUserData] = useState(null);
    const [userReviews, setUserReviews] = useState(0);
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');

    // Default Image(s)
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    
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
     * Function to fetch user's reviews data from Firestore database.
     */
    const getUserReviews = async () => {
        await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("reviews")
        .onSnapshot((querySnapshot) => {
                console.log(querySnapshot.size);
                setUserReviews(querySnapshot.size);
        })
    }    

    /**
     * React hook to fetch user data,
     * user's reviews data, and user's address
     * upon accessing the page.
     */
    useEffect(() => {
        getUser();
        getUserReviews();
        getAddress();
    }, []);

    /**
         * Function to give an alert
         * if user tries to log out.
         */
    const onPressLogOut = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [{
                text: "Cancel",
                onPress: () => {
                    console.log('User decided not to log out');
                },
                style: 'cancel'
            }, {
                text: 'Log Out',
                onPress: onSigningOut ,
            }]
        );
    }

    /**
     * Function to handle user's sign out.
     */
    const onSigningOut = () => {
        firebase.auth()
          .signOut()
          .then(() => console.log('User signed out!'));
    }

    return (
        <StyledContainer>         
                <InnerContainer>
                    <View style={{ alignSelf: "center" }}>
                        <ProfileImage>
                            <ProfilePic resizeMode="contain" 
                            source={{ uri: userData
                                    ? userData.userImg || defaultImage
                                    : defaultImage }} />
                        </ProfileImage>
                    </View>
                    <InfoContainer>
                        <Greetings>{userData
                        ? userData.fullName
                        : '' }</Greetings>
                        <Greetings sub={true}>
                            {100 * (userData ? userData.level : 0) - (userData ? userData.xp : 0)} Xp to next level!
                        </Greetings>
                    </InfoContainer>
                    <StatsContainer>
                        <StatsBox>
                            <Greetings title={true}>{userData
                        ? userData.level
                        : '' }</Greetings>
                            <Greetings sub={true}>Level</Greetings>
                        </StatsBox>
                        <StatsBox mid={true}>
                            <Greetings title={true}>{userReviews}</Greetings>
                            <Greetings sub={true}>Rates</Greetings>
                        </StatsBox>
                        <StatsBox>
                            <Greetings title={true}>{userData
                        ? userData.xp
                        : '' }</Greetings>
                            <Greetings sub={true}>Xp</Greetings>
                        </StatsBox>
                    </StatsContainer>
                    <ButtonsContainer>
                            <StyledButton 
                                profile={true}
                                onPress={() => navigation.navigate("MyReviewsPage")}
                            >
                                <ButtonText profile={true}>My Reviews</ButtonText>
                            </StyledButton>
                            <StyledButton 
                                profile2={true}
                                onPress={() => navigation.navigate("EditProfilePage")}
                            >
                                <ButtonText profile={true}>Edit Profile</ButtonText>
                            </StyledButton>
                    </ButtonsContainer>
                    <UserInfoSection>
                        <StallRow>
                            <Ionicons name="ios-at" size={20} color={tertiary}></Ionicons>
                            <ProfileText>{userData
                        ? userData.username
                        : '' }</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-call-outline" size={20} color={tertiary}></Ionicons>
                            <ProfileText>(+65) {userData
                        ? userData.phoneNumber
                        : '' }</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-mail-outline" size={20} color={tertiary}></Ionicons>
                            <ProfileText>{userData
                        ? userData.email
                        : '' }</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-location-outline" size={20} color={tertiary}></Ionicons>
                            <ProfileText>{district == null ? country : district}, {country}</ProfileText>
                        </StallRow>
                    </UserInfoSection>
                    <TextLink onPress={onPressLogOut}>
                        <TextLinkContent logout={true}>Log out from account</TextLinkContent>
                    </TextLink>
                </InnerContainer>
        </StyledContainer>
    );
}

export default ProfilePage;