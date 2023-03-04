import { Feather, Ionicons } from '@expo/vector-icons';
import { Image, Text } from 'react-native'
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore
import img from './../assets/logo.png';
import AppContext from '../contexts/appContext';

const Header = ({ showMenu, handleMenu }) => {
    // @ts-ignore
    const { theme } = useContext(AppContext);


    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                height: 60,
                padding: 10,
                borderRadius: 7,
                backgroundColor: theme.cardBg
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }} >
                <TouchableOpacity style={{ margin: 5 }} onPress={handleMenu}>
                    <Feather name={showMenu ? 'x' : 'menu'} size={30} color={'#242424'} />
                </TouchableOpacity>
                <Image source={img} style={{
                    marginTop: 5,
                    marginLeft: 5,
                    height: 40,
                    width: 50,
                    // @ts-ignore
                    marginTop:-3,
                    marginRight:5
                }} />
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color:'#FFD700'
                }}>DF AUTO</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({})

export default Header;
