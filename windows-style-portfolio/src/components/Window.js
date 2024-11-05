import React from 'react';
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';

const Window = ({ title, children, onClose }) => {
  return (
    <Draggable>
      <Rnd
        default={{
          width: 300,
          height: 200,
        }}
        minWidth={200}
        minHeight={100}
      >
        <div className="border border-gray-500 bg-white shadow-lg">
          <div className="flex justify-between items-center bg-blue-500 text-white p-2">
            <span>{title}</span>
            <button onClick={onClose}>X</button>
          </div>
          <div className="p-2">
            {children}
          </div>
        </div>
      </Rnd>
    </Draggable>
  );
};

export default Window;
