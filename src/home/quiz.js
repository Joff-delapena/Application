import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const QuizScreen = ({ navigation, route }) => {
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const questions = [
    { id: 1, question: 'What is 5 + 3?', options: ['5', '8', '10', '15'], correctAnswer: '8' },
    { id: 2, question: 'What is 9 * 6?', options: ['42', '54', '56', '60'], correctAnswer: '54' },
    { id: 3, question: 'What is 12 - 7?', options: ['5', '7', '4', '3'], correctAnswer: '5' },
    { id: 4, question: 'What is the boiling point of water?', options: ['100°C', '90°C', '110°C', '120°C'], correctAnswer: '100°C' },
    { id: 5, question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus', 'Mercury'], correctAnswer: 'Mars' },
    { id: 6, question: 'What is the chemical symbol for water?', options: ['H2O', 'O2', 'CO2', 'N2'], correctAnswer: 'H2O' },
    { id: 7, question: 'Who wrote "Romeo and Juliet"?', options: ['Shakespeare', 'Trisha Boneo', 'Hemingway', 'Tolstoy'], correctAnswer: 'Shakespeare' },
    { id: 8, question: 'Who was the first president of the United States?', options: ['Abraham Lincoln', 'George Washington', 'Carl Daguinotas', 'John Adams'], correctAnswer: 'George Washington' },
    { id: 9, question: 'In which year did World War I begin?', options: ['1912', '1914', '1920', '1930'], correctAnswer: '1914' },
  ];

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnsweredQuestions((prevAnsweredQuestions) => prevAnsweredQuestions + 1);

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedOption,
    }));

    setShowFeedback(selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!');

    setTimeout(() => {
      setShowFeedback('');
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setIsQuizCompleted(true);
      }
    }, 1000);
  };

  const handleDone = () => {
    if (isQuizCompleted) {
      navigation.navigate('Result', { score, total: questions.length });
    }
  };

  const handleBack = () => {
    navigation.navigate('Start');
  };

  useEffect(() => {
    if (isQuizCompleted) {
      handleDone();
    }
  }, [isQuizCompleted]);

  useEffect(() => {
    return () => {
      setAnswers({});
      setScore(0);
      setCurrentQuestionIndex(0);
      setAnsweredQuestions(0);
      setIsQuizCompleted(false);
    };
  }, [route]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <MaterialIcons name="close" size={25} color="white" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.questionCard}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, answers[currentQuestion.id] === option && { backgroundColor: '#1e3b58' }]} // Darker blue for selected
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {showFeedback && <Text style={styles.feedback}>{showFeedback}</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
    backgroundColor: '#003366', // Dark blue background
    bottom: 40,
  },
  scrollView: {
    flexGrow: 1,
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent for readability
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    top: 80
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  option: {
    backgroundColor: '#1e3b58',
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 3,
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  feedback: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: 'green',
    top: 60
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    top: 20,
    right: 150,
    alignSelf: 'center',
  },
});

export default QuizScreen;
