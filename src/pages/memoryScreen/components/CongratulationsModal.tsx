import Modal from 'react-bootstrap/Modal';

export const CongratulationsModal = ({show, playAgain}: {show: boolean, playAgain: () => void}) => {
  return (
    <>
      <Modal backdrop='static' show={show}>
        <Modal.Body className='text-center'>
          <div className='container'>
          <h2 className='mb-4'>🥳¡Felicitaciones!🥳</h2>
          <button
            type='button'
            className='col-12 btn btn-warning mt-1'
            onClick={playAgain}
          >
            ¡Jugar otra vez!
          </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
