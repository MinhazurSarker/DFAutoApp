import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Keyboard, Alert, RefreshControl } from 'react-native';
import SecondHeader from '../components/SecondHeader';
import AppContext from '../contexts/appContext';
import { useNavigation } from '@react-navigation/native';

import UseApi from '../hooks/useApi';





const EditProduct = (props) => {

    const navigation = useNavigation();

    // @ts-ignore
    const { theme, token } = useContext(AppContext)
    const [ptPrice, setPtPrice] = useState('0');
    const [pdPrice, setPdPrice] = useState('0');
    const [rhPrice, setRhPrice] = useState('0');
    const [usdToAed, setUsdToAed] = useState('0');
    const [gbpToAed, setGbpToAed] = useState('0');

    const { getSettings, updateSettings } = UseApi()
    const [refreshing, setRefreshing] = useState(false)

    const save = async (props) => {
        Keyboard.dismiss()
        updateSettings(Number(ptPrice), Number(pdPrice), Number(rhPrice), Number(usdToAed), Number(gbpToAed)).then((res) => {
            if (res.data.msg) {
                Alert.alert('Message', 'Successfully updated')
            } else {
                Alert.alert('Message', 'Something went wrong')
            }
        }).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
        })
    };
    const fetch = async () => {
        setRefreshing(true)
        await getSettings().then((res => {
            setPtPrice(res.data.settings.ptPrice.toString());
            setPdPrice(res.data.settings.pdPrice.toString());
            setRhPrice(res.data.settings.rhPrice.toString());
            setUsdToAed(res.data.settings.usdToAed.toString());
            setGbpToAed(res.data.settings.gbpToAed.toString());
            setRefreshing(false)
        })).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
            navigation.goBack()
        })
    }
    useEffect(() => {
        fetch()
        return () => {
            setPtPrice('0');
            setPdPrice('0');
            setRhPrice('0');
            setUsdToAed('0');
            setGbpToAed('0');
        };
    }, []);
    const filter = text => {
        const cleanedText = text.replace(/[^0-9.]/g, '');
        if (cleanedText.charAt(cleanedText.length - 1) === '.') {
            return (cleanedText + '0');
        } else {
            return (cleanedText);
        }
    }
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
            <SecondHeader title={'LME Settings '} />
            <View style={[styles.main, { backgroundColor: theme.cardBg }]}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>GBP to AED</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={(text) => { setGbpToAed(text.replace(/[^0-9.]/g, '')) }}
                            value={gbpToAed.toString()}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>USD to AED</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={(text) => { setUsdToAed(text.replace(/[^0-9.]/g, '')) }}
                            value={usdToAed.toString()}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: theme.text.secondary }]}>Pt price</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                                onChangeText={(text) => { setPtPrice(text.replace(/[^0-9.]/g, '')) }}
                                value={ptPrice.toString()}
                                multiline={false}
                                placeholderTextColor={theme.text.secondary}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: theme.text.secondary }]}>Pd price</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                                onChangeText={(text) => { setPdPrice(text.replace(/[^0-9.]/g, '')) }}
                                value={pdPrice.toString()}
                                multiline={false}
                                placeholderTextColor={theme.text.secondary}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: theme.text.secondary }]}>Rh price</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                                onChangeText={(text) => { setRhPrice(text.replace(/[^0-9.]/g, '')) }}
                                value={rhPrice.toString()}
                                multiline={false}
                                placeholderTextColor={theme.text.secondary}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.inputSec}>

                        </View>
                    </View>
                    <View style={[styles.inputSec, { alignItems: 'center', justifyContent: 'center', }]}>
                        <TouchableOpacity
                            onPress={() => { save() }}
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
                            >Save</Text>
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
        flex: 1,
        marginHorizontal: 5
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

})
export default EditProduct;
