import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import data from '../../app.json'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SignupScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [token, setToken] = useState('1234')

    const handleSignp = async() => {
        setLoader(true)
        const newUser = {
            email: email,
            password: password
        }

       const user = data.signup.push(newUser)
        if (user) {
            console.log("signup Successfully");
            Alert.alert("success", "Signup Successfully")
            
            await AsyncStorage.setItem("token", token)

            navigation.navigate("Dashboard")
        }
        else {
            Alert.alert("error", "Signup Error")
            console.log("error", "Signup Error")
        }
        setLoader(false)

    }
  return (
      <SafeAreaView style={styles.main}>
          <View style={styles.textInputView}>
              
              <View style={styles.inputView}>
                    <TextInput onChangeText={(val)=> {setEmail(val)}} placeholder='Email' placeholderTextColor={"black"} style={styles.input} />
              </View>

              <View style={styles.inputView}>
                  <TextInput onChangeText={(val)=> {setPassword(val)}} placeholder='Password' placeholderTextColor={"black"} style={styles.input} />
              </View>

              <TouchableOpacity onPress={() => { handleSignp() }} style={styles.buttonView}>
                  {loader ? <ActivityIndicator color={"white"} />
                      :
                  <Text style={styles.text}>
                      Signup
                  </Text>
} 
              </TouchableOpacity>

              
              
          </View>
          <View style={styles.orview}>
              <Text style={styles.or}>
                  Or
              </Text>

              <Text onPress={()=> {navigation.navigate("LoginScreen")}} style={styles.alreadytext}>
                  Already Signup? <Text style={{color:"blue"}}>Login</Text> 
              </Text>
              
          </View>


          
          
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    alreadytext: {
        color:'black', fontSize:14, fontWeight:'400'
    }, 
    orview: {
        width:'100%', justifyContent:"center", alignItems:'center', marginTop:20, gap:20
    },
    or: {
        color: 'grey', 
        fontSize: 17, fontWeight: 'bold',
        
    },
    text: {
        color: 'white', 
        fontSize:15
    },
    buttonView: {
        width: "100%", 
        justifyContent: 'center', alignItems: 'center', 
        backgroundColor:'blue', height:51, borderRadius:5
    }, 
    input: {
        width: '100%', 
        height: 51, 
        color:"black"
    },
    inputView: {
        width: '100%',
        height: 51, 
        borderRadius: 5, 
        borderColor: "black", 
        borderWidth:0.5
    },
    textInputView: {
        width: "100%", 
        paddingHorizontal: 21, 
        gap:20
    },
    main: {
        backgroundColor: "white", 
        flex: 1, justifyContent:"center", alignItems:'center'
        
    }
})

export default SignupScreen