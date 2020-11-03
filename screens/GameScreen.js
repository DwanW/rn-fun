import React, { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

import defaultStyle from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNum = Math.floor(Math.random() * (max - min)) + min;

    if (randomNum === exclude){
        return generateRandomBetween(min, max, exclude)
    } else {
        return randomNum;
    }
}

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <Text style={defaultStyle.bodyText}>#{numOfRound}</Text>
        <Text style={defaultStyle.bodyText}>{value}</Text>
    </View>
)

const GameScreen = ({userChoice, onGameOver}) => {
    const initialGuess = generateRandomBetween(1, 100, userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length)
        }
    }, [pastGuesses, userChoice, onGameOver ])

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
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNum);
        setPastGuesses([nextNum, ...pastGuesses])
    }
    return (
    <View style={styles.screen}>
        <Text style={defaultStyle.bodyText}>My Guess is </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <CustomButton onPress={() => nextGuessHandler('lower')}>
                <Ionicons name="md-remove" size={24} color="white" />
            </CustomButton>
            <CustomButton onPress={() => nextGuessHandler('greater')}>
                <Ionicons name="md-add" size={24} color="white" />
            </CustomButton>
        </Card>
        <View style={styles.list}>
            <ScrollView>
                {
                    pastGuesses.map((num, idx) => renderListItem(num, pastGuesses.length - idx))
                }
            </ScrollView>
        </View>
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
    },
    list: {
        width: '80%',
        flex: 1
    },
    listItem: {
        marginVertical: 10,
        backgroundColor: 'white',
        borderLeftColor: 'orange',
        borderLeftWidth: 3,
        flexDirection: 'row',
        paddingHorizontal: 20,
        width: '100%',
        justifyContent:'space-around'
    }
})

export default GameScreen