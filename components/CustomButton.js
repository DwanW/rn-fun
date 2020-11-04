import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import colors from '../constants/colors';

const CustomButton = ({children, onPress}) => {
    let ButtonComp = TouchableOpacity

    if(Platform.OS === 'android' && Platform.Version >= 21){
        ButtonComp = TouchableNativeFeedback
    }

    return(
        <ButtonComp onPress={onPress} activeOpacity={0.7}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{children}</Text></View>
        </ButtonComp>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default CustomButton;