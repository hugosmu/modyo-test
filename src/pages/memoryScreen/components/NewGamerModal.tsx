import Modal from 'react-bootstrap/Modal';
import { NewGamerForm } from './NewGamerForm';

export const NewGamerModal = ({show, setGamerName}: {show: boolean, setGamerName: (param: string) => void}) => {
  return (
    <>
      <Modal backdrop='static' show={show}>
        <Modal.Body>
          <div className='container'>
          <h2 className='mb-4'>Instrucciones</h2>
          <p>El jugador deberá ir volteando las cartas intentando adivinar las cartas que se repiten.</p>
          <p>Por cada turno el jugador debe voltear 2 cartas.</p>
          <ul>
            <li>Si las cartas no coinciden, se sumará 1 punto de error.</li>
            <li>Si las cartas coinciden, se sumará 1 punto de acierto.</li>
          </ul>
          <h5 className='my-3 mt-4'>Ingrese su nombre</h5>
          <NewGamerForm setGamerName={setGamerName}/>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
