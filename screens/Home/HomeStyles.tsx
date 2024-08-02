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
    borderColor: 'black',
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOptions: {
    position: 'absolute',
    bottom: 0,
    marginBottom: hp('8%'),
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  options: {
    height: hp('8.2%'),
    width: '14.5%',
    borderRadius: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    borderRadius: hp('1%'),
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
  },
  title: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: hp('4%'),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0.5%'),
    borderRadius: hp('1%'),
  },
  description: {
    width: '100%',
    height: '35%',
    padding: hp('1%'),
    marginTop: hp('5%'),
  },
  descriptionText: {
    marginTop: hp('1%'),
    fontSize: hp('2%'),
    color: 'white',
    fontFamily: 'Roboto-Bold',
    borderRadius: hp('1%'),
    padding: hp('1%'),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    width: '90%',
    borderRadius: hp('2%'),
    padding: hp('2%'),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  modalDescriptionText: {
    fontSize: hp('2%'),
    color: 'black',
    fontFamily: 'Roboto-Bold',
    padding: hp('1%'),
    textAlign: 'center',
  },
  closeModal: {
    fontSize: hp('2%'),
    color: 'blue',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    padding: hp('1%'),
    marginTop: hp('2%'),
  },
  readMore: {
    fontSize: hp('2%'),
    color: 'white',
    fontFamily: 'Roboto-Bold',
    textAlign: 'right',
    padding: hp('1%'),
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: hp('80%'),
  },
});

export default HomeStyles;
