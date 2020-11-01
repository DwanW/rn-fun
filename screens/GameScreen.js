import React, { useState, useRef, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Keyboard, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card';;

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(min, max)
    const randomNum = Math.floor(Math.random() * (max - min)) + min;

    if (randomNum === exclude){
        return generateRandomBetween(min, max, exclude)
    } else {
        return randomNum;
    }
}

const GameScreen = ({userChoice, onGameOver}) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 99, userChoice))
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(rounds)
        }
    }, [currentGuess,userChoice, onGameOver ])

    const nextGuessHandler = (direction) => {
        if(direction === 'lower' && currentGuess < userChoice || ( direction === 'greater' && currentGuess > userChoice)){
            Alert.alert(
                'I eat hotpot everyday and I am sick of it',
                "I'm sure you are as well",
                [{text: "Try again", style: 'cancel'}]
                )
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess

        } else {
            currentLow.current = currentGuess
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNum);
        setRounds(rounds + 1)
    }
    return (
    <View style={styles.screen}>
        <Text>My Guess is </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <Button title="LOWER" onPress={() => nextGuessHandler('lower')} />
            <Button title="Higher" onPress={() => nextGuessHandler('higher')} />
        </Card>
    </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen