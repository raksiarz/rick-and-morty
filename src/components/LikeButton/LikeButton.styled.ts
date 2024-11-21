import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 82,
        height: 34,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#224229',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 14,
        textTransform: "uppercase",
        color: '#224229'
    },
    buttonInDetails: {
        position: 'relative',
        top: 0,
        right: 0,
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
    },
    likedButton: {
        backgroundColor: '#DAE4DC'
    }
})
