import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'

const App = () => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
      <Navigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white', 
    flex:1
  }
})

export default App