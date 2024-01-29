import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import KeyAuth from '../KeyAuth';
import BackBtn from './icons/BackBtn';

interface RegisterPageProps {
  navigation: any; // Adjust the type accordingly
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [license, setLicense] = useState('');
  const [password1, setPassword1] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const [result, setResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (password.length < 6) {
      // Is an example, you can change this to your own password requirements
      setPasswordError('The password is too short');
      return;
    } else {
      setPasswordError('');
    }

    if (password !== password1) {
      setPasswordError1('The passwords do not match');
      return;
    } else {
      setPasswordError1('');
    }

    const keyAuthApp = new KeyAuth("", "", "", "");

    await keyAuthApp.Initialize();
    setLoading(true);

    try {
      const result = await keyAuthApp.register(username, password, license, email);
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
            <Text style={{color: "white"}}>Register status:</Text>
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
          placeholder={'Email'}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder={'License key'}
          onChangeText={setLicense}
        />
        <CustomInput
          placeholder={'Password'}
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry
        />
        <CustomInput
          placeholder={'Repeat the password'}
          onChangeText={setPassword1}
          error={passwordError1}
          secureTextEntry
        />
        <CustomButton title="Register" onPress={register} loading={loading} />
      </View>
    </View>
  );
};

export default RegisterPage;
