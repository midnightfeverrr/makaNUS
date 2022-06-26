import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
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

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { arrayUnion, DocumentSnapshot } from 'firebase/firestore';
const db = firebase.firestore();

// Searchpage render
const SearchPage = ({navigation}) => {
    return (
        <StyledContainer>
            
        </StyledContainer>
    )
}

export default SearchPage;