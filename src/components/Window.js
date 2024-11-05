import React from 'react';
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';

function Window() {
  return (
    <Draggable>
      <Rnd
        default={{
          x: 100,
          y: 100,
          width: 320,
          height: 200,
        }}
        minWidth={200}
        minHeight={100}
      >
        <div className="window bg-white shadow-lg rounded">
          <div className="window-header bg-gray-800 text-white p-2 cursor-move">
            Window Header
          </div>
          <div className="window-content p-4">
            Window Content
          </div>
        </div>
      </Rnd>
    </Draggable>
  );
}

export default Window;
