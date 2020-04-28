import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import * as Contacts from 'expo-contacts'

const ContactList = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers]
        })
        if (data.length > 0) {
          const contact = data[0]
          console.log(contact)
        }
      }
    })()
  }, [])
  return (
    <View>
      <Text>ContactList</Text>
    </View>
  )
}

export default ContactList
