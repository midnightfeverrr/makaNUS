import styled from 'styled-components';
import { 
    View, 
    Image, 
    ImageBackground,
    Text, 
    TextInput, 
    TouchableOpacity, 
    TouchableHighlight,
    ScrollView, 
    FlatList,
    Dimensions 
} from 'react-native';
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


export const StyledContainer = styled.ScrollView`
    flex: 1;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: ${StatusBarHeight}px;
    height: ${windowHeight + StatusBarHeight}px;
    background-color: ${primary};

    ${(props) => props.home == true && `
    padding-top: 50px;
    padding-left: 0px;
    padding-right: 0px;
    `}

    ${(props) => props.stall == true && `
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    `}
`;

export const StyledContainerView = styled.View`
    flex: 1;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 50px;
    height: ${windowHeight + StatusBarHeight}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    margin-top: 50px;
    align-items: center;

    ${(props) => props.fav == true && `
        align-items: flex-start;
    `}
`;

export const ForgotContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding: 25px;
    padding-top: ${StatusBarHeight}px;
    margin-top: ${StatusBarHeight + 60}px;
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
    flex: 1;
    border-radius: 10px;
    ${(props) => props.search == true && `
        height: 50px;
        padding-horizontal: 20px;
    `}
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    font-family: KottaOne-Regular;
    letter-spacing: 1px;
    padding: 15px;
    padding-left: 55px;
    padding-right: 15px;
    border-radius: 10px;
    font-size: 14px;
    height: 50px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
    
    ${(props) => props.forgot && `
        padding-left: 22px;
    `}

    ${(props) => props.editprofile && `
        background-color: ${primary};
        border-bottom-width: 1px;
        border-bottom-color: ${secondary};
    `}
