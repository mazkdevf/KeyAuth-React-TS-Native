import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import KeyAuth from '../KeyAuth';
import BackBtn from './icons/BackBtn';

interface ForgotPageProps {
  navigation: any; // Adjust the type accordingly
}

const ForgotPage: React.FC<ForgotPageProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const restore = async () => {
    const keyAuthApp = new KeyAuth("", "", "", "");

    await keyAuthApp.Initialize();
    setLoading(true);

    try {
      const result = await keyAuthApp.forgot(username, email);
      console.log(result);
      setResult(false);
      setResultMessage('');
      navigation.navigate('Menu', { message: (result as any).message });
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
          <BackBtn />
        </Pressable>
        {result && (
          <View style={styles.wrapperSnack}>
            <Text style={{ color: "white" }}>Restore status:</Text>
            <Text style={{ color: "white" }}>{resultMessage}</Text>
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
        <CustomButton title="Restore" onPress={restore} loading={loading} />
      </View>
    </View>
  );
};

export default ForgotPage;
