import React, {useEffect,useState,useRef} from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';




export default function SignupScreen({ navigation }) {

    const [UserEmail, setUserEmail] = useState('');

    const [UserName, setUserName] = useState('');

    const [UserPassword, setUserPassword] = useState('');

    const [confirmUserPassword, setConfirmUserPassword] = useState('');

    const [disabled, setDisabled] = useState(false);

    const onSignUpPressed = () => {

        setDisabled(true);

        fetch('http://3.217.241.125/FYP_api/signup.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                useremail: UserEmail,
                username: UserName,
                userpassword: UserPassword,
                confirmpassword: confirmUserPassword
            })
        })
            .then((response) => response.json())
            .then((res) => {
                Alert.alert(
                    'Alert',
                    res.message,
                    [
                        { text: 'OK', onPress: () => setDisabled(false) },
                    ],
                    { cancelable: false },
                );
            })
            .catch((error) => {
                console.log("error fetching data")
                console.log(error)
                console.log(error.message) // Server can't be reached!
                Alert.alert(
                    'Alert',
                    "Connection Error",
                    [
                        { text: 'OK', onPress: () => setDisabled(false) },
                    ],
                    { cancelable: false },
                );
            });



    }

    const onHaveAnAcount = () => {
        navigation.navigate('Account')
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 30, }}>
                <Text style={styles.title}>Create an Account</Text>


                <TextInput
                    style={styles.input}
                    value={UserEmail}
                    onChangeText={text => setUserEmail(text)}
                    placeholder="Email Address"
                />


                <TextInput
                    style={styles.input}
                    value={UserName}
                    onChangeText={text => setUserName(text)}
                    placeholder="Username"
                />



                <TextInput
                    style={styles.input}
                    value={UserPassword}
                    onChangeText={text => setUserPassword(text)}
                    placeholder="Password"
                    secureTextEntry={true}
                />


                <TextInput
                    style={styles.input}
                    value={confirmUserPassword}
                    onChangeText={text => setConfirmUserPassword(text)}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    disabled={disabled}
                    onPress={onSignUpPressed}
                    style={styles.container}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>

                <Pressable
                    onPress={onHaveAnAcount}>
                    <Text style={{ color: 'grey', marginVertical: 5, }}>
                        Already have an Account? Sign In</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#82c844',
        margin: 10,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        padding: 10,
        marginVertical: 5,
    },
    container: {
        backgroundColor: 'seagreen',
        width: '80%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,

    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },


});