`;

export const StyledInputLabel  = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 18px;
    top: 32px;
    position: absolute;
    z-index: 1;

    ${(props) => props.search && `
        top: 15px;
    `}

    ${(props) => props.editprofile && `
        top: 17px;
    `}    
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 35px;
    position: absolute;
    z-index: 1;

    ${(props) => props.editprofile && `
        top: 17px;
    `}    
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${tertiary};
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${brand};
        flex-direction: row;
        justify-content: center;
    `}

    ${(props) => props.profile == true && `
        width: 150px;
        height: 45px;
        margin-horizontal: 10px;
        padding: 0px;
    `}

    ${(props) => props.profile2 == true && `
        background-color: ${brand};
        width: 150px;
        height: 45px;
        padding: 0px;
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

    ${(props) => props.profile == true && `
        padding-bottom: 0px;
    `}
`;

export const MessageBox = styled.Text`
    text-align: center;
    font-family: Trirong-Regular;
    font-size: 13px;
    color: ${red};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-top: 10px;
    margin-bottom: 12px;

    ${(props) => props.stall == true && `
        width: 15%;
        margin-top: 5px;
        margin-bottom: 25px;
    `}
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
    
    
    ${(props) => props.profile == true && `
        padding-top: 10px;
        margin-bottom: 10px;
    `}
`;


export const TextLinkContent = styled.Text`
    color: ${brand};
    font-family: Trirong-Regular;
    font-size: 15px;

    ${(props) => props.profile == true && `
        font-size: 13px;
    `}

    ${(props) => props.logout == true && `
        font-size: 13px;
        text-decoration: underline;
    `}
`;

// HomePage
export const HeaderHome = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 40px;
    padding-top: ${StatusBarHeight + 10}px;

    ${(props) => props.fav == true && `
        padding-top: 0px;
        align-items: center;
    `}
`;

export const TitleHome = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 40px;
`;

export const Greetings = styled.Text`
    font-family: KottaOne-Regular;
    font-size: 32px;

    ${(props) => props.title == true && `
        font-size: 24px;
    `} 

    ${(props) => props.user == true && `
        font-family: KottaOne-Regular;
    `} 

    ${(props) => props.sub == true && `
        font-family: Trirong-Regular;
        font-size: 13px;
    `} 

    ${(props) => props.profile == true && `
        padding: 10px;
    `} 
`;

export const ProfilePictureHolder = styled.TouchableOpacity`
    margin-top: 15px;
    height: 50px;
    width: 50px;
`;

export const ProfilePicture = styled.Image`
    height: 50px;
    width: 50px;
    border-radius: 25px;
`;

export const LocationHolder = styled.View`
    margin-top: 15px;
    padding-horizontal: 40px;
    justify-content: flex-start;
    flex-direction: row;
`

export const BodyOneHome = styled.View`
    margin-top: 15px;
    flex-direction: row;
    padding-horizontal: 20px;
`;

export const SortBtn = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 3px;
    background-color: ${tertiary};
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
`;

export const CategoriesListContainer = styled.FlatList`
    padding-vertical: 30px;
    padding-horizontal: 40px;
`;

export const CategoryBtn = styled.TouchableOpacity`
    height: 45px;
    width: 90px;
    margin-right: 20px;
    border-radius: 2px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    align-items: center;
    padding-horizontal: 10px;
    flex-direction: row;
    justify-content: center;
    background-color: ${secondary};
`;

export const CategoryBtnText = styled.Text`
    font-family: KottaOne-Regular;
    font-size: 13px;
    color: ${darkLight};
`;

export const CardContainer = styled.FlatList`
    padding-vertical: 15px;
    padding-horizontal: 20px;
`;

export const CardButton = styled.TouchableOpacity`
    underlay-color: ${primary};
`;

export const CardHome = styled.View`
    height: 290px;
    width: 200px;
    margin-horizontal: 20px;
    margin-bottom: 20px;
    border-radius: 15px;
    elevation: 10;
    align-items: center;
    background-color: ${primary};

    ${(props) => props.card2 == true && `
        margin-top: 10px;
        height: 85px;
        width: 250px;
        align-items: flex-start;
        flex-direction: row;
    `}

    ${(props) => props.card3 == true && `
        margin-top: 10px;
        height: 85px;
        width: 300px;
        align-items: flex-start;
        flex-direction: row;
    `}

    ${(props) => props.card4 == true && `
        margin-top: 10px;
        height: 55px;
        width: 150px;
        align-items: flex-start;
        flex-direction: row
    `}
`;

export const CardThumbnailHolder = styled.View`
    height: 168px;
    width: 168px;
    margin-horizontal: 50px;
    margin-top: 15px;
    margin-bottom: 5px;
    border-radius: 15px;
    elevation: 10;
    align-items: center;
    background-color: ${secondary};
    
    ${(props) => props.card2 == true && `
        height: 63px;
        width: 63px;
        margin-horizontal: 20px;
        margin-bottom: 10px;
        margin-top: 11px;
        border-radius: 150px;
    `}

    ${(props) => props.stall == true && `
        margin-horizontal: 20px;
    `}

    ${(props) => props.stall2 == true && `
        height: 33px;
        width: 33px;
        margin-horizontal: 15px;
        margin-bottom: 10px;
        margin-top: 11px;
        border-radius: 150px;
    `}
`;

export const CardThumbnail = styled.Image`
    height: 168px;
    width: 168px;
    border-radius: 15px;

    ${(props) => props.card2 == true && `
        height: 63px;
        width: 63px;
        border-radius: 150px;
    `}

    ${(props) => props.stall2 == true && `
        height: 33px;
        width: 33px;
        margin-horizontal: 15px;
        margin-bottom: 10px;
        margin-top: 11px;
        border-radius: 150px;
    `}
`;

export const CardDetails = styled.View`
    height: 57px;
    width: 168px;
    margin-top: 12px;
    justify-content: space-between;
    flex-direction: row;

    ${(props) => props.card2 == true && `
        height: 63px;
        width: 170px;
        flex-direction: column;
        margin-top: 12px;
        justify-content: center;
    `}

    ${(props) => props.stall == true && `
        height: 43px;
        width: 100px;
        flex-direction: column;
        padding-right: 1px;
        margin-top: 5px;
        justify-content: center;
    `}
`;

export const CardTextHolder = styled.View`
    padding-left: 5px;
    flex-direction: column;
`;

export const CardSubtitle = styled.Text`
    font-family: Trirong-Regular;
    font-size: 10px;
    color: ${darkLight};
`;

export const CardTitle = styled.Text`
    font-family: Trirong-Bold;
    letter-spacing: 1px;
    font-size: 15px;
    color: ${tertiary};
`;

export const AddToFavouritesBtn = styled.TouchableOpacity`
    height: 30px;
    width: 30px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    ${(props) => props.stall == true && `
        margin-top: 0px;
        align-items: flex-start;
        margin-right: 35px;
    `}

    ${(props) => props.profile == true && `
        margin-top: 30px;
        align-items: flex-start;
        margin-right: 35px;
    `}
`;

// LandingScreen
export const Holder = styled.View`
    align-items: center;
    padding-horizontal: 20px;
    padding-top: 70px;
    background-color: ${primary};
`;

export const LandingLogo = styled.Image`
    width: 350px;
    max-width: 700px;
    max-height: 200px;
    top: 50%;
`;

// BottomTabNavigator
export const StyledIcon = styled.View`
    align-items: center;
`;

// Profile Page
export const ProfilePic = styled.Image`
    width: 150px;
    height: 150px;
    margin: auto;
    border-radius: 120px;
    border-width: 2px;
    border-color: ${brand};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const ProfileImage = styled.View`
    width: 200px;
    height: 200px;
    overflow: hidden;
`;

export const ProfileText = styled.Text`
    font-family: Trirong-Regular;
    font-size: 13px;
    margin-left: 20px;
    margin-top: 0px;
`;

export const Add = styled.TouchableOpacity`
    background-color: ${secondary};
    position: absolute;
    bottom: 20px;
    right: 78px;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`;

export const UserInfoSection = styled.View`
    padding-top: 32px;
    margin-right: 100px;
    margin-top: 20px;
`;

export const StatsBox = styled.View`
    align-items: center;
    flex: 1;
    border-color: ${secondary};

    ${(props) => props.mid == true && `
        border-left-width: 1px;
        border-right-width: 1px;
    `}
`;

export const InfoContainer = styled.View`
    align-items: center;
    margin-top: 16px;
`;

export const StatsContainer = styled.View`
    flex-direction: row;
    align-self: center;
    justify-content: center;
    margin-top: 32px;
`;

// Stall Page
export const StallPhoto = styled.ImageBackground`
    width: ${windowWidth}px;
    height: 300px;
    margin-bottom: 10px;
`;

export const MenuPhoto = styled.Image`
    width: 150px;
    height: 150px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const Title = styled.Text`
    font-family: Trirong-Medium;
    font-size: 32px;
    color: ${tertiary};

    ${(props) => props.SubTitle && `
    font-family: Trirong-Regular;
    font-size: 14px;
    `}

    ${(props) => props.Detail && `
    font-family: Trirong-Bold;
    font-size: 15px;
    margin-bottom: 15px;
    `}

    ${(props) => props.Label && `
    font-family: Trirong-Regular;
    font-size: 20px;
    margin-right: 150px;
    `}
`;

export const DetailsContainer = styled.View`
    padding-top: 5px;
    margin-top: 5px;
    margin-horizontal: 25px;
`;

export const LabelContainer = styled.View`
    padding-top: 5px;
    margin-top: 5px;
    margin-horizontal: 25px;
    flex-direction: row;
`;

export const ButtonsContainer = styled.View`
    flex-direction: row;
    height: 30px;
    margin-top: 15px;

    ${(props) => props.back == true && `
        margin-top: 0px;
        position: absolute;
        left: 20px;
    `}   

    ${(props) => props.back2 == true && `
        margin-top: 0px;
        position: absolute;
    `}   
`;

export const ReviewButton = styled.TouchableOpacity`
    border-color: ${tertiary};
    border-width: 1px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 40px;
`;

export const StallRow = styled.View`
    flex-direction: row;
    margin-bottom: 30px;
`;
