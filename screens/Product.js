import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, FlatList, ScrollView, RefreshControl, } from 'react-native';
import SecondHeader from '../components/SecondHeader';
import AppContext from '../contexts/appContext';
import UseApi from '../hooks/useApi';
import ImgItem from '../components/ImgItem';
import { useFocusEffect } from '@react-navigation/native';

const Product = (props) => {
    const { width } = Dimensions.get('window')
    // @ts-ignore
    const { theme, user } = useContext(AppContext);
    const id = props?.route?.params?.data?._id || ''
    const [data, setData] = useState({})
    const [img, setImg] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const { getProduct, deleteProduct } = UseApi()
    const fetch = async () => {
        setRefreshing(true)
        await getProduct(id).then((res => {
            setData(res.data)
            setImg(res.data?.product?.img)
            setRefreshing(false)
        })).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
            props.navigation.goBack()
        })
    }
    const deleteItem = () => {
        deleteProduct(id).then((res) => {
            if (res.data.msg) {
                Alert.alert('Message', 'Successful')
                props.navigation.goBack()
            } else {
                Alert.alert('Message', 'Failed')
            }

        }).catch((err) => {
            Alert.alert('Message', 'Something went wrong')
        })
    }
    useFocusEffect(
        React.useCallback(() => {
            fetch()
            return () => {
                setData({})
                setImg([])
            };
        }, [])
    );
    const calculate = (weight, ptValue, pdValue, rhValue, ptPrice, pdPrice, rhPrice, usdToAed, gbpToAed) => {
        const pt = ((ptValue / 1000 / 31.10348) * (ptPrice * usdToAed) * .98)
        const pd = ((pdValue / 1000 / 31.10348) * (pdPrice * usdToAed) * .98)
        const rh = ((rhValue / 1000 / 31.10348) * (rhPrice * usdToAed) * .85)
        const value =
            ((((pt + pd + rh) - ((3.15 * gbpToAed) + (0.44 * gbpToAed) + 7.81)) - 30)) * weight / 1000
        return value.toFixed(3)
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetch}
                />
            }
            contentContainerStyle={[styles.container, { backgroundColor: theme.appBg }]}>
            <SecondHeader title={data?.product?.name} />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <View style={{

                    width: width - 20
                }}>
                    <FlatList
                        contentContainerStyle={{

                        }}
                        showsHorizontalScrollIndicator={false}
                        getItemLayout={(data, index) => (
                            { length: (width - 300), offset: (width - 300) * index, index }
                        )}
                        pagingEnabled={true}
                        data={img}
                        renderItem={(item, index) => (<ImgItem item={item} />)}
                        horizontal={true}
                        snapToAlignment="start"
                        decelerationRate={'fast'}
                        snapToInterval={width - 20}
                    />
                </View>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: theme.text.secondary,
                borderWidth: 2,

                margin: 15,
                borderRadius: 10
            }}>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width - 30
                    }}
                >
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderRightWidth: 1,
                            padding: 5,

                            width: (width - 30) * .5,
                            alignItems: 'flex-start'
                        }}>
                        <Text style={styles.price}>Price</Text>
                    </View>
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderLeftWidth: 1,
                            padding: 5,
                            width: (width - 30) * .5,
                            alignItems: 'flex-start'

                        }}>
                        <Text style={styles.price}>AED: {calculate(data?.product?.weight, data?.product?.pt, data?.product?.pd, data?.product?.rh, data?.settings?.ptPrice, data?.settings?.pdPrice, data?.settings?.rhPrice, data?.settings?.usdToAed, data?.settings?.gbpToAed)}</Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width - 30,
                        borderTopWidth: 2,
                        borderColor: theme.text.secondary,
                    }}
                >
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderRightWidth: 1,
                            padding: 5,

                            width: (width - 30) * .5,
                            alignItems: 'flex-start'
                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>Code</Text>
                    </View>
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderLeftWidth: 1,
                            padding: 5,
                            width: (width - 30) * .5,
                            alignItems: 'flex-start'

                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>{data?.product?.name}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width - 30,
                        borderTopWidth: 2,
                        borderColor: theme.text.secondary,
                    }}
                >
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderRightWidth: 1,
                            padding: 5,

                            width: (width - 30) * .5,
                            alignItems: 'flex-start'
                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>Serial</Text>
                    </View>
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderLeftWidth: 1,
                            padding: 5,
                            width: (width - 30) * .5,
                            alignItems: 'flex-start'

                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>{data?.product?.serial}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width - 30,
                        borderTopWidth: 2,
                        borderColor: theme.text.secondary,
                    }}
                >
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderRightWidth: 1,
                            padding: 5,

                            width: (width - 30) * .5,
                            alignItems: 'flex-start'
                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>Weight</Text>
                    </View>
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderLeftWidth: 1,
                            padding: 5,
                            width: (width - 30) * .5,
                            alignItems: 'flex-start'

                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>{data?.product?.weight} g</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width - 30,
                        borderTopWidth: 2,
                        borderColor: theme.text.secondary,
                    }}
                >
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderRightWidth: 1,
                            padding: 5,

                            width: (width - 30) * .5,
                            alignItems: 'flex-start'
                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>Type</Text>
                    </View>
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderLeftWidth: 1,
                            padding: 5,
                            width: (width - 30) * .5,
                            alignItems: 'flex-start'

                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>{data?.product?.type}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width - 30,
                        borderTopWidth: 2,
                        borderColor: theme.text.secondary,
                    }}
                >
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderRightWidth: 1,
                            padding: 5,

                            width: (width - 30) * .5,
                            alignItems: 'flex-start'
                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>Brand</Text>
                    </View>
                    <View
                        style={{
                            borderColor: theme.text.secondary,
                            borderLeftWidth: 1,
                            padding: 5,
                            width: (width - 30) * .5,
                            alignItems: 'flex-start'

                        }}>
                        <Text style={[styles.text, { color: theme.text.primary }]}>{data?.product?.brand}</Text>
                    </View>
                </View>
            </View>
            {
                (user.role == 'admin' || user.role == 'editor') &&
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
                            width: width
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('EditProduct', { data: { _id: id } })
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
                            <Text style={styles.btn}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                deleteItem()
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
            }
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#069862',
    },
    btn: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: '600',

    },
    icon: {
        marginRight: 20,
    },
})

export default Product;
