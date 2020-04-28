import React, { useEffect } from 'react'
import { View } from 'react-native'
import ContactList from './app/components/ContactList'
import * as Permissions from 'expo-permissions'

const App = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS)
      if (status !== 'granted') {
        alert('App needs contact permissions to work!')
      }
    })()
  })
  return (
    <View>
      <ContactList />
    </View>
  )
}

export default App
