import React from 'react';
import styles from './style.module.css'

function Connection({ id, from, to }) {
  const fromNode = document.getElementById(`node-${from}`);
  const toNode = document.getElementById(`node-${to}`);

  if (fromNode && toNode) {
    const fromNodeRect = fromNode.getBoundingClientRect();
    const toNodeRect = toNode.getBoundingClientRect();

    const fromX = fromNodeRect.left + fromNodeRect.width / 2;
    const fromY = fromNodeRect.top + fromNodeRect.height / 2;
    const toX = toNodeRect.left + toNodeRect.width / 2;
    const toY = toNodeRect.top + toNodeRect.height / 2;

    return (
      <line
        className={styles.lineConnectionArrow}
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        markerEnd="url(#arrowhead)"
      />
    );
  }

  return null;
}

export default Connection;

