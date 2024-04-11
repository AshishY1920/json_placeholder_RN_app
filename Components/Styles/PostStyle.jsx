import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const PostStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(10),
  },
  posts: {
    marginBottom: RFValue(10),
    borderBottomColor: '#F7F7F7',
    borderBottomWidth: 1,
    paddingVertical: RFValue(10),
  },
  PostContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: RFValue(15),
  },
  id: {
    color: '#1c1c1c',
    fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
    fontSize: RFPercentage(2),
  },
  description: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_regular-BF64a625c9311e1',
    fontSize: RFPercentage(1.8),
    color: '#1c1c1c',
    marginBottom: RFValue(10),
  },
  bg_color: {
    borderRadius: RFValue(50),
    backgroundColor: '#FF5BAE',
    width: RFValue(25),
    height: RFValue(25),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CTAText: {
    color: 'white',
    fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
    fontSize: RFPercentage(1.8),
  },
  ctaContainer: {
    backgroundColor: '#1c1c1c',
    alignSelf: 'flex-end',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5),
    borderRadius: RFValue(5),
  },
  descriptionContainer: {
    flex: RFValue(4),
  },
});

export default PostStyle;
