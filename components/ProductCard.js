import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AppContext from '../contexts/appContext';
import { useNavigation } from '@react-navigation/native';
import { api } from '../constants/AppConstants';
// @ts-ignore
import img from './../assets/img.jpg';

const { width } = Dimensions.get('window')
const ProductCard = ({ item, index, settings }) => {
    // @ts-ignore
    const { theme, token } = useContext(AppContext)
    const navigation = useNavigation();

    const calculate = (weight, ptValue, pdValue, rhValue, ptPrice, pdPrice, rhPrice, usdToAed, gbpToAed) => {
        const pt = ((ptValue / 1000 / 31.10348) * (ptPrice * usdToAed) * .98)
        const pd = ((pdValue / 1000 / 31.10348) * (pdPrice * usdToAed) * .98)
        const rh = ((rhValue / 1000 / 31.10348) * (rhPrice * usdToAed) * .85)
        const value =
            ((((pt + pd + rh) - ((3.15 * gbpToAed) + (0.44 * gbpToAed) + 7.81)) - 30)) * weight / 1000
        return value.toFixed(3)
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate('Product', { data: { _id: item?._id } })
                }}
                activeOpacity={.5}
                style={[styles.container, { backgroundColor: theme.cardBg }]}>
                <View style={[styles.content]}>
                    <View style={{ width: '100%', }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: '50%', minHeight: ((width-20) * .5) * 3/4, justifyContent: 'center', alignItems: 'center' }}>
                                {item?.featuredImage ?
                                    <Image source={{ uri: `${api}/${item?.featuredImage}` }} style={{
                                        width: (width-20) * .5,
                                        height: ((width-20) * .5) * 3/4,
                                        borderRadius: 5,
                                    }} /> : <Image source={img} style={{
                                        width: (width-20) * .5,
                                        height: ((width-20) * .5) * 3/4,
                                        borderRadius: 5,
                                    }} />
                                }
                            </View>
                            <View style={{
                                padding: 5,
                                borderRadius: 10,
                                width: '50%',
                            }}>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                    <Text style={[styles.rowText, { color: '#069862', fontSize: 25 }]}>AED: {calculate(item?.weight, item?.pt, item?.pd, item?.rh, settings?.ptPrice, settings?.pdPrice, settings?.rhPrice, settings?.usdToAed, settings?.gbpToAed)}</Text>
                                    <Text style={[styles.rowText, { color: theme.text.secondary }]}>Code: {item?.name}</Text>
                                    <Text style={[styles.rowText, { color: theme.text.secondary }]}>serial: {item?.serial}</Text>
                                    <Text style={[styles.rowText, { color: theme.text.secondary }]}>Brand: {item?.brand}</Text>
                                    <Text style={[styles.rowText, { color: theme.text.secondary }]}>Weight: {item?.weight} g</Text>
                                </View>
                                <View style={{ flexDirection: 'row',marginTop:5 }}>
                                    {item?.pt != 0 &&
                                        <Text style={[styles.rowText, { color: '#fff', backgroundColor: '#FFD700', padding: 5, marginRight: 5, marginBottom: 5, borderRadius: 5 }]}>PT</Text>
                                    }
                                    {item?.pd != 0 &&
                                        <Text style={[styles.rowText, { color: '#fff', backgroundColor: '#FFD700', padding: 5, marginRight: 5, marginBottom: 5, borderRadius: 5 }]}>PD</Text>
                                    }
                                    {item?.rh != 0 &&
                                        <Text style={[styles.rowText, { color: '#fff', backgroundColor: '#FFD700', padding: 5, marginRight: 5, marginBottom: 5, borderRadius: 5 }]}>RH</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,

        borderRadius: 7,
        position: 'relative'

    },
    desc: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    content: {
        flexDirection: 'row'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    rowText: {
        fontSize: 16,
        fontWeight: '500',
        // marginVertical: 10,
        textAlign: 'left'

    },
    time: {
        fontSize: 16,
        fontWeight: '600',
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        // bottom: -10

    },
})

export default ProductCard;
