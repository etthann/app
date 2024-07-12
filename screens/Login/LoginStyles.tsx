// styles.ts
import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Home from '../Home/Home';

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
    backgroundColor: 'transparent',
    height: hp('30%'),
    width: wp('85%'),
    marginTop: hp('5%'),
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  loginTitle: {
    marginTop: hp('3%'),
    fontSize: hp('5%'),
    color: 'purple',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  inputCOntainer: {
    fontWeight: 'bold',
    marginTop: hp('6%'),
    fontSize: hp('2%'),
    color: 'black',
  },
  inputFieldContainer: {
    width: wp('80%'),
    height: hp('6%'),
    borderWidth: hp('0.1%'),
    padding: hp('1%'),
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
  },
  buttonContainer: {
    marginTop: hp('4%'),
    width: wp('80%'),
  },
  otherOptionsContainer: {
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hp('5%'),
  },
});

export default LoginStyles;
