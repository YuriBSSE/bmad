import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import FavouriteList from './../../Components/FavouriteList'
 import * as actions from '../../Store/Actions';
 import {connect} from "react-redux";
 const Data = [
    {
        Name: "Old Fashioned",
        Image: require('./../../Assets/Images/1.png'),
        Value: false,
        Id: 1
    },
    {
        Name: "Margarita",
        Image: require('./../../Assets/Images/2.png'),
        Value: false,
        Id: 2
    },
    {
        Name: "Dark & Stormy",
        Image: require('./../../Assets/Images/3.png'),
        Value: false,
        Id: 3
    },
    {
        Name: "Mimosa",
        Image: require('./../../Assets/Images/4.png'),
        Value: false,
        Id: 4
    },
    {
        Name: "Manhattan",
        Image: require('./../../Assets/Images/5.png'),
        Value: false,
        Id: 5
    },
    {
        Name: "Whiskey Sour",
        Image: require('./../../Assets/Images/6.png'),
        Value: false,
        Id: 6
    },
    {
        Name: "Cosmopolitan",
        Image: require('./../../Assets/Images/7.png'),
        Value: false,
        Id: 7
    },
    {
        Name: "Martini",
        Image: require('./../../Assets/Images/8.png'),
        Value: false,
        Id: 8
    },
 ]
 const FavoriteDScreen = ({navigation, Favourite }) => {
    const [items, setItems] = useState([]);
    return(
        <View style={styles.container}>
              
                <StatusBar translucent backgroundColor="transparent" />
                <View style={{   marginTop: '22%', alignItems:'center', height: hp('100%')}}>
                <FlatList
                    contentContainerStyle={{
                        justifyContent:'center',
                        flexDirection:'column',
                        width: wp('100%'),
                        alignItems:'center',
                        alignContent:'center',
                        alignSelf:'center',
                        backgroundColor: 'white'
                    }}
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    numColumns={4 / 2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={null}
                    ListHeaderComponent={<View style={{height: 40}}></View>}
                    ListFooterComponent={<View style={{height: 100}}></View>}
                    data={Data}
                    keyExtractor={(item, index) => index}
                    extraData={items}
                    renderItem={({ item, index }) => 
                            <FavouriteList 
                                Name={item.Name}
                                Images={item.Image}
                                Value={item.Value}
                                Id={item.Id}
                                Favourite={Favourite}
                            />
                                }
                    
                        />
                </View>
              
        </View>
    )
 }


 var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: hp('110%'),
        backgroundColor: 'white'
    },
    scrollView: {
        marginHorizontal: 20,
    },
})
export default connect(null,actions)(FavoriteDScreen)
