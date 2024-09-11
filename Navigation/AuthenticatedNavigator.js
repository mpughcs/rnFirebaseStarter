import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home'
import { Colors } from '../constants/Colors'
const Stack = createNativeStackNavigator()
export default function AuthenticatedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={
        {
          headerShown: false,
          contentStyle: {
            backgroundColor: 'black'
            
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Monserrat',
            fontSize: 20,

          
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }
      }/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})