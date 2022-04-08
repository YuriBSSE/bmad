import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import AppText from '../../Components/AppText';
import ConnectionsMapper from './ConnectionsMapper';
import ConnectionButtonsMapper from './ConnectionButtonsMapper';

import * as actions from '../../Store/Actions/index';
import {useIsFocused} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const Connections = ({
  getAllConnections,
  getInvites,
  unfriendUser,
  userReducer,
  testFunc,
  cancelMyRequestSent,
}) => {
  const [choice, setChoice] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const USER_ID = userReducer?.data?.user_id;
  const [connections, setConnections] = useState([]);
  const [invitation, setInvitations] = useState([]);
  const [requests, setRequests] = useState([]);
  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getAllConnectionsAndInvitations();
    });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getAllConnectionsAndInvitations = () => {
    // getAllConnections(USER_ID)
    // .then(() => {
    //   getInvites(USER_ID);
    // });
  };

  const _onPressToggleButton = (item, index) => {
    console.log(index, '==============');
    setChoice(index);
  };

  const unFriendThisPerson = (item, index) => {
    const data = {
      user: USER_ID,
      friend: item?.user_id,
    };
    unfriendUser(data);
  };

  const _onPressCancelMyRequestSent = (item, index) => {
    console.log('test');
    const data = {
      user: USER_ID,
      friend: item?.user_id,
    };
    cancelMyRequestSent(data);
  };

  // useEffect(() => {
  //   if (choice === 0) {
  //     console.log('connection length: ', connections.length);
  //   } else if (choice === 1) {
  //     console.log('invitations length: ', invitation.length);
  //   } else {
  //     console.log('requests length: ', requests.length);
  //   }
  // }, []);

  // useEffect(() => {
  //   let reqs = userReducer?.invitations?.filter(ele => ele.status == 'send');
  //   let invitations = userReducer?.invitations?.filter(
  //     ele => ele?.status !== 'send',
  //   );
  //   setRequests(reqs);
  //   setConnections(userReducer?.connections);
  //   setInvitations(invitations);
  //   // }, [userReducer?.connections, userReducer?.invitations]);
  // }, []);

  useEffect(() => {
    // getAllConnectionsAndInvitations();
    if (isFocused === true) {
      console.log('BAMAMMAMAMAMAMAMAMAMAMAMAMAMAMAMAAMMAMA');
      testFunc(USER_ID);
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <FlatList
            contentContainerStyle={styles.toggleContainer}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={buttonData}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item, index}) => (
              <ConnectionButtonsMapper
                item={item}
                index={index}
                choice={choice}
                onPress={_onPressToggleButton}
              />
            )}
          />
        )}
        data={choice === 0 ? connections : choice === 1 ? invitation : requests}
        keyExtractor={item => item?.user_id.toString()}
        renderItem={({item, index}) => (
          <ConnectionsMapper
            item={item}
            index={index}
            unFriendThisPerson={unFriendThisPerson}
            _onPressCancelMyRequestSent={_onPressCancelMyRequestSent}
          />
        )}
      /> */}
    </View>
  );
};

const mapStateToProps = ({nearMeUserReducer, userReducer}) => {
  return {
    nearMeUserReducer,
    userReducer,
  };
};
export default connect(mapStateToProps, actions)(Connections);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent:'flex-start',
    // alignItems:'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.02,
    // backgroundColor: 'grey',
    // height: height * 0.06,
  },
});

const buttonData = [
  {
    id: 0,
    label: 'My Connections',
    selected: true,
  },
  {
    id: 1,
    label: 'Invitaions',
    selected: false,
  },
  {
    id: 2,
    label: 'Requests Sent',
    selected: false,
  },
];
