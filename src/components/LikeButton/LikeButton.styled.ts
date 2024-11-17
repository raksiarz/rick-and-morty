import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 82,
        height: 34,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#224229',
        backgroundColor: '#DAE4DC'
    },
    text: {
        fontSize: 14,
        textTransform: "uppercase",
        color: '#224229'
    },
    buttonInDetails: {
        width: '100%',
        height:34,
        borderRadius: 100,
        backgroundColor: '#224229',
        paddingVertical: 8,
        paddingRight: 16,
        paddingLeft: 12,
    },
    textInDetails: {
        color: '#fff',
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 5,
    }
})
