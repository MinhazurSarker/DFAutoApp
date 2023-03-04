import React from 'react';
import { View } from 'react-native';
// @ts-ignore
import ProductCard from './ProductCard';
const HomeProducts = ({ data, settings }) => {
    return (
        <View >
            {
                data?.map((item, i) => (
                    <ProductCard key={i} index={i} settings={settings} item={item} />
                ))
            }
        </View>
    );
}

export default HomeProducts;
