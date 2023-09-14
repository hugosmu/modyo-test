import React, { useEffect, useState } from 'react';
import { useAnimalsImages } from '@/shared/hooks/useAnimalsImages'
import { FlippedCards } from '@/shared/hooks/useAnimalsImages/interfaces';
import styles from '@/styles/MemoryScreen.module.css'
import { NewGamerModal } from './components/NewGamerModal';
import { FlipCard } from './components/FlipCard';
import { CongratulationsModal } from './components/CongratulationsModal';

export const MemoryScreen = () => {
  const [flippedCards, setFlippedCards] = useState<FlippedCards>()
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [gamersName, setGamerName] = useState<string | null>('')
  const [gamerShowModal, setGamerShowModal] = useState(false);
  const [congratulationsShowModal, setCongratulationsShowModal] = useState(false);
  const imagesPairCount = 20
  const { isLoading, error, animalsImages, refreshImages } = useAnimalsImages(imagesPairCount)

  useEffect(() => {
    const localGamersName = localStorage.getItem('gamerName')
    setGamerName(localGamersName)
    setGamerShowModal(!localGamersName)
  }, [])

  useEffect(() => {
    if (correctAnswers >= imagesPairCount) return setCongratulationsShowModal(true)
  }, [correctAnswers])

  if (error) return <h1 className='text-center'>Error</h1>

  const newGame = () => {
    refreshImages()
    cardsRender()
    setFlippedCards({})
    setCorrectAnswers(0)
    setWrongAnswers(0)
    setCongratulationsShowModal(false)
  }

  const setScore = (correctAnswer: boolean) => {
    correctAnswer ? setCorrectAnswers(correctAnswers + 1) : setWrongAnswers(wrongAnswers + 1)
  }

  const cardsRender = () => {
    if (isLoading) return <h1 className={`${styles.loader} mt-5`}>↺</h1>

    return cardsCollection()
  }

  const cardsCollection = () => {
    return animalsImages.map((animalImage, key) => {
      return (
        <div key={`animalsImage${key}`} className={`${styles.flipCard} m-2 p-0`}>
          <FlipCard imageData={animalImage} flippedCards={flippedCards} setFlippedCards={setFlippedCards} setScore={setScore}/>
        </div>
      )
    })
  }

  return (
    <div className='text-center'>
      <h1>Memory Game</h1>
      <h3 className='mt-2'>Partida de {gamersName}</h3>
      <div>
        <button type='button' className='btn btn-secondary' onClick={() => {return newGame()}}>Nuevo Juego</button>
      </div>
      <div className='row m-1 mt-2'>
        <h2 className='col-6'>{correctAnswers} ✅</h2>
        <h2 className='col-6'>{wrongAnswers} ❌</h2>
      </div>
      <div className='row justify-content-center m-0'>
        {cardsRender()}
      </div>
      <NewGamerModal
        show={gamerShowModal}
        setGamerName={(inputValue) => {
          setGamerShowModal(false)
          return setGamerName(inputValue)}
        }
      />
      <CongratulationsModal
        show={congratulationsShowModal}
        gamersNames={gamersName}
        playAgain={newGame}
      />
    </div>
  )
}
