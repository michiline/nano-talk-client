import React from 'react'
import * as firebase from 'firebase'
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

const firebaseConfig = {
  apiKey: 'AIzaSyCWTkjuWiL4BlgUVjVKJ1axAmpIH1f3ViY',
  authDomain: 'nano-talk-a1438.firebaseapp.com',
  databaseURL: 'https://nano-talk-a1438.firebaseio.com',
  projectId: 'nano-talk-a1438',
  storageBucket: 'nano-talk-a1438.appspot.com',
  messagingSenderId: '638790318520',
  appId: '1:638790318520:web:f1cf605bd4467a9ae7f74d',
  measurementId: 'G-0B83KM99RB'
}

export const initFirebase = () => {
  firebase.initializeApp(firebaseConfig)
}

export const firebasePhoneVerification = () => {
  const recaptchaVerifier = React.useRef(null)
  const [phoneNumber, setPhoneNumber] = React.useState()
  const [verificationId, setVerificationId] = React.useState()
  const [verificationCode, setVerificationCode] = React.useState()
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: 'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.' }
    : undefined)

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder='+1 999 999 9999'
        autoFocus
        autoCompleteType='tel'
        keyboardType='phone-pad'
        textContentType='telephoneNumber'
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <Button
        title='Send Verification Code'
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider()
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            )
            setVerificationId(verificationId)
            showMessage({
              text: 'Verification code has been sent to your phone.'
            })
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' })
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder='123456'
        onChangeText={setVerificationCode}
      />
      <Button
        title='Confirm Verification Code'
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            )
            await firebase.auth().signInWithCredential(credential)
            showMessage({ text: 'Phone authentication successful 👍' })
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' })
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: 'center' }]}
          onPress={() => showMessage(undefined)}>
          <Text style={{ color: message.color || 'blue', fontSize: 17, textAlign: 'center', margin: 20 }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  )
}
