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
    Greetings
} from './../components/styles';

const ProfilePage = ({navigation}) => {
    return (
        <StyledContainer>         
            <ScrollView showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    <View style={{ alignSelf: "center" }}>
                        <ProfileImage>
                            <ProfilePic resizeMode="contain" source={require('./../assets/categories/burger.png')} />
                        </ProfileImage>
                        <TouchableOpacity style={styles.add}>
                            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                        </TouchableOpacity>
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
                        <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Ionicons name="ios-at" size={30} color="#EF4444"></Ionicons>
                            <Text style={{ marginLeft: 20, marginTop: 7}}>johndoe</Text>
                        </View>
                        <View style={styles.row}>
                            <Ionicons name="ios-call-outline" size={30} color="#EF4444"></Ionicons>
                            <Text style={{ marginLeft: 20, marginTop: 7}}>+65-12345678</Text>
                        </View>
                        <View style={styles.row}>
                            <Ionicons name="ios-mail-outline" size={30} color="#EF4444"></Ionicons>
                            <Text style={{ marginLeft: 20, marginTop: 7}}>john_doe@email.com</Text>
                        </View>
                        <View style={styles.row}>
                            <Ionicons name="ios-location-outline" size={30} color="#EF4444"></Ionicons>
                            <Text style={{ marginLeft: 20, marginTop: 7}}>Kent Ridge, Singapore</Text>
                        </View>
                        </View>
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
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
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
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    row: {
        flexDirection: 'row',
        marginBottom: 30
      },
    userInfoSection: {
        paddingVertical: 32,
        marginRight: 100
    }
});