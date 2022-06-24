import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    StallPhoto,
    MenuPhoto,
    StallContainer,
    DetailsContainer,
    ReviewButton
} from './../components/styles';

const StallPage = ({navigation}) => {
  return (
    <StallContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
                <ProfileImage>
                    <StallPhoto resizeMode="contain" source={require('./../assets/chickenBurger.png')} />
                </ProfileImage>
            </View>
            <View style={style.detailsContainer}>
            <View
                style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                }}>
            <View/>
            <View style={style.row}>
            <Text style={{ fontSize: 30, marginRight: 10}}>Noodle Stall</Text>
                <TouchableOpacity>
                    <Ionicons name="ios-heart-outline" size={30} style={{ marginLeft: 5 }}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="ios-return-up-forward" size={30}  style={{ marginLeft: 5 }}></Ionicons>
                </TouchableOpacity>
            </View>
            </View>
            <View
                style={{
                    marginHorizontal: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Menu</Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Reviews</Text>
            </View>
            <View style={style.row}>
                <MenuPhoto resizeMode="contain" source={require('./../assets/chickenBurger.png')} />
            <View
                style={{
                    marginHorizontal: 35,
                    marginTop: 10,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                }}>
            <ReviewButton>
                <Greetings sub={true}>Review 1</Greetings>
            </ReviewButton> 
            <ReviewButton>
                <Greetings sub={true}>Review 2</Greetings>
            </ReviewButton>
            <ReviewButton>
                <Greetings sub={true}>Review 3</Greetings>
            </ReviewButton>
            </View>
            </View>
            </View>
        </ScrollView>
    </StallContainer>
  );
};

const style = StyleSheet.create({
    detailsContainer: {
        flex: 0.55,
        backgroundColor: Colors.primary,
        marginHorizontal: 0,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
        paddingBottom: 80,
        paddingHorizontal: 5
    },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
  },
});

export default StallPage;