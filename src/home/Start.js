import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const GameStartScreen = ({ navigation }) => { // Define the GameStartScreen component, receiving navigation as a prop
  const pulseAnimation = useRef(new Animated.Value(1)).current; // Create a reference for the pulse animation starting at scale 1

  useEffect(() => { // Hook to run the animation when the component loads
    const pulse = Animated.loop( // Create a looping animation
      Animated.sequence([ // Sequence of animations
        Animated.timing(pulseAnimation, { // Animate to scale up (1.1)
          toValue: 1.1, 
          duration: 500, // Takes 500ms
          useNativeDriver: true, // Optimize animation using the native driver
        }),
        Animated.timing(pulseAnimation, { // Animate to scale back down (1)
          toValue: 1,
          duration: 500, // Takes 500ms
          useNativeDriver: true, // Optimize animation using the native driver
        }),
      ])
    );

    pulse.start(); // Start the animation loop
  }, [pulseAnimation]); // Dependency ensures the animation starts on load

  return (
    <View style={styles.container}> 
      <Image
        source={require('../../assets/quiz.png')}
        style={styles.logo} // Apply logo styling
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')} // Navigate to the 'Quiz' screen on press
        style={styles.startButton} // Apply button styling
      >
        <Animated.Image
          source={require('../../assets/button.png')} // Display the start button image
          style={[styles.buttonImage, { transform: [{ scale: pulseAnimation }] }]} // Apply pulsing animation to the button
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
    alignItems: 'center', // Center content horizontally
  },
  logo: {
    width: 350, // Set logo width
    height: 200, // Set logo height
    marginBottom: 30, // Add space below the logo
  },
  startButton: {
    justifyContent: 'center', // Center button content vertically
    alignItems: 'center', // Center button content horizontally
  },
  buttonImage: {
    width: 130, // Set button image width
    height: 100, // Set button image height
  },
});

export default GameStartScreen; // Export the GameStartScreen component for use in other parts of the app
