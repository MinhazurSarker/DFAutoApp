
import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
// @ts-ignore
import img from './../assets/logo.png';
const MenuProfile = (props) => {
    return (
        <View style={{ alignItems: 'center', width: 200 }}>
            <Image source={img} style={styles.profileImg}></Image>
            <Text style={styles.profileName}>DF AUTO</Text>

            <Text style={{
                marginTop: 6,
                color: 'white',
                fontSize: 10
            }}>Catalytic converter price calculator</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImg: {
        width: 100,
        height: 80,
        borderRadius: 15,
        marginTop: 50,

    },
    profileName: {
        fontSize: 30,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFD700',
        marginTop: 10,

    },
})

export default MenuProfile;
