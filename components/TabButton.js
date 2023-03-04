import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
const TabButton = ({handleMenu,screen, title, icon,family }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            handleMenu()
            // @ts-ignore
            navigation.navigate(screen)
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 5,
                marginTop: 5
            }}> 
            {
                family=='ad'?<AntDesign name={icon} size={20} color={"white"} /> :
                family=='ii'?<Ionicons name={icon} size={20} color={"white"} /> :
                family=='mi'?<MaterialIcons name={icon} size={20} color={"white"} /> :
                family=='fi'?<Feather name={icon} size={20} color={"white"} /> :
                family=='fa'?<FontAwesome name={icon} size={20} color={"white"} />:
                family=='fa5'?<FontAwesome name={icon} size={20} color={"white"} />:<></>
            }
                
                <Text style={{
                    fontSize: 18,
                    fontWeight: '500',
                    paddingLeft: 15,
                    color: "white"
                }}>{title}</Text>

            </View>
        </TouchableOpacity>
    );
}
export default TabButton;