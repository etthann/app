/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProfileStyles = StyleSheet.create({
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
  avatarContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  avatar: {
    width: hp('14%'),
    height: hp('14%'),
    borderRadius: hp('7%'),
  },
  infoContainer: {
    marginTop: hp('3%'),
    alignItems: 'center',
  },
  infoText: {
    fontSize: hp('2.5%'),
    color: 'black',
    margin: hp('1%'),
  },
  opContainer: {
    width: wp('100%'),
    marginTop: hp('5%'),
    alignItems: 'center',
  },
  profileSections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    padding: hp('1%'),
  },
  buttonContainer: {
    marginTop: hp('3%'),
    width: wp('90%'),
  },
});

export default ProfileStyles;
