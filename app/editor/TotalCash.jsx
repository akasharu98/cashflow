"use client"; // This is a client component 
import React, { useCallback, useState,useEffect } from 'react';
import { Handle, Position, NodeToolbar,useUpdateNodeInternals } from 'reactflow';
import styles from './style.module.css';

function TotalCashNode({ data, isConnectable,id }) {

  const updateNodeInternals = useUpdateNodeInternals()
  const [inputHandleCount, setInputHandleCount] = useState([]);
  const [outputHandleCount, setOutputHandleCount] = useState([]);

  
  const addInputHandle = () => {
    setInputHandleCount([...inputHandleCount,{}])
  };

  const addOutputHandle = () => {
    setOutputHandleCount([...outputHandleCount,{}])
  };
  let nodeId = id;

  useEffect(() => 
      updateNodeInternals(nodeId)
  , [inputHandleCount])
  useEffect(() => 
      updateNodeInternals(nodeId), [outputHandleCount])


  return (
    <div className={styles.totalCashNode}>
      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button onClick={addInputHandle}>Add Input Handle</button>
        <button onClick={addOutputHandle}>Add Output Handle</button>
      </NodeToolbar>
      <div className={styles.handleContainer}>
        {inputHandleCount.map((_,index) => (
          <Handle
            key={`ih${index}`}
            id={`ih${index}`}
            type="target"
            position={Position.Left}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
          />
        ))}
      </div>
      <div className={styles.totalCashContent}>
        <div>Total Cash:</div>
        <div>Placeholder for total cash value</div>
      </div>
      <div className={styles.handleContainer}>
      {outputHandleCount.map((_,index) => (
          <Handle
            key={`oh${index}`}
            type="source"
            position={Position.Right}
            id={`oh${index}`}
            isConnectable={isConnectable}
          />
        ))}
      </div>
    </div>
  );
}

export default TotalCashNode;
