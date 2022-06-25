import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
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
    ButtonText
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

    useEffect(() => {
        getUser();
    }, []);

    return (
        <StyledContainer>         
            <ScrollView showsVerticalScrollIndicator={false}>
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
                        <Greetings sub={true}>80 Xp to go!</Greetings>
                    </InfoContainer>
                    <StatsContainer>
                        <StatsBox>
                            <Greetings title={true}>10</Greetings>
                            <Greetings sub={true}>Level</Greetings>
                        </StatsBox>
                        <StatsBox mid={true}>
                            <Greetings title={true}>53</Greetings>
                            <Greetings sub={true}>Rates</Greetings>
                        </StatsBox>
                        <StatsBox>
                            <Greetings title={true}>35</Greetings>
                            <Greetings sub={true}>Comments</Greetings>
                        </StatsBox>
                    </StatsContainer>
                    <ButtonsContainer>
                            <StyledButton profile={true}>
                                <ButtonText profile={true}>My Reviews</ButtonText>
                            </StyledButton>
                            <StyledButton profile2={true}>
                                <ButtonText profile={true}>Edit Profile</ButtonText>
                            </StyledButton>
                    </ButtonsContainer>
                    <UserInfoSection>
                        <StallRow>
                            <Ionicons name="ios-at" size={30} color={tertiary}></Ionicons>
                            <ProfileText>{userData
                        ? userData.username
                        : '' }</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-call-outline" size={30} color={tertiary}></Ionicons>
                            <ProfileText>(+65) {userData
                        ? userData.phoneNumber
                        : '' }</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-mail-outline" size={30} color={tertiary}></Ionicons>
                            <ProfileText>{userData
                        ? userData.email
                        : '' }</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-location-outline" size={30} color={tertiary}></Ionicons>
                            <ProfileText>Kent Ridge, Singapore</ProfileText>
                        </StallRow>
                    </UserInfoSection>
                </InnerContainer>
            </ScrollView>
        </StyledContainer>
    );
}

export default ProfilePage;