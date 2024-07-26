/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ForgotPasswordStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
  },
  alignContent: {
    alignItems: 'center',
  },
  inputContainer: {
    width: wp('80%'),
    height: hp('6%'),
    borderWidth: hp('0.1%'),
    padding: hp('1%'),
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
  },
});

export default ForgotPasswordStyles;
