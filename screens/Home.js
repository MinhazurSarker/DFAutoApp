import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useContext } from 'react';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import AppContext from '../contexts/appContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useApi from '../hooks/useApi';
const { width } = Dimensions.get('window')

const HomeScreen = () => {
    const { getIndex } = useApi()
    // @ts-ignore
    const { theme } = useContext(AppContext)
    const [users, setUsers] = useState({});
    const [TotalDocs, setTotalDocs] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const fetch = () => {
        setLoading(true)
        getIndex()
            .then((res) => {
                setUsers(res.data.totalUsers);
                setTotalDocs(res.data.totalDocs);
                setLoading(false)
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            fetch()
            return () => {
                setUsers('');
                setTotalDocs('');
                setLoading(false)
            };
        }, [])
    );

    return (
        <View style={{ flexGrow: 1, position: 'relative', }}>

            <View style={[styles.paginationContainer]} >
                <TouchableOpacity disabled={false} onPress={() => { navigation.navigate('Products', {}) }} style={[styles.searchBtn, { backgroundColor: theme.btn.primary, }]} >
                    <Text style={{ color: '#fff', fontSize: 25, fontWeight: '600', }} >Search items</Text>
                    <FontAwesome name="search" size={25} color={'#fff'} />
                </TouchableOpacity>

            </View>

            <ScrollView
                keyboardShouldPersistTaps='always'
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => { fetch() }}
                    />
                }
                contentContainerStyle={[styles.container, { backgroundColor: theme.appBg }]}
            >

                <View style={[styles.main, { backgroundColor: theme.btn.primary }]}>
                    <View
                        style={{ margin: 10, width: width - 20, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: '600', }} >Statistics</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: '#fff' }]}>Total products</Text>
                            <Text
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.primary }]}
                            >{TotalDocs}</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: '#fff' }]}>Total Users</Text>
                            <Text
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.primary }]}
                            >{users}</Text>
                        </View>
                    </View>


                </View>

            </ScrollView>

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,

    },




    main: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    inputContainer: {
        margin: 10,
    },
    inputSec: {
        margin: 0,
        flex: 1,
        marginHorizontal: 5
    },

    input: {
        height: 40,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        overflow: 'hidden',
        fontSize: 18,
        justifyContent: 'center',
    },

    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    searchBtn: {
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        margin: 20,
        marginHorizontal: 70,

    },
    paginationBtn: {
        margin: 5,
        borderRadius: 7,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '20%',
    },

    label: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10
    },
})

export default HomeScreen;
