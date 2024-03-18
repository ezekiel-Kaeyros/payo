import React, { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  close: any;
  shown: any;
};

const Modal: React.FC<ModalProps> = ({ children, close, shown }) => {
  return shown ? (
    <div
      className=" bg-black w-96 h-96"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <button onClick={close}>Close</button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
