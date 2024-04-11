import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import PostStyle from './Styles/PostStyle';

const Loading = React.memo(() => {
  return (
    <View style={PostStyle.loadingContainer}>
      <ActivityIndicator size={RFPercentage(5)} color={'#FF5BAE'} />
    </View>
  );
});

export default Loading;
