import { useState, useEffect } from 'react';

const useGame = () => {
    const words = ['HELLO', 'WORLD', 'OPENAI', 'GPT', 'HOOK'];

    const [word, setWord] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [remainingGuesses, setRemainingGuesses] = useState(6);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const hangmanImg = `/images/hangman${6 - remainingGuesses}.png`;
    const [wins, setWins] = useState(-2); //troche sus bo bylo dwa dodane na poczatku dlatego odjelam
    const [losses, setLosses] = useState(0);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
        setGuesses([]);
        setRemainingGuesses(6);
        setCurrentGuess('');
        setGameOver(false);
        setWin(false);
    };

    const calculateWinRate = () => {
        const totalGames = wins + losses;
        return totalGames > 0 ? (wins / totalGames * 100).toFixed(2) : 0;
      };

    const guessLetter = () => {
    if (word.includes(currentGuess)) {
      setGuesses((oldGuesses) => [...oldGuesses, currentGuess]);
    } else {
      setRemainingGuesses((oldGuesses) => oldGuesses - 1);
    }

    setCurrentGuess('');
  };

  useEffect(() => {
    if (remainingGuesses === 0) {
      setGameOver(true);
      setLosses((oldLosses) => oldLosses + 1);
    }

    if (word.split('').every((letter) => guesses.includes(letter))) {
      setGameOver(true);
      setWin(true);
      setWins((oldWins) => oldWins + 1);
    }
  }, [guesses, remainingGuesses]);


    return {
        word,
        guesses,
        guessLetter,
        remainingGuesses,
        hangmanImg,
        currentGuess,  // export the current guess and its setter
        setCurrentGuess,
        gameOver,
        win,
        startNewGame,
        wins,
        losses,
        calculateWinRate,
    };
};

export default useGame;
