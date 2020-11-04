import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';
import defaultStyle from '../constants/default-styles';

const GameOverScreen = ({ number, rounds, onRestart }) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={require('../assets/success.png')}
                        style={styles.image}
                    >
                        <Text style={{ ...defaultStyle.titleText, ...styles.titleText }}>Game is Over</Text>
                        <Text style={{ ...defaultStyle.titleText, ...styles.titleText }}>Thank you for Playing</Text>
                    </ImageBackground>
                </View>
                <Text style={defaultStyle.bodyText}>Number of guesses: <Text style={{ ...defaultStyle.titleText, ...styles.highLight }}>{rounds}</Text></Text>
                <Text style={defaultStyle.bodyText}>Number was: <Text style={{ ...defaultStyle.titleText, ...styles.highLight }}>{number}</Text></Text>
                <View style={styles.buttonContainer}>
                    <CustomButton onPress={onRestart}>
                        Play Again
                </CustomButton>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.6,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    titleText: {
        textAlign: "center",
        color: 'white',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 22
    },
    image: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
    highLight: {
        color: colors.primary,
        fontSize: 30
    },
    buttonContainer: {
        marginVertical: 20
    }
})

export default GameOverScreen;