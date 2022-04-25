import React, {useEffect, useState, useRef} from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import comments from './../../../model/Comments';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Avatar from '../../Components/Avatar';
import AppText from '../../Components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItems';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Comment from './Comments';
import {imageUrl} from '../../Config/Apis.json';
import {connect} from 'react-redux';
import Preview from './Preview';
import * as actions from '../../Store/Actions/index';
const {width, height} = Dimensions.get('window');

const Img = [
  {image: require('./../../Assets/Images/post1.png')},
  {image: require('./../../Assets/Images/place2.png')},
  {image: require('./../../Assets/Images/place3.png')},
];

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const MainPost = ({
  getAllCommentsOfPost,
  userReducer,
  commentOnPost,
  postsReducer,
  navigation,
  route,
}) => {
  const [commentText, setCommentText] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const postId = route?.params?.item?.post_id;
  const userId = userReducer?.data?.user_id;
  const [postComments, setPostComments] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getAllCommentsOfPost(postId).then(() => {
        setPostComments(postsReducer?.postComments);
      });
      setRefreshing(false);
    });
  }, []);

  const _onPressComment = () => {
    const apiData = {
      user_id: userId,
      post_id: postId,
      comment: commentText,
    };
    commentOnPost(apiData, onSuccess);
  };

  const onSuccess = () => {
    setCommentText('');
    getAllCommentsOfPost(postId).then(() => {
      setPostComments(postsReducer?.postComments);
    });
  };

  useEffect(() => {
    getAllCommentsOfPost(postId).then(() => {
      setPostComments(postsReducer?.postComments);
    });
  }, []);

  useEffect(() => {
    setPostComments(postsReducer?.postComments);
  }, [postsReducer?.postComments]);
  return (
    <View
      style={{
        // height: hp('100%'),
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // width: '100%',
        flex: 1,
        alignItems: 'center',
      }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={{}}>
            <View
              style={{justifyContent: 'flex-start', flexDirection: 'column'}}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  width: '80%',
                  margin: 8,
                }}>
                <Avatar
                  size="medium"
                  // source={`${imageUrl}/${route.params.profileImg}`}
                  source={route?.params?.profileImg? {
                    uri: `${imageUrl}/${route?.params?.profileImg}`,
                  }: require("../../Assets/Images/placeholderImage.jpg")}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 4,
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    left: 5,
                    width: '94%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'column',
                    }}>
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={hp('1.9%')}
                      color="black"
                      Label={route.params.name}
                    />
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={hp('1.5%')}
                      color="black"
                      Label={moment(route.params.uploadTime).fromNow()}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '95%',
                  margin: 10,
                }}>
                <AppText
                  nol={12}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('1.9%')}
                  color="black"
                  Label={route.params.description}
                />
              </View>
            </View>

            <View style={styles.commentBoxContainer}>
              <Avatar
                size="small"
                source={route?.params?.profileImg ? {
                  uri: `${imageUrl}/${route?.params?.profileImg}`,
                }:require("../../Assets/Images/placeholderImage.jpg")}
              />
              <TouchableWithoutFeedback>
                <TextInput
                  placeholder="Add a comment"
                  numberOfLines={5}
                  placeholderTextColor="grey"
                  multiline={true}
                  onChangeText={e => {
                    setCommentText(e);
                  }}
                  textAlignVertical="top"
                  value={commentText}
                  style={styles.textInputStyles}
                />
              </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.commentBtn}
              onPress={_onPressComment}>
              <AppText
                nol={1}
                family="Poppins-SemiBold"
                size={hp('1.7%')}
                color="white"
                Label={'Comment'}
              />
            </TouchableOpacity>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: height * 0.12}}
        data={postComments}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) =>{
          console.log(item)
          return (
          <Comment
            img={item?.user_image}
            name={item?.user_name}
            time={moment(item?.created_at).fromNow()}
            message={item?.comment}
          />
        )}}
      />
    </View>
  );
};

const mapStateToProps = ({userReducer, postsReducer}) => {
  return {userReducer, postsReducer};
};

export default connect(mapStateToProps, actions)(MainPost);

const styles = StyleSheet.create({
  commentBoxContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: 10,
    zIndex: 4,
    padding: 10,
    elevation: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
    //  height:100
  },
  textInputStyles: {
    marginLeft: width * 0.03,
    width: '85%',
    borderRadius: 6,
    top: -3,
    color: 'grey',
    fontSize: hp('1.9%'),
  },
  commentBtn: {
    borderRadius: width * 0.03,
    padding: 10,
    justifyContent: 'center',
    width: width * 0.3,
    alignItems: 'center',
    backgroundColor: '#B01125',
    alignSelf: 'flex-end',
    marginRight: width * 0.03,
    marginTop: height * 0.01,
  },
});