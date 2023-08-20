import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'


const SplashScreen = () => {
    
    const navigation = useNavigation()

    useEffect(() => {
      
        setTimeout(() => {
            setTimeout( async()=> {
                const abc = await AsyncStorage.getItem('token')
                console.log("token ", abc)
                if (!abc) {
                        navigation.navigate('LoginScreen');
                    } else {
                        navigation.navigate('Dashboard');
                    }
                
            }, 1000);  
        })

    }, [])
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.splash}>SplashScreen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    splash: {
        color: 'black', 
        fontSize:24, fontWeight:'bold'
    },
    main: {
        flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'
    }
})

export default SplashScreen