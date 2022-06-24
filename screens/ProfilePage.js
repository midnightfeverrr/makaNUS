import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    Colors,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    Avatar,
    ProfilePic,
    ProfileImage,
    Greetings,
    ProfileText,
    Add,
    StallRow,
    UserInfoSection,
    StatsBox
} from './../components/styles';

const ProfilePage = ({navigation}) => {
    return (
        <StyledContainer>         
            <ScrollView showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    <View style={{ alignSelf: "center" }}>
                        <ProfileImage>
                            <ProfilePic resizeMode="contain" source={require('./../assets/chickenBurger.png')} />
                        </ProfileImage>
                        <Add>
                            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                        </Add>
                    </View>
                    <View style={styles.infoContainer}>
                        <Greetings>John Doe</Greetings>
                        <Greetings sub={true}>80 Xp to go!</Greetings>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Greetings title={true}>10</Greetings>
                            <Greetings sub={true}>Level</Greetings>
                        </View>
                        <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Greetings title={true}>53</Greetings>
                            <Greetings sub={true}>Rates</Greetings>
                        </View>
                        <View style={styles.statsBox}>
                            <Greetings title={true}>35</Greetings>
                            <Greetings sub={true}>Comments</Greetings>
                        </View>
                        </View>
                        <UserInfoSection>
                        <StallRow>
                            <Ionicons name="ios-at" size={30} color="#EF4444"></Ionicons>
                            <ProfileText>johndoe</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-call-outline" size={30} color="#EF4444"></Ionicons>
                            <ProfileText>+65-12345678</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-mail-outline" size={30} color="#EF4444"></Ionicons>
                            <ProfileText>john_doe@email.com</ProfileText>
                        </StallRow>
                        <StallRow>
                            <Ionicons name="ios-location-outline" size={30} color="#EF4444"></Ionicons>
                            <ProfileText>Kent Ridge, Singapore</ProfileText>
                        </StallRow>
                        </UserInfoSection>
                    </InnerContainer>
                </ScrollView>
        </StyledContainer>
    );
}

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
});