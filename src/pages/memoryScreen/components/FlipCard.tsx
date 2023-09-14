/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { IFlipCard } from '@/shared/hooks/useAnimalsImages/interfaces';
import styles from '@/styles/MemoryScreen.module.css'

export const FlipCard = ({imageData, flippedCards, setFlippedCards, setScore}: IFlipCard) => {
  const [displayHiddenSide, setDisplayHiddenSide] = useState(false)
  const [flippable, setFlippable] = useState(true)
  const { alt, url, id } = imageData
  const { cardOne, cardTwo } = flippedCards || {}

  const answerHandler = (correctAnswer: boolean) => {
    cardTwo && setFlippedCards({})
    setScore(correctAnswer)
    correctAnswer ? setFlippable(false) : setTimeout(() => { return setDisplayHiddenSide(false) }, 500)
  }

  useEffect(() => {
    if (!flippable || !displayHiddenSide || !cardTwo) return

    answerHandler(cardOne === cardTwo && cardTwo === id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCards])

  if (displayHiddenSide) return (
    <img
      alt={alt}
      className={`${styles.flipCardSide} ${styles.flipCardSide__visibleSide}`}
      src={url}
    />
  )

  return (
    <div
      className={`${styles.flipCardSide} ${styles.flipCardSide__hiddenSide}`}
      onClick={() => {
        if (!flippable) return

        setDisplayHiddenSide(true)
        setFlippedCards(flippedCards?.cardOne ? {...flippedCards, cardTwo: id} : {cardOne: id})
      }}
    >
      <div className='text-center'>
        <div className={styles.boldBigFont}>?</div>
      </div>
    </div>
  )
}
