import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import categories from './../components/categories';
import foods from './../components/foods';
import {
  HeaderHome,
  InputContainer,
  SortBtn,
  CategoriesListContainer,
  CategoryBtn,
  CategoryBtnImgCon,
  CardHome,
  AddToCartBtn,
  Colors,
} from '../components/styles';

// colors
const {brand, darkLight, tertiary, primary} = Colors;

const HomePage = ({navigation}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const ListCategories = () => {
    return (
      <CategoriesListContainer
        horizontal
        showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <CategoryBtn>
              <CategoryBtnImgCon>
                <Image
                  source={require('./../assets/LogoOnly.png')}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </CategoryBtnImgCon>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? {primary}
                      : {brand}
                }}>
                {category.name}
              </Text>
            </CategoryBtn>
          </TouchableOpacity>
        ))}
      </CategoriesListContainer>
    );
  };

  const Card = ({food}) => {
    return (
      <TouchableHighlight
        underlayColor={primary}
        activeOpacity={0.9}
        // onPress={() => navigation.navigate('DetailsScreen', food)}
        >
        <CardHome>
          <View style={{alignItems: 'center', top: -40}}>
            <Image source={food.image} style={{height: 120, width: 120}} />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{food.name}</Text>
            <Text style={{fontSize: 14, color: {tertiary}, marginTop: 2}}>
              {food.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              ${food.price}
            </Text>
            <AddToCartBtn>
              <Icon name="add" size={20} color={primary} />
            </AddToCartBtn>
          </View>
        </CardHome>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: {primary}}}>
      <HeaderHome>
        <View>
          <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 28}}>Hello,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              Marco
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: {tertiary}}}>
            What do you want today
          </Text>
        </View>
        <Image
          source={require('./../assets/LogoOnly.png')}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </HeaderHome>
      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}>
        <InputContainer>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for food"
          />
        </InputContainer>
        <SortBtn>
          <Icon name="tune" size={28} color={primary} />
        </SortBtn>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foods}
        renderItem={({item}) => <Card food={item} />}
      />
    </SafeAreaView>
  );
};

export default HomePage;