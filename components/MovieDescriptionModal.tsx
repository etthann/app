/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeStyles from '../screens/Home/HomeStyles';

const MovieDescriptionModal: React.FC = () => {

    return (
        <Modal
            animationIn="slideInUp"
            isVisible={true}
            deviceWidth={wp('100%')}
            deviceHeight={hp('100%')}
        >
            <View style={HomeStyles.container}>
                <Text>I am the modal content!</Text>
            </View>
        </Modal>
    );
};


export default MovieDescriptionModal;
