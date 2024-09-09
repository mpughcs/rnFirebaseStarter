import { StyleSheet, Text } from "react-native"
import { Colors } from "./constants/Colors"

export function Heading1({ children, color = Colors.lightest, numberOfLines, style}) {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.header1, { color }, style]}>{children}</Text>
    )
}
export function Heading2({ children, color = Colors.lightest, numberOfLines, style}) {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.header2, { color }, style]}>{children}</Text>
    )
}
export function Heading3({ children, color = Colors.lightest, numberOfLines, style}) {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.header3, { color }, style]}>{children}</Text>
    )
}
export function Body1({ children, color = Colors.lightest, numberOfLines, style}) {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.body1, { color }, style]}>{children}</Text>
    )
}
export function Body2({ children, color = Colors.lightest, numberOfLines, style}) {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.body2, { color }, style]}>{children}</Text>
    )
}



const styles = StyleSheet.create({
    header1: {
        fontFamily: 'Monserrat-Bold',
        fontSize: 24,
        fontWeight: 'bold',
    },
    header2: {
        fontFamily: 'Monserrat-Bold',
        fontSize: 20,
        fontWeight: 'bold',
    },
    header3: {
        fontFamily: 'Monserrat-SemiBold',
        fontSize: 16,
        fontWeight: 'bold',
    },
    body1: {
        fontFamily: 'Monserrat-Regular',
        fontSize: 16,
    },
    body2: {
        fontFamily: 'Monserrat-Regular',
        fontSize: 14,
    }
})



