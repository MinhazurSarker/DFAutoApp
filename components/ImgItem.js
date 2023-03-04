import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { api } from '../constants/AppConstants';


const ImgItem = (props) => {
    const { width } = Dimensions.get('window')
    return (
        <View>
            <Image resizeMode="contain" source={{ uri: `${api}/${props.item.item}` }} style={{
                width: width - 30,
                height: (width - 30) * (3 / 4),
                borderRadius: 10,
                margin: 5,
            }} />
        </View>
    );
};


export default ImgItem;


