import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import CustomButton from '../components/CustomButton';

import colors from '../constants/colors';
import defaultStyle from '../constants/default-styles';

const StartGameScreen = ({onStartGame}) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(undefined)

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber >99){
            Alert.alert(
                'Invalid number!',
                'Please Enter Number between 1-99',
                [{text: 'Okay', style:'destructive', oonPress: resetInputHandler}])
            return;
        }
        setConfirmed(true)
        setEnteredValue('')
        setSelectedNumber(chosenNumber)
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed){{
        confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <Text style={defaultStyle.bodyText}>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <CustomButton onPress={() => onStartGame(selectedNumber)}>
                START GAME
            </CustomButton>
        </Card>
        )
    }}

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={{...defaultStyle.titleText, ...styles.title}}>Let's get started</Text>
                <Card style={styles.inputContainer}>
                    <Text style={defaultStyle.bodyText}>Select a Integer</Text>
                    <Input
                        style={styles.input}
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        maxLength={2}
                        blurOnSubmit
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="RESET" onPress={resetInputHandler} color={colors.secondary} /></View>
                        <View style={styles.button}><Button title="CONFIRM" onPress={confirmInputHandler} color={colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;