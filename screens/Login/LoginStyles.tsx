/* eslint-disable prettier/prettier */
// styles.ts
import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoginStyles = StyleSheet.create({
  keyboardContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    backgroundColor: 'white',
    height: hp('30%'),
    width: wp('85%'),
    marginTop: hp('5%'),
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
  },
  loginTitle: {
    marginTop: hp('3%'),
    fontSize: hp('5%'),
    color: 'purple',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    backgroundColor: 'white',
  },
  inputCOntainer: {
    fontWeight: 'bold',
    marginTop: hp('6%'),
    fontSize: hp('2%'),
    color: 'black',
    backgroundColor: 'white',
  },
  inputFieldContainer: {
    width: wp('80%'),
    height: hp('6%'),
    borderWidth: hp('0.1%'),
    padding: hp('1%'),
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: hp('4%'),
    width: wp('80%'),
  },
  errorContainer: {
    marginTop: hp('3%'),
  },
  errorText: {
    color: 'red',
  },

  otherOptionsContainer: {
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hp('5%'),
    backgroundColor: 'white',
  },
  otherButton: {
    color: 'purple',
    backgroundColor: 'white',
  },
});

export default LoginStyles;
