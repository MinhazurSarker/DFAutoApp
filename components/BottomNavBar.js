import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { AntDesign, Entypo, FontAwesome, Foundation, Ionicons } from '@expo/vector-icons';
import AppContext from '../contexts/appContext';
import BottomNavBg from './BottomNavBg';
// @ts-ignore
import SVG from '../assets/askingNextAction.svg'
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
    // @ts-ignoreH
    const { theme,token } = useContext(AppContext)
    const navigation = useNavigation();


    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <View style={[styles.main]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                }}
            >
                <View style={[styles.modal, { backgroundColor: theme.appBg }]}>
                    <TouchableOpacity onPress={() => { setModalIsOpen(false) }} style={[{ position: 'absolute', top: 25, right: 25 }]} >
                        <FontAwesome name="close" size={30} color={theme.text.primary} />
                    </TouchableOpacity>
                    <SVG style={styles.modalSvg} height={120} />
                    <Text style={[styles.modalText, { color: theme.text.primary }]}>আপনি কি করতে চাচ্ছেন ?</Text>
                    <View style={[styles.modalCard, { backgroundColor: theme.cardBg }]}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                setModalIsOpen(false);
                                // @ts-ignore
                                navigation.navigate('NewPost');

                            }}
                            style={[styles.modalBtn, { borderColor: theme.appBg }]}
                        >
                            <View style={[styles.modalBtnIcon, { backgroundColor: theme.primary }]}>
                                <Entypo name="plus" size={30} color='white' />
                            </View>
                            <Text style={[styles.modalBtnTxt, { color: theme.text.primary }]}>শিক্ষক/শিক্ষিকা চেয়ে পোস্ট করুন</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                setModalIsOpen(false);
                                // @ts-ignore
                                navigation.navigate('Upgrade');

                            }}
                            style={[styles.modalBtn, { borderColor: theme.appBg }]}
                        >
                            <View style={[styles.modalBtnIcon, { backgroundColor: theme.primary }]}>
                                <Ionicons name="school-sharp" size={25} color='white' />
                            </View>
                            <Text style={[styles.modalBtnTxt, { color: theme.text.primary }]}>টিউটর হিসেবে রেজিস্ট্রেশন করুন </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(
                        // @ts-ignore
                        'Home')}
                    activeOpacity={.8}
                    style={[styles.normalBtn,]}>
                    <Foundation name="home" size={30} color={theme.text.secondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {token!==null?
                        setModalIsOpen(true):
                        // @ts-ignore
                        navigation.navigate( 'Login',{})
                    }}
                    activeOpacity={.8}
                    style={[styles.plusBtn, { backgroundColor: theme.primary }]}>
                    <Entypo name="plus" size={30} color='white' />
                </TouchableOpacity>
                <TouchableOpacity
                           onPress={() => {token!==null?
                            // @ts-ignore
                            navigation.navigate( 'Inbox',{}):
                            // @ts-ignore
                            navigation.navigate( 'Login',{})
                        }}
                    activeOpacity={.8}
                    style={[styles.normalBtn,]}>
                    <Ionicons name='ios-chatbox' size={27} color={theme.text.secondary} />
                </TouchableOpacity>

            </View>
            <BottomNavBg fill={theme.cardBg} shadow={theme.navBarShadow} style={[styles.svg, {}]} />

        </View>

    );
}

const styles = StyleSheet.create({

    main: {
        height: '100%',
        width: '100%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative'
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
    svg: {
        top: -15,
        height: 100,
        width: '100%',
        position: 'absolute',
        zIndex: 1,


    },
    modal: {
        paddingVertical: 50,
        alignItems: 'center',
        flexGrow: 1,
        position: 'relative',
    },
    modalSvg: {
        marginTop: 120,

    },
    modalText: {
        marginTop: 50,
        fontSize: 25,
        fontWeight: '500',

    },
    modalCard: {
        marginTop: 50,
        width: '90%',
        paddingVertical: 30,
        height: 270,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalBtn: {
        width: '90%',
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    modalBtnIcon: {
        height: '75%',
        width: undefined,
        aspectRatio: 1 / 1,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBtnTxt: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '500',

    },
})

export default BottomNavBar;
