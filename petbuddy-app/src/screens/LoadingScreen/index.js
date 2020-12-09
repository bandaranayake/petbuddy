import React, { useState, useEffect } from 'react'
import { Animated, View, StyleSheet } from 'react-native'

function LoadingScreen() {
    const [startValue, setStartValue] = useState(new Animated.Value(1));
    const [endValue, setEndValue] = useState(1.2);
    const [duration, setDuration] = useState(1000);

    function doAnimation() {
        Animated.sequence([
            Animated.timing(startValue, {
                toValue: endValue,
                duration: duration,
                useNativeDriver: true,
            })
        ]).start(() => {
            setEndValue((endValue === 1) ? 1.2 : 1);
        });
    }

    useEffect(() => {
        doAnimation();
    }, [endValue])

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/logo.png')}
                style={[
                    styles.square,
                    {
                        transform: [
                            {
                                scale: startValue,
                            },
                        ],
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        height: 150,
        width: 150,
    },
});

export default LoadingScreen;