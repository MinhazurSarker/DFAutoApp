import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useContext } from 'react';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import AppContext from '../contexts/appContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import HomeProducts from '../components/HomeProducts';
import useApi from '../hooks/useApi';
const { width, height } = Dimensions.get('window')
const HomeScreen = () => {
    const { getProducts } = useApi()
    // @ts-ignore
    const { theme } = useContext(AppContext)
    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pages, setPages] = useState(1);
    const [text, setText] = useState("");
    const [debouncedText, setDebouncedText] = useState(text);
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(false);

    const fetch = () => {
        setLoading(true)
        getProducts(current, text)
            .then((res) => {
                setProducts(res.data.products);
                setCurrent(Number(res.data.current));
                setPages(Number(res.data.pages));
                setSettings(res.data.settings);
                setLoading(false)
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            fetch()
            return () => {
                setProducts([]);
                setCurrent(Number(0));
                setPages(Number(0));
                setSettings({});
                setLoading(false)
            };
        }, [text])
    );
    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setText(debouncedText)
        }, 500);
        return () => clearTimeout(timer);
    }, [debouncedText])


    const nextPage = () => {
        if (current < pages) {
            setLoading(true)
            getProducts(current + 1, text)
                .then((res) => {
                    setProducts(res.data.products);
                    setCurrent(Number(res.data.current));
                    setPages(Number(res.data.pages));
                    setSettings(res.data.settings);
                    setLoading(false)
                })
        } else {
            Alert.alert('Message', 'This is the last page')
        }
    }
    const prevPage = () => {
        if (current > 1) {
            setLoading(true)
            getProducts(current - 1, text)
                .then((res) => {
                    setProducts(res.data.products);
                    setCurrent(Number(res.data.current));
                    setPages(Number(res.data.pages));
                    setSettings(res.data.settings);
                    setLoading(false)
                })
        } else {
            Alert.alert('Message', 'This is the first page')
        }
    }



    return (
        <View style={{ flexGrow: 1, position: 'relative', }}>
            <View style={[styles.formContainer, { backgroundColor: theme.cardBg }]}>
                <View style={[styles.formInputContainer, { borderColor: theme.primary, position: 'relative' }]}>
                    <TextInput
                        style={[styles.formInput, { backgroundColor: theme.appBg, color: theme.text.primary, height: 40 }]}
                        onChangeText={text => setDebouncedText(text)}
                        value={debouncedText}
                        multiline={false}
                        placeholderTextColor={theme.text.plch}
                        placeholder={'Search'}

                    />
                    {debouncedText.length > 0 ?
                        <TouchableOpacity onPress={() => { setDebouncedText('') }} style={[styles.button, { position: 'absolute', bottom: 0, right: 0 }]} >
                            <FontAwesome name="close" size={25} color={theme.text.primary} />
                        </TouchableOpacity> : <></>
                    }
                </View>
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
                <HomeProducts data={products} settings={settings} />
                <View style={[styles.paginationContainer]} >
                    <TouchableOpacity disabled={false} onPress={() => prevPage()} style={[styles.paginationBtn, { backgroundColor: theme.cardBg }]} >
                        <FontAwesome name="chevron-left" size={18} color={theme.text.secondary} />
                    </TouchableOpacity>
                    <View style={[styles.paginationBtn, { backgroundColor: theme.cardBg }]} >
                        <Text style={{ color: theme.text.secondary, fontSize: 18, fontWeight: '600' }} >{current}/{pages}</Text>
                    </View>
                    <TouchableOpacity disabled={false} onPress={() => nextPage()} style={[styles.paginationBtn, { backgroundColor: theme.cardBg }]} >
                        <FontAwesome name="chevron-right" size={18} color={theme.text.secondary} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 100 }}></View>
            </ScrollView>
         
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,

    },
    formContainer: {
        padding: 10,
        margin: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    formText: {
        fontSize: 22,
        fontWeight: '500'
    },
    formInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    formInput: {
        fontSize: 20,
        fontWeight: '500',
        flexGrow: 1,
        padding: 2,
        borderRadius: 5
    },

 

 
 
    button: {
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },

    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    paginationBtn: {
        margin: 5,
        borderRadius: 7,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '20%',


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
    btnContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'relative'
    },
    normalBtn: {
        height: '80%',
        width: undefined,
        aspectRatio: 1.5 / 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    plusBtn: {
        height: '85%',
        width: undefined,
        aspectRatio: 1 / 1,
        marginTop: -45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        zIndex: 2,

    },

})

export default HomeScreen;
