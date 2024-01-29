import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import KeyAuth from '../KeyAuth';
import BackBtn from './icons/BackBtn';

interface LoginPageProps {
  navigation: any; // Adjust the type accordingly
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const login = async () => {
    if (password.length < 6) {
      // Is an example, you can change this to your own password requirements
      setPasswordError('The password is too short');
      return;
    } else {
      setPasswordError('');
    }

    const keyAuthApp = new KeyAuth("", "", "", "");

    await keyAuthApp.Initialize();

    setLoading(true);
    try {
      const result = await keyAuthApp.login(username, password);
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
          placeholder={'Username'}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder={'Password'}
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry
        />
        <CustomButton title="Login" onPress={login} loading={loading} />
      </View>
    </View>
  );
};

export default LoginPage;
