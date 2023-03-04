import React, { useContext } from 'react';
import { View,Text, StyleSheet,TouchableOpacity } from 'react-native';
import AppContext from '../contexts/appContext';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SecondHeader = (props) => {
    // @ts-ignore
    const { theme, token } = useContext(AppContext);
    const navigation = useNavigation();


    return (
        <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
            <TouchableOpacity 
            onPress={()=>{navigation.goBack(); }}
            style={[styles.icon ]}>
                <FontAwesome name="chevron-left" size={20} color={theme.text.secondary} />
            </TouchableOpacity>
            <Text style={[styles.text,{color:theme.text.primary}]}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    icon:{
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        fontWeight:'600',
        marginLeft:10,
    }
})

export default SecondHeader;
