import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Keyboard, Image, Alert, RefreshControl } from 'react-native';
import SecondHeader from '../components/SecondHeader';
import AppContext from '../contexts/appContext';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { api } from '../constants/AppConstants';
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import UseApi from '../hooks/useApi';
var FormData = require('form-data');

export const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}
export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
}
const EditProduct = (props) => {
    const id = props?.route?.params?.data?._id || '';
    const navigation = useNavigation();
    // @ts-ignore
    const { theme, token } = useContext(AppContext)
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [serial, setSerial] = useState('');
    const [pt, setPt] = useState('');
    const [pd, setPd] = useState('');
    const [rh, setRh] = useState('');
    const [weight, setWeight] = useState('');
    const [img, setImg] = useState([]);
    const [imgUri, setImgUri] = useState([]);
    const [removedImgs, setRemovedImgs] = useState([]);
    const { getProduct, updateProduct } = UseApi()
    const [refreshing, setRefreshing] = useState(false)
    const save = async (props) => {
        Keyboard.dismiss()
        setRefreshing(true)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        formData.append('brand', brand);
        formData.append('serial', serial);
        formData.append('pt', pt);
        formData.append('pd', pd);
        formData.append('rh', rh);
        formData.append('weight', weight);
        formData.append('remove', JSON.stringify(removedImgs));
        for (let i = 0; i < img.length; i++) {
            // @ts-ignore
            formData.append('img', { uri: img[i].uri, name: img[i].name, type: img[i].type })
        }
        await updateProduct(id, formData).then((res) => {
            if (res.data.msg == 'success') {
                Alert.alert('Message', 'Successfully created', [
                    {
                        text: 'View',
                        // @ts-ignore
                        onPress: () => { navigation.navigate('Product', { data: { _id: res.data.product?._id } }) },
                    },
                    {
                        text: "Okay",
                    }
                ])
                setRefreshing(false)
            } else {
                Alert.alert('Message', 'Something went wrong')
                setRefreshing(false)
            }
        }).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
            setRefreshing(false)
        })

    };
    const upload = async (e) => {
        setRefreshing(true)
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to make this work!');
                return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                aspect: [4, 3],
            });
            if (result.canceled) return;
            const { uri, type } = result.assets[0]
            const fileInfo = await getFileInfo(uri)

            if (!fileInfo?.size) {
                alert("Can't select this file as the size is unknown.")
                return
            }
            if (type === 'image') {
                const isLt15MB = isLessThanTheMB(fileInfo.size, 10)
                if (!isLt15MB) {
                    alert(`Image size must be smaller than 10MB!`)
                    return
                }
            } else {
                alert(`Must be an image!`)
                return
            }
            const imgRes = await manipulateAsync(
                uri,
                [
                    { resize: { height: 800, width: Number(800 * (Number(result.assets[0].width) / Number(result.assets[0].height))) } }
                ],
                { compress: 1, format: SaveFormat.JPEG, base64: false }
            );
            let localUri = imgRes.uri;
            let filename = localUri.split('/').pop();
            // @ts-ignore
            let match = /\.(\w+)$/.exec(filename);
            let fileType = `image/jpg`;
            // @ts-ignore
            setImg([...img, { uri: localUri, name: filename, type: fileType }]);
            setRefreshing(false)
            
        } catch (error) {
            setRefreshing(false)
        }
    }
    const removeImage = (index) => {
        const newImg = [...img];
        newImg.splice(index, 1);
        // @ts-ignore
        setImg(newImg);
    };
    const addToRemove = (index, uri) => {
        const newImg = [...imgUri];
        newImg.splice(index, 1);
        // @ts-ignore
        setImgUri(newImg);
        // @ts-ignore
        setRemovedImgs([...removedImgs, uri])
    };
    const fetch = async () => {
        setRefreshing(true)
        await getProduct(id).then((res => {
            setName(res.data?.product?.name);
            setType(res.data?.product?.type);
            setBrand(res.data?.product?.brand);
            setSerial(res.data?.product?.serial);
            setWeight((res.data?.product?.weight || 0).toString());
            setPt((res.data?.product?.pt || 0).toString());
            setPd((res.data?.product?.pd || 0).toString());
            setRh((res.data?.product?.rh || 0).toString());
            setImgUri(res.data?.product?.img)
            setImg([])
            setRemovedImgs([])
            setRefreshing(false)
        })).catch((err) => {
            setRefreshing(false)
            Alert.alert('Message', 'Something went wrong')
            navigation.goBack()
        })
    }
    useEffect(() => {
        fetch()
        return () => {
            setName('');
            setType('');
            setBrand('');
            setSerial('');
            setPt('0');
            setPd('0');
            setRh('0');
            setWeight('0');
            setImg([]);
        };
    }, []);
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
            <SecondHeader title={'Edit Product '} />
            <View style={[styles.main, { backgroundColor: theme.cardBg }]}>
                <View style={styles.inputContainer}>
                    <View style={[styles.inputSec, { paddingVertical: 10, borderBottomWidth: 2, borderColor: theme.text.secondary }]}>
                        <View>
                            {imgUri.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, flexGrow: 1, backgroundColor: theme.appBg, borderRadius: 10, marginBottom: 5 }}>
                                    <Image key={index} style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 10,
                                    }} source={{ uri: `${api}/${item}` }} />
                                    <TouchableOpacity onPress={() => { addToRemove(index, item) }} style={[styles.button,]} >
                                        <FontAwesome name="close" size={25} color={theme.text.primary} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {img.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, flexGrow: 1, backgroundColor: theme.appBg, borderRadius: 10, marginBottom: 5 }}>
                                    <Image key={index} style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 10,
                                    }} source={item} />
                                    <TouchableOpacity onPress={() => { removeImage(index) }} style={[styles.button,]} >
                                        <FontAwesome name="close" size={25} color={theme.text.primary} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity
                                onPress={() => { upload() }}
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60, flexGrow: 1, backgroundColor: theme.appBg, borderRadius: 10, }}
                            >
                                <Text style={{
                                    color: theme.text.primary,
                                    fontSize: 18,
                                    fontWeight: '600',
                                }}
                                >Upload image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Code</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={(text) => { setName(text) }}
                            value={name}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                        />
                    </View>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Type</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={(text) => { setType(text) }}
                            value={type}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}
                        />
                    </View>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Brand</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={(text) => { setBrand(text) }}
                            value={brand}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}

                        />
                    </View>
                    <View style={styles.inputSec}>
                        <Text style={[styles.label, { color: theme.text.secondary }]}>Serial</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                            onChangeText={(text) => { setSerial(text) }}
                            value={serial}
                            multiline={false}
                            placeholderTextColor={theme.text.secondary}

                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: theme.text.secondary }]}>Weight</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                                onChangeText={(text) => { setWeight(text.replace(/[^0-9]/g, '')) }}
                                value={weight}
                                multiline={false}
                                placeholderTextColor={theme.text.secondary}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: theme.text.secondary }]}>Pt</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                                onChangeText={(text) => { setPt(text.replace(/[^0-9]/g, '')) }}
                                value={pt}
                                multiline={false}
                                placeholderTextColor={theme.text.secondary}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: theme.text.secondary }]}>Pd</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                                onChangeText={(text) => { setPd(text.replace(/[^0-9]/g, '')) }}
                                value={pd}
                                multiline={false}
                                placeholderTextColor={theme.text.secondary}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.inputSec}>
                            <Text style={[styles.label, { color: theme.text.secondary }]}>Rh</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.appBg, color: theme.text.secondary }]}
                                onChangeText={(text) => { setRh(text.replace(/[^0-9]/g, '')) }}
                                value={rh}
                                multiline={false}
                                placeholderTextColor={theme.text.secondary}
                                keyboardType='numeric'
                            />
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
    inputSecRow: {
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
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
export default EditProduct;
