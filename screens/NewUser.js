import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Keyboard, Alert, RefreshControl } from 'react-native';
import SecondHeader from '../components/SecondHeader';
import AppContext from '../contexts/appContext';
import { Picker } from '@react-native-picker/picker';
import UseApi from '../hooks/useApi';

const NewUser = ({ navigation }) => {

    // @ts-ignore
    const { theme, token } = useContext(AppContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
    const [password, setPassword] = useState('');
    const [refreshing, setRefreshing] = useState(false)
    const { createUser } = UseApi()
    const post = async () => {
        Keyboard.dismiss()
        setRefreshing(true)
        if (!(name == '' || email == '' || password == '')) {
            await createUser(email, password, name, role).then((res) => {
                if (res.data.msg) {
                    setName('');
                    setEmail('');
                    setRole('viewer');
                    setPassword('');
                    Alert.alert('Message', 'User created')
                    navigation.navigate('Users',{})
                } else {
                    Alert.alert('Message', res.data.err)
                }
                setRefreshing(false)
            }).catch((err) => {
                setRefreshing(false)
                Alert.alert('Message', 'Something went wrong')
            })
        } else {
            Alert.alert('Message', 'Fill the details')
        }
    }
    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                />
            }
            contentContainerStyle={[styles.container, { backgroundColor: theme.appBg }]} >
            <SecondHeader title={'New User '} />

            <View style={[styles.main, { backgroundColor: theme.cardBg }]}>
                <View style={styles.inputContainer}>

                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Name</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={text => setName(text)}
                            value={name}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                            placeholder={'Mr. Example'}
                        />
                    </View>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Email</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            inputMode='email'
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                            placeholder={'example@email.com'}
                        />
                    </View>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>password</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                            placeholder={'PaSsWoRd'}
                        />
                    </View>


                    <View style={styles.inputSecRow}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Role</Text>
                        <Picker
                            mode={'dialog'}
                            style={[styles.input, { backgroundColor: theme.appBg, width: 200, height: 50, color: theme.text.primary }]}
                            selectedValue={role}
                            dropdownIconColor={theme.text.primary}
                            onValueChange={(itemValue) =>
                                setRole(itemValue)
                            }>

                            <Picker.Item value={'viewer'} label="Viewer" />
                            <Picker.Item value={'editor'} label="Editor" />
                            <Picker.Item value={'admin'} label="Admin" />

                        </Picker>

                    </View>

                    <View style={[styles.inputSec, { alignItems: 'center', justifyContent: 'center', }]}>
                        <TouchableOpacity
                            onPress={() => { post() }}
                            style={{
                                backgroundColor: theme.btn.primary,
                                width: 200,
                                height: 50,
                                alignItems: 'center',
                                marginVertical: 10,
                                borderRadius: 5,
                                justifyContent: 'center',

                            }}
                        >
                            <Text style={{
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                            >Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    main: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    inputContainer: {
        margin: 20,
    },
    inputSec: {
        margin: 0,
    },
    inputSecRow: {
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10
    },
    input: {
        height: 50,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    checkbox: {
        height: 50,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
})
export default NewUser;
