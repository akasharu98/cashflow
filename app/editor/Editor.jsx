"use client"; // This is a client component 
import Image from 'next/image'

import Node from './node';
import Connection from './Connection'
import styles from './style.module.css'
import TextUpdaterNode from './TextUpdaterNOde'
import ExpenseNode from './Expense'
import TotalCashNode from './TotalCash'
import TotalIncome from './TotalIncome';


import { useCallback, useState, useEffect } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, NodeToolbar, Controls, useEdgesState,useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';


import initialNodes from './nodes.js';
import initialEdges from './edges.js';
const initBgColor = '#1A192B';
const nodeTypes = {
  textUpdater: TextUpdaterNode,
  expense: ExpenseNode,
  totalcash:TotalCashNode, 
  totalIncome:TotalIncome,
};

export default function Editor() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: '1',
        type: 'input',
        data: { label: 'An input node' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
      },
      {
        id: '2',
        type: 'expense',
        data: { onChange: onChange, color: initBgColor },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: '3',
        type: 'output',
        data: { label: 'Output A' },
        position: { x: 650, y: 25 },
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Output B' },
        position: { x: 650, y: 100 },
        targetPosition: 'left',
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#fff' },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => {
        const newEdges = addEdge(connection, eds);
        
        return newEdges;
      });
    },
    [setEdges]
  );



  const addTotalCashNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'totalcash',
      data: { label:<input>hi</input> },
      position: { x: 0, y: 0 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    // Reset handleCount when a new node is added
  };
  
  const addTotalIncome = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'totalIncome',
      data: {
        label:<input style={{ width: '100%' }} ></input> ,
        handleCount: 0,
        handlePosition: 0
      },
      position: { x: 0, y: 0 },
      style:{backgroundColor:"white"}
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    // Reset handleCount when a new node is added
  };

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

 console.log(edges)
  


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
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addTotalCashNode}>Add Total Cash Node</button>
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addExpenseNode}>Add Expense Node</button>
      <button  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" onClick={addTotalIncome}>Add Total Income</button>
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


