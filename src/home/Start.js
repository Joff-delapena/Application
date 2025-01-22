import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const GameStartScreen = ({ navigation }) => {
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1, 
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
  }, [pulseAnimation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/quiz.png')}
        style={styles.logo}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')}
        style={styles.startButton}
      >
        <Animated.Image
          source={require('../../assets/button.png')}
          style={[styles.buttonImage, { transform: [{ scale: pulseAnimation }] }]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366', 
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
  },
  logo: {
    width: 350, 
    height: 200,
    marginBottom: 30,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 130, 
    height: 100, 
  },
});

export default GameStartScreen;
