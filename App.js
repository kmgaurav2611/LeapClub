import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import CounterBlock from './components/counterBlock';
import CustomButton from './components/customButton';
import Card from './components/card';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [cardData, setCardData] = useState([]);
  const [allMatched, setAllMatched] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    if (allMatched) {
      generateRandomArray();
      setAllMatched(false);
      setTurns(0);
      setMatches(0);
    }
  }, [allMatched]);

  useEffect(() => {
    const openCards = cardData.filter(item => item.isOpen && !item.isMatched);
    const areAllMatched = cardData.filter(item => item.isMatched).length === cardData.length;
    if (areAllMatched) setAllMatched(true);
    if (openCards.length % 2 == 0 && openCards.length > 0) {
      if (openCards?.[0]?.char != openCards?.[1]?.char) {
        resetCards();
      } else {
        setShownCards(openCards);
      }
    }
  }, [cardData]);

  const resetCards = () => {
    const changedArr = cardData.map(card => {
      card.isOpen = false;
      return card;
    });
    setTimeout(() => {
      setCardData(changedArr);
      setTurns(turns + 1);
    }, 2000);
  };

  const setShownCards = openCards => {
    const changedArr = cardData.map((card, index) => {
      openCards.map(openCard => {
        if (openCard.id === index) {
          card.isMatched = true;
          card.isOpen = false;
        }
      });
      return card;
    });
    setTimeout(() => {
      setMatches(matches + 1);
      setTurns(turns + 1);
      setCardData(changedArr);
    }, 2000);
  };

  const generateRandomArray = () => {
    let arr = [];
    for (let i = 0; i < 16; i++) {
      let obj = {id: i, isOpen: false, isMatched: false};
      let isAvailable = false;
      while (!isAvailable) {
        random = generateRandomLetter();
        filteredArr = arr.filter(item => item?.char === random);
        if (filteredArr.length < 2) {
          obj.char = random;
          arr.push(obj);
          isAvailable = true;
        }
      }
    }
    setCardData(arr);
  };

  const generateRandomLetter = () => {
    const alphabet = 'ABCDEFGH';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const cardPressed = item => {
    const changedArr = cardData.map(card => {
      if (card.id === item.id) card.isOpen = !card.isOpen;
      return card;
    });
    setCardData(changedArr);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        style={styles.flatlistStyles}
        contentContainerStyle={styles.flatlistContentStyles}
        data={cardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Card 
            item = {item}
            cardPressed={() => cardPressed(item)}
            matchedText = {'Matched !!'}
            />
          );
        }}
      />
      <View style={styles.optionsContainer}>
        <CounterBlock text={'Turns: '} count={turns} />
        <CounterBlock text={'Matches: '} count={matches} />
        <CustomButton onPress={() => setAllMatched(true)} text={'Restart'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#3EB489',
  },
  flatlistStyles: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
  },
  flatlistContentStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    height: '100%',
  },
  optionsContainer:{
    flex: 0.3,
    flexDirection: 'row'
  }
});

export default App;
