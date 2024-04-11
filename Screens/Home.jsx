import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import Posts from '../Components/Posts';
import {RFValue} from 'react-native-responsive-fontsize';
import Loading from '../Components/Loading';
import PostStyle from '../Components/Styles/PostStyle';

const Home = () => {
  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // Array of Posts
  const [posts, setPosts] = useState([]);

  // Fetch Posts
  const fetchPosts = useCallback(async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      setPosts(response?.data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // mount on refresh
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <View style={PostStyle.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          renderItem={({item}) => {
            return (
              <Posts
                id={item.id}
                key={item.id}
                title={item.title}
                desc={item.body}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={item => item.id}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

export default Home;
