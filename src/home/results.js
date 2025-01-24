import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  // Destructure the score and total values passed via route parameters
  const { score, total } = route.params;

  // State for fade-in animation
  const [fadeAnim] = useState(new Animated.Value(0));
  // State for pulsing button animation
  const [pulseAnim] = useState(new Animated.Value(1));

  // Passing score is set to the total (user must get all answers correct to pass)
  const passingScore = total;

  // Array of messages for success and failure
  const messages = [
    'Great job! You passed!',
    'Awesome! You nailed it!',
    'Congratulations! You passed.',
    "You didn't pass. Please try again.",
    'Better luck next time! Keep trying!',
    'You can do it, try again.',
  ];

  // Display a random success or failure message based on the user's score
  const message = score === passingScore 
    ? messages[Math.floor(Math.random() * 3)] // Random success message
    : messages[3 + Math.floor(Math.random() * 2)]; // Random failure message

  // Dynamic color for the success or failure message
  const messageColor = score === passingScore ? '#2ecc71' : '#e74c3c';

  useEffect(() => {
    // Fade-in animation for the title and result text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Pulse animation loop for the button
    Animated.loop(
      Animated.sequence([
        Animated.spring(pulseAnim, {
          toValue: 1.1, // Button grows slightly
          friction: 4, // Controls spring bounciness
          useNativeDriver: true,
        }),
        Animated.spring(pulseAnim, {
          toValue: 1, // Button returns to original size
          friction: 4,
          useNativeDriver: true,
        }),
      ])
    ).start(); // Start the animation loop
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated success or failure message */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim, color: messageColor }]}>
        {message}
      </Animated.Text>

      {/* Display the user's score */}
      <Animated.Text style={[styles.result, { opacity: fadeAnim, color: '#fff' }]}>
        Your Score: {score} / {total}
      </Animated.Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: '#00796b' },
          { transform: [{ scale: pulseAnim }] }, // Apply pulsing animation
        ]}
        onPress={() => navigation.navigate('Start')}
      >
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003366',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 2,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    top: 20,
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    top: 70, 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResultScreen;
