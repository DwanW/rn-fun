import React from 'react';

import { View, Text, StyleSheet, Platform } from 'react-native';

import colors from '../constants/colors';

const Header = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        backgroundColor: Platform.OS === 'android'? 'white': colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
        fontFamily: 'open-sans-bold'
    }
})

export default Header;