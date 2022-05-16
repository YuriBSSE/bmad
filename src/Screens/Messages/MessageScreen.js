import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Messages from '../../../model/Messages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MessageList from './MessageList';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';

const {width, height} = Dimensions.get('window');

const MessageScreen = ({
  navigation,
  route,
  userReducer,
  getAllConversations,
  messagesReducer,
  saveCurrentChatObject,
}) => {
  const user = userReducer?.data;
  const [conversationlist, setconversationlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    await getAllConversations(user?.user_id);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (messagesReducer?.conversations?.length > 0) {
      setconversationlist(messagesReducer?.conversations);
    }
  }, [messagesReducer?.conversations]);

  const Separater = () => {
    return (
      <View
        style={{
          borderBottomColor: '#D8D8D8',
          borderBottomWidth: 0.8,
          width: wp('100%'),
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
    );
  };

  const onPressChat = item => {
    // console.log(item)
    saveCurrentChatObject(item);
    navigation.navigate('chats');
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(async () => {
      setRefreshing(false);
      setIsLoading(true);
      await getAllConversations(user?.user_id);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <LottieView
            style={styles.lottieStyles}
            source={require('../../Assets/Lottie/loading-heart.json')}
            autoPlay
            loop
          />
          <Text style={styles.loadingText}>{`Loading`}</Text>
          <Text style={styles.convStyles}>{`Conversations..`}</Text>
        </>
      ) : (
        <FlatList
          bounces
          bouncesZoom
          maintainVisibleContentPosition
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          data={conversationlist}
          ItemSeparatorComponent={Separater}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={<View style={{height: 20}}></View>}
          ListFooterComponent={() => {
            if (isLoading) {
              return <View />;
            } else {
              return <View style={{paddingBottom: height * 0.01}} />;
            }
          }}
          renderItem={({item, index}) => (
            <MessageList
              item={item}
              Time={new Date()}
              Image={item?.user_image}
              Name={item?.user_name}
              Message={'This is a dummy last message of this user.'}
              onPress={onPressChat}
              OnlineStatus={false}
              Navigation={navigation}
            />
          )}
        />
      )}
    </View>
  );
};
const mapStateToProps = ({userReducer, messagesReducer}) => {
  return {userReducer, messagesReducer};
};

export default connect(mapStateToProps, actions)(MessageScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
    backgroundColor: '#FCFCFC',
  },
  lottieStyles: {
    marginTop: height * -0.03,
    // width: width * 0.2,
    height: height * 0.28,
    marginLeft: width * 0.12,
  },
  loadingText: {
    marginTop: height * -0.06,
    marginLeft: width * 0.36,
    fontSize: width * 0.07,
    fontFamily: 'Poppins-ExtraBold',
  },
  convStyles: {
    marginLeft: width * 0.24,
    fontSize: width * 0.07,
    fontFamily: 'Poppins-ExtraBold',
  },
});
