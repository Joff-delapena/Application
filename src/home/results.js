import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1)); 

  const passingScore = total;

  const messages = [
    'Great job! You passed!',
    'Awesome! You nailed it!',
    'Congratulations! You passed.',
    "You didn't pass. Please try again.",
    "Better luck next time! Keep trying!",
    "You can do it, try again."
  ];

  const message = score === passingScore 
    ? messages[Math.floor(Math.random() * 3)]
    : messages[3 + Math.floor(Math.random() * 2)];
  const messageColor = score === passingScore ? '#2ecc71' : '#e74c3c';

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    
    // Pulse animation loop
    Animated.loop(
      Animated.sequence([
        Animated.spring(pulseAnim, {
          toValue: 1.1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.spring(pulseAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        })
      ])
    ).start();  // Fixed the issue by starting the loop here
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim, color: messageColor }]}>
        {message}
      </Animated.Text>
      <Animated.Text style={[styles.result, { opacity: fadeAnim, color: '#fff' }]}>
        Your Score: {score} / {total}
      </Animated.Text>

      {/* Back to Menu Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#00796b' }, { transform: [{ scale: pulseAnim }] }] }
        onPress={() => navigation.navigate('Start')} // Replace 'Start' with your actual menu screen name
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
    bottom: 40,
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
