import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Dimensions,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NotificationList from './NotificationList';
import AppText from '../../Components/AppText';
import * as actions from '../../Store/Actions/index';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import Noti from './../../../model/Notifications';
import {imageUrl} from "../../Config/Apis.json"

const {width, height} = Dimensions.get('window');

const NotificationScreen = ({
  userReducer,
  notificationsReducer,
  navigation,
  getNotifications,
}) => {
  // useEffect(() => {
  //   getNotifications();
  // }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const USER_ID = userReducer?.data?.user_id;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getNotifications(USER_ID);
    });
  }, []);

  const Separater = () => {
    return (
      <View
        style={{
          height: 50,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        bounces
        bouncesZoom
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // maintainVisibleContentPosition
        showsVerticalScrollIndicator={false}
        data={notificationsReducer?.notifications}
        ListHeaderComponent={<View style={{height: 50}}></View>}
        scrollEnabled
        style={{width: '100%'}}
        ItemSeparatorComponent={Separater}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => 
        
        {
          console.log(item?.post?.post_url)
          return (
          <NotificationList
            Time={item?.created_at}
            Img={`${imageUrl}/${item?.user?.user_coverImage}`}
            Name={item?.user?.user_name}
            Message={item.details}
            OnlineStatus={item.OnlineStatus}
            Navigation={navigation}
            Assets={item?.post?.post_url}
            Action={item.Action}
            type={item.type}
          />
        )}}
        keyExtractor={(item, index) => index}
        ListFooterComponent={() =>
          notificationsReducer?.notifications?.length === 0 && (
            <>
              <View style={{height: 30}}></View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <LottieView
                  style={{
                    width: width * 0.5,
                    height: height * 0.35,
                  }}
                  source={require('./../../Assets/Lottie/notfound.json')}
                  autoPlay
                  loop
                />
                <View style={{marginTop: height * -0.07}}>
                  <AppText
                    nol={1}
                    family="Poppins-Bold"
                    size={width * 0.07}
                    color="black"
                    Label={'No Notifications'}
                  />
                </View>
              </View>
            </>
          )
        }
      />

      <View style={{height: 100}} />
    </View>
  );
};

const mapStateToProps = ({userReducer, notificationsReducer}) => {
  return {
    userReducer,
    notificationsReducer,
  };
};
export default connect(mapStateToProps, actions)(NotificationScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
    backgroundColor: 'white',
  },
});
