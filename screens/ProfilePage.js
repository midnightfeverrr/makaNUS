import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
    StyledContainer,
    InnerContainer,
    ProfilePic,
    ProfileImage,
    Greetings,
    ProfileText,
    Add,
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


// Profilepage render
const ProfilePage = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [userReviews, setUserReviews] = useState(0);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/my-first-makanus-project.appspot.com/o/profile%20placeholder.png?alt=media&token=dfc4a476-f00c-46ea-9245-a282851ebcae";
    
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

    // Get User's Reviews
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

    useEffect(() => {
        getUser();
        getUserReviews();
    }, []);

    // Logging out process
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
                            <Greetings title={true}>35</Greetings>
                            <Greetings sub={true}>Followers</Greetings>
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
                            <ProfileText>Kent Ridge, Singapore</ProfileText>
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