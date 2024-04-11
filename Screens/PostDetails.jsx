import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import Loading from '../Components/Loading';
import Posts from '../Components/Posts';
import PostStyle from '../Components/Styles/PostStyle';

// Post Details
const PostDetails = () => {
  const route = useRoute();

  //   Receiving Id from Home Screen Params
  const {id} = route.params;

  //   loading state
  const [isLoading, setIsLoading] = useState(false);

  //   Posts Details State
  const [postData, setPostData] = useState(null);

  //   Fetch post Details
  const fetchPostDetails = useCallback(async i => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${i}`,
      );
      setPostData(response?.data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  //   Mount on Refresh
  useEffect(() => {
    fetchPostDetails(id);
  }, [fetchPostDetails, id]);

  return (
    <View style={PostStyle.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          {postData && (
            <Posts
              id={postData.id}
              key={postData.id}
              title={postData.title}
              desc={postData.body}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default PostDetails;
