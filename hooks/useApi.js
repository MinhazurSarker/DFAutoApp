import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import AppContext from '../contexts/appContext';
import { api } from '../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';



const UseApi = () => {
    // @ts-ignore
    const { token, setUser, setToken } = useContext(AppContext)

    const login = async (email, password) => {

        var data = JSON.stringify({
            "email": email,
            "password": password,
        });
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}/api/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
            .then(async function (res) {
                try {
                    await AsyncStorage.setItem('@userData', JSON.stringify(res.data.user));
                    await AsyncStorage.setItem('@authToken', res.data.token);
                    setUser(res.data.user);
                    setToken(res.data.token)
                } catch (e) {
                    Alert.alert('OOps...', 'Something went wrong.')
                }
            })
            .catch(function (error) {
                console.log(error)
                Alert.alert('Message', 'Invalid email or password')

            }).finally(() => {

            })
    }
    const getIndex = async () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api}/api/home`,
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        };
        return axios(config)
    }
    const getSettings = async () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api}/api/settings`,
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        };
        return axios(config)
    }
    const updateSettings = async (ptPrice, pdPrice, rhPrice, usdToAed, gbpToAed,) => {
        var data = JSON.stringify({
            "ptPrice": ptPrice,
            "pdPrice": pdPrice,
            "rhPrice": rhPrice,
            "usdToAed": usdToAed,
            "gbpToAed": gbpToAed
        });
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}/api/settings`,
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            data: data
        };
        return axios(config)
    }
    const getUsers = async () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api}/api/users`,
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        };
        return axios(config)
    }
    const createUser = async (email, password, name, role) => {
        var data = JSON.stringify({
            "name": name,
            "email": email,
            "role": role,
            "password": password
        });
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}/api/users`,
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            data: data
        };
        return axios(config)
    }
    const getUser = async (id) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api}/api/user/${id}`,
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        };
        return axios(config)
    }
    const updateUser = async (id, name, email, password, role) => {
        if (password !== '') {
            const data = JSON.stringify({
                "name": name,
                "email": email,
                "role": role,
                "password": password
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${api}/api/user/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                },
                data: data
            };
            return axios(config)
        } else {
            const data = JSON.stringify({
                "name": name,
                "email": email,
                "role": role,
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${api}/api/user/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                },
                data: data
            };
            return axios(config)
        }
    }
    const deleteUser = async (id) => {
        var config = {
            method: 'delete',
            url: `${api}/api/user/${id}`,
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        };
        return axios(config)
    }
    const createProduct = async (data) => {
        var config = {
            method: 'post',
            maxBodyLength: 9999999999999,
            url: `${api}/api/products`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                token: token
            },
            data: data
        };
        return axios(config)
    }
    const getProducts = async (page, search) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api}/api/products?page=${page || 1}&search=${search || ''}`,
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        };
        return axios(config)
    }
    const getProduct = async (id) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api}/api/product/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        };
        return axios(config)
    }
    const updateProduct = async (id, data) => {
        var config = {
            method: 'post',
            maxBodyLength: 9999999999999,
            url: `${api}/api/product/${id}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                token: token
            },
            data: data
        };
        return axios(config)
    }
    const deleteProduct = async (id) => {
        var config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${api}/api/product/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        };
        return axios(config)
    }

    return {
        login,
        getIndex,
        getUser,
        getUsers,
        updateUser,
        createUser,
        deleteUser,
        createProduct,
        getProducts,
        getProduct,
        updateProduct,
        deleteProduct,
        getSettings,
        updateSettings,
    }
}

export default UseApi;


