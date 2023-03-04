import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Keyboard, Alert, RefreshControl } from 'react-native';
import SecondHeader from '../components/SecondHeader';
import AppContext from '../contexts/appContext';
import { Picker } from '@react-native-picker/picker';
import UseApi from '../hooks/useApi';
import { useFocusEffect } from '@react-navigation/native';

const EditUser = ({ navigation, ...props }) => {
    const { deleteUser, getUser, updateUser } = UseApi()
    const id = props?.route?.params?.data?._id || '';
    // @ts-ignore
    const { theme, user } = useContext(AppContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
    const [password, setPassword] = useState('');
    const [refreshing, setRefreshing] = useState(false)
    const post = async () => {
        setRefreshing(true)
        Keyboard.dismiss()
        if (!(name == '' || email == '')) {
            await updateUser(id, name, email, password, role).then((res) => {
                if (res.data.msg) {
                    Alert.alert('Message', 'User updated')
                } else {
                    Alert.alert('Message', res.data.err)
                }
                setPassword('');
                setRefreshing(false)

            }).catch((err) => {
                setRefreshing(false)

                Alert.alert('Message', 'Something went wrong')
            })
        } else {
            Alert.alert('Message', 'Fill the details')
        }
    }
    const deleteUserData = async () => {
        await deleteUser(id).then((res) => {
            if (res.data.msg) {

                Alert.alert('Message', 'Deleted')
                navigation.goBack()
            } else {
                Alert.alert('Message', res.data.err)
            }
        }).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
        })
    }
    const fetch = async () => {
        setRefreshing(true)
        await getUser(id).then((res => {
            if (res.data.msg) {
                setName(res.data.user.name);
                setEmail(res.data.user.email);
                setRole(res.data.user.role);
                setPassword('');
            } else {
                Alert.alert('Message', 'Not found')
                navigation.goBack()
            }
            setRefreshing(false)

        })).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
            navigation.goBack()
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            fetch()
            return () => {
                setName('');
                setEmail('');
                setRole('viewer');
                setPassword('');
            };
        }, [])
    );
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetch}
                />
            }
            keyboardShouldPersistTaps="always"
            contentContainerStyle={[styles.container, { backgroundColor: theme.appBg }]} >
            <SecondHeader title={'Edit User '} />
            <View style={[styles.main, { backgroundColor: theme.cardBg }]}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Name</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.primary }]}
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
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.primary }]}
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
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.primary }]}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                            placeholder={''}
                        />
                    </View>
                    {
                        !((user._id).toString() === id.toString()) &&
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
                    }
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 15,
                        borderRadius: 10
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    post()
                                }}
                                style={{
                                    padding: 5,
                                    flex: 1,
                                    margin: 20,
                                    justifyContent: 'center',
                                    backgroundColor: theme.btn.primary,
                                    alignItems: 'center',
                                    height: 50,
                                    borderRadius: 10,
                                }}>
                                <Text style={styles.btn}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // disabled={((user._id).toString() === id.toString())}
                                onPress={() => {
                                    if (((user._id).toString() === id.toString())) {
                                        Alert.alert('Alert', 'You can\'t delete yourself')
                                    } else {
                                        deleteUserData()
                                    }
                                }}
                                style={{
                                    padding: 5,
                                    flex: 1,
                                    margin: 20,
                                    justifyContent: 'center',
                                    backgroundColor: theme.btn.error,
                                    alignItems: 'center',
                                    height: 50,
                                    borderRadius: 10,
                                }}>
                                <Text style={styles.btn}>Delete</Text>
                            </TouchableOpacity>
                        </View>
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
    btn: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
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
export default EditUser;
