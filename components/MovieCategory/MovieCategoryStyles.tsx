/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const MovieCategoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    movieContainer: {
        flex: 1,
        width: wp('100%'),
        alignContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        minHeight: hp('30%'),
        borderBottomWidth: hp('0.1%'),
        flexDirection: 'row',
    },
    movieTitle: {
        fontSize: hp('3%'),
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: hp('2%'),
        flexWrap: 'wrap',
    },
    movieImage: {
        width: '30%',
        height: '90%',
        marginTop: hp('1.5%'),
        marginLeft: hp('1.5%'),
    },
});

export default MovieCategoryStyles;
