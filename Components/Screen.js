import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Screen({ children, style }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.screen, {
            paddingTop: insets.top,
        }, style]}>
            {children}
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        // marginBottom: 20,
        paddingHorizontal: 8,
        flex: 1,
        justifyContent: 'center',
        // gap: 20,
    },
});