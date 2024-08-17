/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const MovieCategoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieContainer: {
        flex: 1,
        width: wp('100%'),
        alignContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        minHeight: hp('30%'),
        borderTopWidth: hp('0.1%'),
        flexDirection: 'row',
    },
    movieTitle: {
        fontSize: hp('5%'),
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: hp('2%'),
        flexWrap: 'wrap',
        width: '60%',
    },
    movieImage: {
        width: '30%',
        height: '100%',
        marginTop: hp('1.5%'),
        marginLeft: hp('1.5%'),
        backgroundColor: 'black',
        resizeMode: 'contain',
    },
    movieModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '89%',
        height: '65%',
        flexDirection: 'row',
        borderRadius: hp('2%'),
    },
    movieDescription: {
        fontSize: hp('2.5%'),
        padding: hp('2%'),
        color: 'black',
    },
});

export default MovieCategoryStyles;
