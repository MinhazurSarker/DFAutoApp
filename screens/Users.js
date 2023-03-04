import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native';
import SecondHeader from '../components/SecondHeader';
import AppContext from '../contexts/appContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useApi from '../hooks/useApi';

const Users = (props) => {
    const navigation = useNavigation();
    // @ts-ignore
    const { theme, token } = useContext(AppContext)
    const { getUsers } = useApi()
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    const fetch = async () => {
        setRefreshing(true);
        await getUsers().then((res) => {
            if (res.data.msg) {
                setUsers(res.data.users)
            } else {
                Alert.alert('Message', 'Something went wrong')
            }
            setRefreshing(false);
        }).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
            setRefreshing(false);
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            fetch()
            return () => {
                setUsers([]);

            };
        }, [])
    );
    
    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetch}
                />
            }
            contentContainerStyle={[styles.container, { backgroundColor: theme.appBg }]} >
            <SecondHeader title={'Users'} />
            <View style={[styles.main, { backgroundColor: theme.cardBg }]}>
                <View style={styles.inputContainer}>
                    <View style={[styles.inputSec, { paddingVertical: 10, }]}>
                        <View>
                            {users?.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        // @ts-ignore
                                        navigation.navigate('EditUser', { data: { _id: item?._id } })
                                    }}
                                    key={index}
                                    style={{ justifyContent: 'center', alignItems: 'flex-start', minHeight: 60, flexGrow: 1, backgroundColor: theme.appBg, borderRadius: 10, marginBottom: 10, padding: 10 }}
                                >
                                    <Text style={[styles.label, { color: theme.primary }]}>Name : {item.name}</Text>
                                    <Text style={[styles.label, { color: theme.text.primary }]}>Email : {item.email}</Text>
                                    <Text style={[styles.label, { color: theme.text.secondary }]}>Role : {item.role}</Text>
                                </TouchableOpacity>
                            ))}
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
        flex: 1,
        marginHorizontal: 5
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5
    },
})
export default Users;
