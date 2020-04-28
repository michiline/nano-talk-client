import { PermissionsAndroid } from 'react-native'

const permissions = {
  contacts: 'READ_CONTACTS',
  camera: 'CAMERA'
}



// export const requestPermission = async (name) => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS[permissions[name]],
//       {
//         title: 'Nano Talk Permission',
//         message: `Nano Talk App needs access to your ${name}.`,
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK'
//       }
//     )
//     return granted === PermissionsAndroid.RESULTS.GRANTED
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }
//
// export const checkPermission = async (name) => {
//   try {
//     const granted = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS[permissions[name]]
//     )
//     console.log(granted)
//     return granted
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }
