import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import PostStyle from './Styles/PostStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

const Posts = React.memo(({id, title, desc}) => {
  // toggle state for read more / read less
  const [toggle, setToggle] = useState(false);

  // Heavy Computation code
  const [HeavyComputation, setHeavyComputation] = useState('');

  const toggleDescription = useMemo(() => {
    return () => {
      if (toggle) {
        const startTime = new Date().getTime();
        let result = '';
        // Example of heavy computation (can be replaced with actual heavy computation)
        for (let i = 0; i < 1000000; i++) {
          result += '0';
        }

        const endTime = new Date().getTime(); // End measuring time
        setHeavyComputation(endTime - startTime);
      }
    };
  }, [toggle]);

  // Heavy Computation code

  const navigation = useNavigation();

  return (
    <View style={PostStyle.posts}>
      {/* Posts Display Wrapper */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PostDetails', {
            id: id,
          })
        }
        activeOpacity={0.8}
        style={PostStyle.PostContainer}>
        <View style={PostStyle.bg_color}>
          <Text style={[PostStyle.id, {color: 'white'}]}>{id}</Text>
        </View>
        <View style={PostStyle.descriptionContainer}>
          <Text style={[PostStyle.id, {marginBottom: RFValue(5)}]}>
            {title}
          </Text>
          {toggle && <Text style={PostStyle.description}>{desc}</Text>}
        </View>
      </TouchableOpacity>
      {/* Posts Display Wrapper */}

      {/* Read More / Read Less CTA */}
      <TouchableOpacity
        onPress={() => {
          setToggle(!toggle);
          toggleDescription();
        }}
        activeOpacity={0.8}
        style={PostStyle.ctaContainer}>
        <Text style={PostStyle.CTAText}>
          {toggle ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
      <Text style={PostStyle.id}>{HeavyComputation || 0} Ms</Text>
      {/* Read More / Read Less CTA */}
    </View>
  );
});

export default Posts;
