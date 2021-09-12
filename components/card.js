import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const back = require('../assets/back.png');
const Card = ({
  item,
  cardPressed,
  matchedText
}) => (
  <TouchableOpacity
    onPress={() => cardPressed(item)}
    style={styles.cardContainer}>
    {item.isMatched ? (
      <View style={styles.matchedCard}>
        <Text style={styles.matchedText}>{matchedText}</Text>
      </View>
    ) : item.isOpen ? (
      <View style={styles.characterView}>
        <Text style={styles.characterText}>{item.char}</Text>
      </View>
    ) : (
      <Image source={back} style={styles.cardImage} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardContainer: {
    flexWrap: 'wrap',
    width: width * 0.2,
    borderWidth: 1,
    borderRadius: 10,
    height: height * 0.15,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
  },
  matchedCard: {
    backgroundColor: '#9E015C',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  matchedText: {alignSelf: 'center', fontSize: 14, color: 'white'},
  characterView: {
    backgroundColor: '#F7931C',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  characterText: {alignSelf: 'center', fontSize: 60, color: 'white'},
  cardImage: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});

export default Card;
