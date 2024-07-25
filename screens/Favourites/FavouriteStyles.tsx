/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FavouriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    minHeight: hp('100%'),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    height: hp('7%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  favouriteContainer: {
    height: hp('90%'),
    width: wp('100%'),
    backgroundColor: 'white',
    paddingBottom: hp('2%'),
  },
  favourites: {
    height: hp('10%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default FavouriteStyles;
