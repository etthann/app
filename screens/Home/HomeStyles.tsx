/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: hp('100'),
    maxWidth: wp('100'),
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
  },
  navContainer: {
    backgroundColor: 'white',
    height: '7%',
    width: '100%',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    marginLeft: hp('1%'),
    fontSize: hp('2.5%'),
    color: 'purple',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    backgroundColor: 'white',
  },
  profileButton: {
    width: hp('4%'),
    height: hp('4%'),
    position: 'absolute',
    right: hp('2%'),
    backgroundColor: 'lightgray',
    borderRadius: hp('4%'),
    padding: hp('1%'),
    borderWidth: hp('0.05%'),
  },
  cardContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  card: {
    height: '85%',
    width: '90%',
    backgroundColor: 'lightgray',
    borderRadius: hp('1%'),
    borderWidth: hp('0.1%'),
    borderColor: 'black',
    marginTop: hp('4%'),
    alignItems: 'center',
  },
});

export default HomeStyles;
