
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, RefreshControl } from 'react-native';
import LoginPhoneForm from '../components/LoginPhoneForm';

import { api } from '../constants/AppConstants';
import AppContext from '../contexts/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UseApi from '../hooks/useApi';



const firebaseConfig = {
  apiKey: "AIzaSyB0G1PLy-NYvhxoRFmwlFn-bJaaVv7zLQI",
  authDomain: "tuitionapp-15996.firebaseapp.com",
  databaseURL: "https://tuitionapp-15996.firebaseio.com",
  projectId: "tuitionapp-15996",
  storageBucket: "tuitionapp-15996.appspot.com",
  messagingSenderId: "1022255239580",
  appId: "1:1022255239580:web:fbdf07518206609f84f859",
  measurementId: "G-NSFTDS3T1R"
};


const Login = () => {
  // @ts-ignore
  const { theme, token, setToken, user, setUser } = useContext(AppContext)
  const { loading, login } = UseApi()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginNow = async () => {
    if (email != '' && password != '') {
      login(email, password)
    } else {
      Alert.alert('OOps...', 'Enter a valid email.')
    }
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.appBg }]}>
      <RefreshControl
        refreshing={loading}
        onRefresh={() => {
          setEmail('')
          setPassword('')
         }}
      />
      <LoginPhoneForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} login={loginNow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Login;
