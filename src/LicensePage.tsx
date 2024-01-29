import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import KeyAuth from '../KeyAuth';
import BackBtn from './icons/BackBtn';

interface LicensePageProps {
  navigation: any; // Adjust the type accordingly
}

const LicensePage: React.FC<LicensePageProps> = ({ navigation }) => {
  const [license, setLicense] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const login = async () => {
    const keyAuthApp = new KeyAuth("", "", "", "");

    await keyAuthApp.Initialize();
    setLoading(true);

    try {
      const result = await keyAuthApp.license(license);
      console.log(result);
      setResult(false);
      setResultMessage('');
      navigation.navigate('Menu', { message: result.message });
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
            <Text style={{color: "white"}}>Login status:</Text>
            <Text style={{color: "white"}}>{resultMessage}</Text>
          </View>
        )}
      </View>
      <View style={styles.wrapper}>
        <Image source={require("../assets/KeyauthBanner.png")} style={styles.image} />
        <CustomInput
          placeholder={'License key'}
          onChangeText={setLicense}
        />
        <CustomButton title="Login" onPress={login} loading={loading} />
      </View>
    </View>
  );
};

export default LicensePage;
