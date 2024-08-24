/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileStyles from './ProfileStyles';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { navProps } from '../../props/interface';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile: React.FC<navProps> = ({ navigation }) => {
  const [pfp, setPfp] = React.useState<string | undefined>('');
  const [name, setName] = React.useState<string>('');
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const fetchUsername = async () => {
          const storedUsername = await AsyncStorage.getItem('username');
          setUsername(storedUsername);
        };
        fetchUsername();
        const info = await axios.post('http://10.0.2.2:5000/userInfo', {
          username: username,
        });
        if (info.data && info.status === 200) {
          setName(info.data?.username);
          setPfp(info.data[0]?.pfp);

        } else {
          throw new Error("Couldn't Retrieve User Info");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [username]);

  const profileSections = [
    { name: 'Personal Info', icon: 'person' },
    { name: 'Shipping Address', icon: 'local-shipping' },
    { name: 'Payment Information', icon: 'payment' },
    { name: 'Order History', icon: 'history' },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    const logout = await axios.post('http://10.0.2.2:5000/logout');
    if (logout.status === 200) {
      navigation.navigate('Login');
    }
  };


  const changePfp = async () => {

    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: hp('14%'),
        maxWidth: hp('14%'),
      });

      if (result.didCancel) {
        throw new Error('User Cancelled');
      }

      if (result.errorCode) {
        throw new Error(result.errorMessage);
      }

      if (result.assets) {
        setPfp(result.assets[0]?.uri);
      }

    } catch (error: any) {
      throw new Error(error.toString());
    }
  };

  return (
    <SafeAreaView style={ProfileStyles.container}>
      <View style={ProfileStyles.titleContainer}>
        <Text style={{ fontSize: hp('3%'), color: 'black', fontWeight: 'bold' }}>
          My Profile
        </Text>
      </View>
      <TouchableOpacity
        style={ProfileStyles.avatarContainer}
        onPress={() => { changePfp(); }}>
        <Image
          source={{ uri: pfp || 'https://via.placeholder.com/150' }}
          style={ProfileStyles.avatar}
        />
      </TouchableOpacity>
      <View style={ProfileStyles.infoContainer}>
        <Text style={ProfileStyles.infoText}>{name}</Text>
      </View>
      <View style={ProfileStyles.opContainer}>
        {profileSections.map((section, index) => (
          <TouchableOpacity key={index} style={ProfileStyles.profileSections}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Display the icon next to the section name */}
              <MaterialIcons name={section.icon} size={20} color="black" />
              <Text style={[ProfileStyles.infoText, { marginLeft: 10 }]}>
                {section.name}
              </Text>
            </View>
            <Text style={{ ...ProfileStyles.infoText, fontSize: hp('3%') }}>
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
