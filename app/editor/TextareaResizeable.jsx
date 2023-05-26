"use client"; // This is a client component 
import React, { useState } from 'react';

function TextareaResizable() {
  const [textareaHeight, setTextareaHeight] = useState(38);

  const handleKeyUp = (evt) => {
    // Max: 75px Min: 38px
    let newHeight = Math.max(Math.min(evt.target.scrollHeight + 2, 75), 38);
    if (newHeight !== textareaHeight) {
      setTextareaHeight(newHeight);
    }
  };

  const textareaStyle = { height: textareaHeight };

  return (
    <div>
      <textarea onKeyUp={handleKeyUp} style={textareaStyle} />
    </div>
  );
}

export default TextareaResizable;
