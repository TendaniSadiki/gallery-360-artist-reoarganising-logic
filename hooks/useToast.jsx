import { Alert, Platform, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React from 'react'
export const showToast = (message) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, 6000)
    }
}
const useToast = () => {
    return showToast
}
export default useToast