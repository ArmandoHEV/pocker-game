import Head from 'next/head';
import {cards} from "../Data/cards";
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {

  const [combination, setCombinations] = useState(cards);
  const [card2, setCard1] = useState(undefined);
  const [card1, setCard2] = useState(undefined);
  const [newGame, setNewGame] = useState(undefined);
  const [probability, setProbability] = useState(undefined);

  useEffect(() => {
      setCard1(Math.floor(Math.random() * 51));
      setCard2(Math.floor(Math.random() * 51));
      console.log(getCombinations(52, 5))
  }, [])

    const generateCards = () => {
      setCard1(Math.floor(Math.random() * 51));
      setCard2(Math.floor(Math.random() * 51));
    }

    const factorialize = (num) => {
        if (num < 0)
            return -1;
        else if (num === 0)
            return 1;
        else {
            return (num * factorialize(num - 1));
        }
    }

    const getCombinations = (a, b) => {
        return Math.round(factorialize(a)/(factorialize((a - b))*factorialize(b)))
    }

    const cardForRealStair = (card) => {
      switch (card.Numero_Carta){
          case 'A':
              return true
          case 'K':
              return true
          case 'Q':
              return true
          case 'J':
              return true
          case '10':
              return true
          default:
              return false
      }
    }

    const sameNaipe = (c1, c2) => {
        return combination[c1].Nombre_Naipes === combination[c2].Nombre_Naipes
    }

    const sameColor = (c1, c2) => {
        return combination[c1].Color_Naipes === combination[c2].Color_Naipes
    }

    const getStairProbability = () => {
      if(cardForRealStair(combination[card1]) && cardForRealStair(combination[card2])){
          console.log('Real Stair Card')
          if(sameNaipe(card1, card2)){
              console.log('Same naipe')
              if(sameColor(card1, card2)){
                  console.log('Same colors')
                  setProbability(getCombinations(4, 1)/getCombinations(50, 3));
              }else{
                  console.log('Only 1')
                  setProbability(getCombinations(4, 1)/getCombinations(50, 3));
              }
          }else{
              console.log('2 different')
              setProbability(2*(getCombinations(4, 1)/getCombinations(50, 4)));
          }
      }else if(cardForRealStair(combination[card1]) || cardForRealStair(combination[card2])){
          console.log('1 of two real')
          setProbability(getCombinations(4, 1)/getCombinations(50, 4));
      }else{
          console.log('Not real')
          setProbability(getCombinations(4, 1)/getCombinations(50, 5));
      }
    }

    const getColorProbability = () => {
      if(sameNaipe(card1, card2)){
          setProbability((getColorEvent(1)*4 /getCombinations(50, 5)));
      }else{
          setProbability(2*((getColorEvent(2)) /getCombinations(50, 5)));
      }
    }

    const getColorEvent = (type) => {
      if(type === 1)
          return (getCombinations(11, 3)-10)
      else
          return (getCombinations(12, 4)-10)*4
    }

  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
          <button onClick={() => {
              generateCards();
          }}>
              Repartir
          </button>
          {card1 !== undefined ? <p>{combination[card1].Color_Naipes}-{combination[card1].Nombre_Naipes}-{combination[card1].Numero_Carta}</p> : null}
          {card2 !== undefined ? <p>{combination[card2].Color_Naipes}-{combination[card2].Nombre_Naipes}-{combination[card2].Numero_Carta}</p> : null}
          Calcule probabilidad para:
          <button onClick={() => {
              getColorProbability();
          }}>
              Color
          </button>
          <button onClick={() => {
              getStairProbability();
          }}>
              Escalera real
          </button>
          {probability && <p>Probabilidad es: {probability}</p>}
      </div>
  )
}
