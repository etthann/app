/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: hp('100%'),
    width: wp('100%'),
  },
  categoryContainer: {
    flex: 1,
    minHeight: hp('80%'),
    height: '100%',
    width: wp('100%'),
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: hp('2%'),
  },
  categoryBox: {
    height: hp('20%'),
    width: wp('42%'),
    backgroundColor: 'lightgray',
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
    marginHorizontal: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  categoryText: {
    fontSize: hp('2%'),
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
});

export default SearchStyles;
