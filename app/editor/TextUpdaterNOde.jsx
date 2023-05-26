"use client"; // This is a client component 
import { useCallback, useRef,useState,useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import styles from './style.module.css';
import TextareaResizable from './TextareaResizeable'; // Import the TextareaResizable component
import TextareaAutosize from 'react-textarea-autosize';


const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const [text, setText] = useState('');

  const onChange = useCallback((evt) => {
    const { value } = evt.target;
    setText((prevText) => value);
  }, []);

 

  return (
    <div className={styles.textUpdaterNode}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label className={styles.textUpdaterNodeLabel} htmlFor="text">Text:</label>
        <TextareaAutosize // Use the TextareaResizable component
          value={text}
          onChange={onChange}
          className="nodrag"
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;
