import styled from 'styled-components';
import { 
    View, 
    Image, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions } 
from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// colors
export const Colors = {
    primary: "#FAF2E9", // white
    secondary: "#DBDBDB", // grey
    tertiary:"#3E3E3E", //black
    darkLight: "#818181", // for text
    brand: "#FF5757", // pink brand
    green: "#10B981",
    red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;


export const StyledContainer = styled.View`
    flex: 1;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: ${StatusBarHeight + 50}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    height:${windowHeight - 50}px;
    align-items: center;
`;

export const ForgotContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding: 25px;
    padding-top: ${StatusBarHeight + 90}px;
    justify-content: center;
`;

export const WelcomeContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
    top: 30px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${brand};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 50%;
    min-width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 25px;
    text-align: center;
    font-family: Montserrat-Medium;
    letter-spacing: 4px;
    color: ${brand};
    padding: 10px;

    ${(props) => props.welcome && `
        font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 16px;
    margin-bottom: 20px;
    font-family: KottaOne-Regular;
    color: ${tertiary};
    
    ${(props) => props.welcome && `
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    font-family: KottaOne-Regular;
    letter-spacing: 1px;
    padding: 15px;
    padding-left: 55px;
    padding-right: 15px;
    border-radius: 5px;
    font-size: 14px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};

    ${(props) => props.forgot && `
    padding-left: 22px;
`}
`;

export const StyledInputLabel  = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 35px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 35px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${tertiary};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${brand};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
    font-family: Trirong-Light;

    ${(props) => props.google == true && `
    padding-left: 20px;
    padding-bottom: 2px;
    padding-right: 20px;
    `}
`;

export const MessageBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${red};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-top: 10px;
    margin-bottom: 12px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary}
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;


export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;

// HomePage
export const HomeContainer = styled.View`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: ${StatusBarHeight + 5}px;
    background-color: ${primary};
`;

export const HeaderHome = styled.View`
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 20px;
`;

export const InputContainer = styled.View`
    flex: 1;
    height: 50px;
    border-radius: 10px;
    flex-direction: row;
    background-color: ${secondary};
    align-items: center;
    padding-horizontal: 20px;
`;

export const SortBtn = styled.View`
    width: 50px;
    height: 50px;
    margin-left: 10px;
    background-color: ${tertiary};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const CategoriesListContainer = styled.ScrollView`
    padding-vertical: 30px;
    padding-horizontal: 20px;
`;

export const CategoryBtn = styled.View`
    height: 45px;
    width: 120px;
    margin-right: 7px;
    border-radius: 30px;
    align-items: center;
    padding-horizontal: 5px;
    flex-direction: row;
`;

export const CategoryBtnImgCon = styled.View`
    height: 35px;
    width: 35px;
    background-color: ${primary};
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const CardHome = styled.View`
    height: 220px;
    width: 100%;
    margin-horizontal: 10px;
    margin-bottom: 20px;
    margin-top: 50px;
    border-radius: 15px;
    elevation: 13;
    background-color: ${primary};
`;
export const AddToCartBtn = styled.View`
    height: 30px;
    width: 30px;
    border-radius: 20px;
    background-color: ${primary};
    justify-content: center;
    align-items: center;
`;

// LandingScreen
export const Holder = styled.View`
    align-items: center;
    padding-horizontal: 20px;
    padding-top: 70px;
    background-color: ${primary};
`;

export const LandingLogo = styled.Image`
    width: 100px;
    max-width: 700px;
    max-height: 200px;
`;