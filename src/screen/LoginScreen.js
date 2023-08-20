import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import data from '../../app.json'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {

    const navigation = useNavigation()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false)
    const [token , setToken ] = useState('1234')

    useEffect(() => {
        console.log("data", data.signup)    
    },[])

    const handleLogin = async() => {
        setLoader(true)
        // Compare the entered credentials with the dummy data
        const userData = data.signup /* Load your JSON data here */;
        const user = userData.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            // Successful login logic
            console.log('Login successful');
            
              await AsyncStorage.setItem("token", token)
            
            Alert.alert("Success", "Login successful")
            navigation.navigate("Dashboard")
            
        } else {
            // Failed login logic
            Alert.alert("error", "Login failed")
            console.log('Login failed');
        }
        setLoader(false)
    };
    
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.textInputView}>

                <View style={styles.inputView}>
                    <TextInput onChangeText={(val) => { setEmail(val)}} placeholder='Email' placeholderTextColor={"black"} style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <TextInput onChangeText={(val)=> {setPassword(val)}} placeholder='Password' placeholderTextColor={"black"} style={styles.input} />
                </View>

                <TouchableOpacity onPress={() => { handleLogin() }} style={styles.buttonView}>
                    {loader ? 
                        <ActivityIndicator color={"white"} />
                        :
                   
                    <Text style={styles.text}>
                        Login
                        </Text>
                    }
                </TouchableOpacity>



            </View>
            <View style={styles.orview}>
                <Text style={styles.or}>
                    Or
                </Text>

                <Text onPress={()=> {navigation.navigate("SignupScreen")}} style={styles.alreadytext}>
                    Don't have account? <Text  style={{ color: "blue" }}>Signup</Text>
                </Text>

            </View>





        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    alreadytext: {
        color: 'black', fontSize: 14, fontWeight: '400'
    },
    orview: {
        width: '100%', justifyContent: "center", alignItems: 'center', marginTop: 20, gap: 20
    },
    or: {
        color: 'grey',
        fontSize: 17, fontWeight: 'bold',

    },
    text: {
        color: 'white',
        fontSize: 15
    },
    buttonView: {
        width: "100%",
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'blue', height: 51, borderRadius: 5
    },
    input: {
        width: '100%',
        height: 51,
        color: "black"
    },
    inputView: {
        width: '100%',
        height: 51,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 0.5
    },
    textInputView: {
        width: "100%",
        paddingHorizontal: 21,
        gap: 20
    },
    main: {
        backgroundColor: "white",
        flex: 1, justifyContent: "center", alignItems: 'center'

    }
})

export default LoginScreen