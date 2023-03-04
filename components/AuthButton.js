import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext} from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import AppContext from '../contexts/appContext';

const AuthButton = (props) => {
    // @ts-ignore
    const {  setToken,  setUser } = useContext(AppContext)
    const logout = async () => {
        setToken(null);
        setUser(null)
        await AsyncStorage.removeItem('@userData');
        await AsyncStorage.removeItem('@authToken');
        props.handleMenu()
        // @ts-ignore
        Alert.alert('Logged out', 'Successfully logged out')
    }
    return (
        <TouchableOpacity onPress={() => { logout() }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingLeft: 7,
                marginBottom: 25
            }}>
                <Feather
                    // @ts-ignore
                    name={'log-out'} size={20} color={"white"} />
                <Text style={{
                    fontSize: 18,
                    fontWeight: '500',
                    paddingLeft: 15,
                    color: "white"
                }}>Logout</Text>
            </View>
        </TouchableOpacity>
    );
}
export default AuthButton;
