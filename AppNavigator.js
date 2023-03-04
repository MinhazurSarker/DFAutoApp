import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';


//--------Pages
import Home from './screens/Home'

import Settings from './screens/Settings'
import NewProduct from './screens/NewProduct'
import Product from './screens/Product';
import EditProduct from './screens/EditProduct';
import NewUser from './screens/NewUser';
import Users from './screens/Users';
import EditUser from './screens/EditUser';
import Products from './screens/Products';
const AppNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="Product" component={Product} />

            <Stack.Screen name="Users" component={Users} />
            <Stack.Screen name="NewUser" component={NewUser} />
            <Stack.Screen name="EditUser" component={EditUser} />
            <Stack.Screen name="NewProduct" component={NewProduct} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
        </Stack.Navigator>
    );
}
export default AppNavigator;

