import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Tips from "@/constants/tips";

const Home = () => {
  const [randomTip, setRandomTip] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * Tips.length);
    setRandomTip(Tips[randomIndex]);
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Our App!</Text>
      
      {randomTip && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>{randomTip.text}</Text>
        </View>
      )}

      <Text style={styles.homeText}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  tipContainer: {
    backgroundColor: '#89CFF0',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  tipText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  homeText: {
    fontSize: 16,
    color: '#888',
  },
});

export default Home;