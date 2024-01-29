import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import KeyAuth from '../KeyAuth';
import BackBtn from './icons/BackBtn';

interface UpgradePageProps {
  navigation: any; // Adjust the type accordingly
}

const UpgradePage: React.FC<UpgradePageProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [license, setLicense] = useState('');
  const [result, setResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const upgrade = async () => {
    const keyAuthApp = new KeyAuth("", "", "", "");

    await keyAuthApp.Initialize();
    setLoading(true);

    try {
      const result = await keyAuthApp.upgrade(username, license);
      console.log(result);
      setResult(false);
      setResultMessage('');
      navigation.navigate('Menu', { message: result });
    } catch (error) {
      console.log("error", error);
      setResult(true);
      setResultMessage(error as string);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <BackBtn/>
        </Pressable>
        {result && (
          <View style={styles.wrapperSnack}>
            <Text style={{color: "white"}}>Upgrade status:</Text>
            <Text style={{color: "white"}}>{resultMessage}</Text>
          </View>
        )}
      </View>
      <View style={styles.wrapper}>
        <Image source={require("../assets/KeyauthBanner.png")} style={styles.image} />
        <CustomInput
          placeholder={'Username'}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder={'License key'}
          onChangeText={setLicense}
        />
        <CustomButton title="Upgrade" onPress={upgrade} loading={loading} />
      </View>
    </View>
  );
};

export default UpgradePage;
