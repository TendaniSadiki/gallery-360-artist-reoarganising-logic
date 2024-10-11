import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

const ActionButton = ({ isLoading, handleOnPress, text, style }) => {
    return (
        <TouchableOpacity
            style={[ styles.button, style ]}
            onPress={!isLoading && handleOnPress}
            disabled={isLoading}
        >
            {
                isLoading
                    ? <ActivityIndicator color={'white'} size={'large'} />
                    : <Text style={styles.buttonText}>{text}</Text>
            }
        </TouchableOpacity>
    )
}

export default ActionButton

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#CEB89E", // Set this to your desired button background color
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff", // Set this to your desired button text color
        fontSize: 18,
        fontWeight: "bold",
    },
    
})
