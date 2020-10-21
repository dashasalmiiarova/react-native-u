import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'


import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const CheckBox = ({ selected, onPress, style, textStyle, size = 30, color = '#211f30', text = '', ...props}) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
        <Icon
            size={size}
            color='#646D82'
            name={ selected ? 'check-box' : 'check-box-outline-blank'}
        />

        <Text style={textStyle, styles.text}> {text} </Text>
    </TouchableOpacity>
)

export default CheckBox

const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 50,
    },
    text: {
        color: '#43425D',
        marginLeft: 20
    }
})