import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import AppContext from '../contexts/appContext';
const LoginPhoneForm = (props) => {
    // @ts-ignore
    const { theme } = useContext(AppContext)
    return (
        <View style={[styles.container, { position: "relative" }]}>
            <View style={[styles.secondContainer, {}]}>
                <View>
                    <View style={styles.content}>
                        <Text style={[styles.text1, { color: theme.text.secondary }]}>Login</Text>
                    </View>
                    <View style={[styles.formContainer, { backgroundColor: theme.cardBg }]}>
                        <Text style={[styles.formText, { color: theme.text.secondary }]}>Email</Text>
                        <View style={[styles.formInputContainer, { borderColor: theme.primary }]}>
                            <TextInput
                                style={[styles.formInput, { color: theme.text.primary }]}
                                onChangeText={text => props.setEmail(text)}
                                value={props.email}
                                multiline={false}
                                placeholderTextColor={theme.text.plch}
                                autoComplete='email'
                                inputMode='email'
                                placeholder={'example@email.com'}
                                onSubmitEditing={props.login}
                            />
                        </View>
                    </View>
                    <View style={[styles.formContainer, { backgroundColor: theme.cardBg }]}>
                        <Text style={[styles.formText, { color: theme.text.secondary }]}>Password</Text>
                        <View style={[styles.formInputContainer, { borderColor: theme.primary }]}>
                            <TextInput
                                style={[styles.formInput, { color: theme.text.primary }]}
                                onChangeText={text => props.setPassword(text)}
                                value={props.password}
                                multiline={false}
                                placeholderTextColor={theme.text.plch}
                                placeholder={'password'}
                                onSubmitEditing={props.login}
                            />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={e=>props.login()}
                            style={[styles.btn, { backgroundColor: theme.btn.primary }]} >
                            <Text style={[styles.btnTxt]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    secondContainer: {

        bottom: 0,
        left: 0,
        right: 0,
        padding: 20
    },
    close: {
        height: 50,
        right: 30,
        top: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: "absolute"

    },

    content: {
        marginVertical: 70,
    },
    text1: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500'
    },
    text2: {
        fontSize: 25,
        fontWeight: '600'
    },
    formContainer: {
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    formText: {
        fontSize: 22,
        fontWeight: '500'
    },
    formInputContainer: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    formInput: {
        fontSize: 15,
        fontWeight: '500',
    },
    btnContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        height: 50,
        width: '60%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '600'
    },
})

export default LoginPhoneForm;
