import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tabBarContainer: {
        width: '100%',
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#162C1B'
    },
    tabBarButton: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 4,
    },
    tabBarText: {
        textTransform: 'uppercase',
        fontSize: 14,
        color: '#DAE4DC'
    },
    tabBarIcon: {
        width: 16,
        height: 16
    },
    tabBarButtonActive: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    }
})

export default styles
