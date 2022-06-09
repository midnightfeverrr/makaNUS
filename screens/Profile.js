import React from 'react';
import {View, Image, Text} from 'react-native';
import Placeholder from '../assets/icon.png';
import {
    Avatar, 
    StyledContainer, 
    ProfileTitle, 
    XpTitle,
    MyReviews,
    ButtonText,
    EditProfile,
    Colors} from '../components/styles';

const Profile = () => {

    return (
        <StyledContainer>
            <Avatar resizeMode="cover" source={Placeholder} />
            <ProfileTitle>Marciano</ProfileTitle>
            {/* Xp bar disini */}
            <XpTitle >80 xp to level up!</XpTitle>

            <MyReviews><ButtonText>My Reviews</ButtonText></MyReviews>
            {/*<EditProfile><ButtonText>Edit Profile</ButtonText></EditProfile>*/}
        </StyledContainer>
        
    )
}

export default Profile;