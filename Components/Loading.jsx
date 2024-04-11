import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';

const Loading = React.memo(() => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <ActivityIndicator size={RFPercentage(5)} color={'#FF5BAE'} />
    </View>
  );
});

export default Loading;
