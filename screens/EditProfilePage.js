import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
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
    StatsBox,
    Action,
    EditProfileTextInput
} from './../components/styles';

const EditProfilePage = () => {
    return (
        <StyledContainer>
            <InnerContainer>
                <PageTitle>Edit Profile</PageTitle>
                <View style={{ alignSelf: "center" }}>
                    <ProfileImage>
                        <ProfilePic resizeMode="contain" source={require('./../assets/chickenBurger.png')} />
                    </ProfileImage>
                    <Add>
                        <Ionicons name="ios-add" size={42} color="#000000" ></Ionicons>
                    </Add>
                </View>
                <SubTitle style={{ alignSelf: "center"}}>John Doe</SubTitle>
                <Action>
                    <Ionicons name="ios-person-outline" size={20} color="#000000"></Ionicons>
                    <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                        styles.textInput,
                        {
                            color: "#000000",
                        },
                        ]}
                    />
                </Action>
                <Action>
                    <Ionicons name="ios-at" size={20} color="#000000"></Ionicons>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                        styles.textInput,
                        {
                            color: "#000000",
                        },
                        ]}
                    />
                </Action>
                <Action>
                    <Ionicons name="ios-call-outline" size={20} color="#000000"></Ionicons>
                    <TextInput
                        placeholder="Phone Number"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                        styles.textInput,
                        {
                            color: "#000000",
                        },
                        ]}
                    />
                </Action>
                <Action>
                    <Ionicons name="ios-mail-outline" size={20} color="#000000"></Ionicons>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                        styles.textInput,
                        {
                            color: "#000000",
                        },
                        ]}
                    />
                </Action>
                <Action>
                    <Ionicons name="ios-location-outline" size={20} color="#000000"></Ionicons>
                    <TextInput
                        placeholder="Location"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                        styles.textInput,
                        {
                            color: "#000000",
                        },
                        ]}
                    />
                </Action>
            </InnerContainer>
        </StyledContainer>
    );
}

export default EditProfilePage;

const styles = StyleSheet.create({
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: Colors.darkLight,
    },
  });