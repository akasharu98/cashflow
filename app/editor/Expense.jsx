"use client"; // This is a client component 
import { useCallback, useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';
import styles from './style.module.css';

function ExpenseNode({ data, isConnectable }) {
  const [expenseType, setExpenseType] = useState('');
  const [cost, setCost] = useState('');

  const onExpenseTypeChange = useCallback((evt) => {
    const { value } = evt.target;
    setExpenseType((prevText) => value);
    
  }, []);

  const onCostChange = useCallback((evt) => {
    const { value } = evt.target;
    setCost((prevText) => value);
  }, []);

  

  return (
    <div className={`${styles.expenseNode} ${styles.customExpenseNode}`}>
        <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div>
        <label className={styles.expenseNodeLabel} htmlFor="expense-type">Expense Type:</label>
        <input
          id="expense-type"
          name="expense-type"
          value={expenseType}
          onChange={onExpenseTypeChange}
          className={`${styles.expenseNodeInput} nodrag`}
        />
      </div>
      <div>
        <label className={styles.expenseNodeLabel} htmlFor="cost">Cost:</label>
        <input
          id="cost"
          type="number" // Set the input type as "number"
          name="cost"
          value={cost}
          onChange={onCostChange}
          className={`${styles.expenseNodeInput} nodrag`}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ left: 10 }}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default ExpenseNode;
