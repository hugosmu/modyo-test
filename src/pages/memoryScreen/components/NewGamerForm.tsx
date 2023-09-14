import { useState } from 'react';

export const NewGamerForm = ({setGamerName}: {setGamerName: (param: string) => void}) => {
  const [inputValue, setInputValue] = useState('')
  const disabledClass = inputValue ? '' : 'disabled'

  return (
    <>
      <div className='input-group my-2'>
        <input
          type='text'
          className='form-control'
          placeholder='Nombre del Jugador'
          onChange={(input) => {return setInputValue(input.target.value)}}
        />
      </div>
      <button
        type='button'
        className={`col-12 btn btn-success mt-1 ${disabledClass}`}
        onClick={() => {
          localStorage.setItem('gamerName', inputValue)
          return setGamerName(inputValue)
        }}
      >
        ¡Vamos a jugar!
      </button>
    </>
  );
}
