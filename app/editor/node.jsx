
"use client"; // This is a client component
import React, { useState } from 'react';
import styles from './style.module.css'
function Node({ id, onRemove, onAddConnection, onRemoveConnection }) {
  const [connections, setConnections] = useState([]);

  const handleAddConnection = () => {
    const toNodeId = prompt('Enter the ID of the node to connect to:');
    if (toNodeId !== null && toNodeId !== '') {
      const newConnection = { id: connections.length, from: id, to: Number(toNodeId) };
      setConnections([...connections, newConnection]);
      onAddConnection(id, Number(toNodeId));
    }
  };

  const handleRemoveConnection = (connId) => {
    setConnections(connections.filter((conn) => conn.id !== connId));
    onRemoveConnection(connId);
  };

  const handleRemoveNode = () => {
    onRemove(id);
  };

  return (
    <div className={styles.node} style={{ margin: '8px' }}>
      <div>Node {id}</div>
      <button onClick={handleAddConnection}>Add Connection</button>
      <button onClick={handleRemoveNode}>Remove</button>
      {connections.map((conn) => (
        <div key={conn.id} className={styles.connection}>
          Connection to node {conn.to}{' '}
          <button onClick={() => handleRemoveConnection(conn.id)}>Remove Connection</button>
        </div>
      ))}
    </div>
  );
}

export default Node;
