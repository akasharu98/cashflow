"use client"; // This is a client component 
import Image from 'next/image'

import Node from './node';
import Connection from './Connection'
import styles from './style.module.css'
import TextUpdaterNode from './TextUpdaterNOde'
import ExpenseNode from './Expense'


import { useCallback, useState, useEffect } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, NodeToolbar, Controls } from 'reactflow';

import 'reactflow/dist/style.css';


import initialNodes from './nodes.js';
import initialEdges from './edges.js';
const nodeTypes = {
  textUpdater: TextUpdaterNode,
  expense: ExpenseNode, 
};

export default function Editor() {
  const saveToLocalStorage = (key, value) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getFromLocalStorage = (key) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  };
  const [nodes, setNodes] = useState(() => {
    const storedNodes = getFromLocalStorage('nodes');
    return storedNodes ? JSON.parse(storedNodes) : initialNodes;
  });
  const [edges, setEdges] = useState(() => {
    const storedEdges = getFromLocalStorage('edges');
    return storedEdges ? JSON.parse(storedEdges) : initialEdges;
  });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    saveToLocalStorage('nodes', nodes);
  }, [nodes]);

  useEffect(() => {
    saveToLocalStorage('edges', edges);
  }, [edges]);

  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      
      data: { label: <input style={{ width: '100%' }} ></input> },
      position: { x: 0, y: 0 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
   
  };

  const addInputNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'input',
      data: { label: <input style={{ width: '100%' }} ></input> },
      position: { x: 0, y: 0 },
    }; 
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const addOutputNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'output',
      data: { label: <input style={{ width: '100%' }} ></input> },
      position: { x: 0, y: 0 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const addTextUpdaterNode = () => {
    const newNode = { id: `${nodes.length + 1}`, type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const addExpenseNode = () => {
    const newNode = { id: `${nodes.length + 1}`, type: 'expense', position: { x: 0, y: 0 }, data: { value: 123 } };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const clearStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  };


  


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
       <button
        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 mt-2"
        onClick={clearStorage}
      >
        Clear Storage
      </button>
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addNode}>Add Default Node</button>
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addInputNode}>Add Input Node</button>
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addOutputNode}>Add Output Node</button>
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addTextUpdaterNode}>Add Text Updater Node Node</button>
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addExpenseNode}>Add Expense Node</button>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >  
    <Controls />
   
    </ReactFlow>
    </div>
  );
}


