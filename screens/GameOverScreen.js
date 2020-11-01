import React from 'react';

import { View, Text, StyleSheet,  Button} from 'react-native';

const GameOverScreen = ({number, rounds, onRestart}) => {
    return (
        <View style={styles.screen}>
            <Text>Game is Over, Thanks for Playing</Text>
            <Text>Number of guesses: {rounds}</Text>
            <Text>Number was: {number}</Text>
            <Button title="Play Again" onPress={onRestart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GameOverScreen;