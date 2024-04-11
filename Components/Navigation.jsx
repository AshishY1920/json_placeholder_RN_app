import React, {lazy, Suspense} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import PostStyle from './Styles/PostStyle';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// Function to create a lazy-loaded screen
const lazyScreen = importFunc => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={<LoadingPlaceholder />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const Home = lazyScreen(() => import('../Screens/Home'));
const PostDetails = lazyScreen(() => import('../Screens/PostDetails'));

// Loading Placeholder
const LoadingPlaceholder = React.memo(() => (
  <View style={PostStyle.loadingContainer}>
    <Text
      style={{
        color: '#000',
        fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
        fontSize: RFPercentage(2.5),
      }}>
      <ActivityIndicator size={RFPercentage(5)} color={'#FF5BAE'} />
    </Text>
  </View>
));

// Home Navigation
const HomeNavigator = React.memo(() => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Homes"
        options={{headerShown: false}}
        component={Home}
      />
      <HomeStack.Screen
        name="PostDetails"
        options={{
          headerTitleStyle: {
            fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
          },
        }}
        component={PostDetails}
      />
    </HomeStack.Navigator>
  );
});

// Tab Icons
const tabIcons = {
  Home: {
    name: 'home',
    set: 'Ionicons',
  },
  // Replace with the actual icon names for the Home tab
};

// Custom Tab Bar
const CustomTabBar = React.memo(({state, descriptors, navigation}) => {
  const isOk = state.routes.some(route => route.name === 'Login');
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.Custom_Bar}>
        <View style={isOk ? styles.tab_bar : styles.tabBar}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconName = tabIcons[route.name];
            const IconComponent =
              iconName.set === 'Ionicons' ? Icon : MaterialIcons;
            return (
              <TouchableOpacity
                key={route.name}
                activeOpacity={0.8}
                style={[styles.tabItem]}
                onPress={onPress}>
                <View
                  style={{
                    display: isOk ? 'none' : 'block',
                    alignItems: 'center',
                  }}>
                  <IconComponent
                    name={iconName.name}
                    size={RFValue(19)}
                    color={isFocused ? '#FF5BAE' : '#000'}
                  />
                  <Text
                    style={{
                      color: isFocused ? '#FF5BAE' : 'black',
                      fontFamily:
                        'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
                      fontSize: RFPercentage(1.8),
                    }}>
                    {label}
                  </Text>
                </View>
                {isFocused && (
                  <View
                    style={{
                      backgroundColor: '#FF5BAE',
                      width: RFValue(5),
                      height: RFValue(5),
                      borderRadius: RFValue(50),
                      marginTop: RFValue(3),
                    }}></View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
});

// Tab Bar Starter
const Navigation = React.memo(() => {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <Tab.Navigator
      shifting={true}
      sceneAnimationEnabled={false}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* Add more tabs/screens as needed */}
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  Custom_Bar: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: RFValue(8),
    borderRadius: RFValue(50),
    shadowColor: '#607274',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 15,
    marginBottom: RFValue(15),
    paddingHorizontal: RFValue(10),
    borderColor: '#EEEEEE',
    borderWidth: 1,
  },
  tab_bar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 0,
    borderRadius: RFValue(10),
    shadowColor: '#607274',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 15,
    marginBottom: RFValue(15),
    paddingHorizontal: RFValue(10),
    borderColor: '#EEEEEE',
    borderWidth: 1,
    // borderTopColor: '#F8DFF4',
    // borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navigation;
