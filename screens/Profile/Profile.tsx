/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileStyles from './ProfileStyles';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import navProps from '../../props/navProp';

const Profile: React.FC<navProps> = ({navigation}) => {
  const profileSections = [
    {name: 'Personal Info', icon: 'person'},
    {name: 'Shipping Address', icon: 'local-shipping'},
    {name: 'Payment Information', icon: 'payment'},
    {name: 'Order History', icon: 'history'},
  ];

  const handleLogout = async () => {
    const logout = await axios.post('http://10.0.2.2:5000/logout');
    if (logout.status === 200) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={ProfileStyles.container}>
      <View style={ProfileStyles.titleContainer}>
        <Text style={{fontSize: hp('3%'), color: 'black', fontWeight: 'bold'}}>
          My Profile
        </Text>
      </View>
      <TouchableOpacity style={ProfileStyles.avatarContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={ProfileStyles.avatar}
        />
      </TouchableOpacity>
      <View style={ProfileStyles.infoContainer}>
        <Text style={ProfileStyles.infoText}>John Doe</Text>
      </View>
      <View style={ProfileStyles.opContainer}>
        {profileSections.map((section, index) => (
          <TouchableOpacity key={index} style={ProfileStyles.profileSections}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* Display the icon next to the section name */}
              <MaterialIcons name={section.icon} size={20} color="black" />
              <Text style={[ProfileStyles.infoText, {marginLeft: 10}]}>
                {section.name}
              </Text>
            </View>
            <Text style={{...ProfileStyles.infoText, fontSize: hp('3%')}}>
              {'>'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={ProfileStyles.buttonContainer}>
        <Button
          title="Logout"
          onPress={() => {
            handleLogout();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
