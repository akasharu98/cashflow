import React, { memo, FC, useMemo, CSSProperties, useState, useRef, useLayoutEffect, useEffect } from 'react';
import ButtonGroup from 'antd/es/button/button-group';
import Button from 'antd/es/button';
import { Handle, Position, NodeProps, NodeToolbar, useUpdateNodeInternals} from 'reactflow';
import styles from './style.module.css';


const nodeStyles: CSSProperties = { padding: 10, border: '1px solid #ddd' };

const TotalIncome = ({ isConnectable, sourcePosition, targetPosition, data, ...props }: any) => {
    const nodeRef: any = useRef();
    const [sourceArray, setSourceArray] = useState<any>([])
    const [targetArray, setTargetArray] = useState<any>([])
    const [dimensions, setDimensions] = useState({ width: 20, height: 1 });

    useLayoutEffect(() => {
        if (nodeRef.current) {
            setDimensions({
                width: nodeRef.current.offsetWidth + dimensions.width,
                height: nodeRef.current.offsetHeight + dimensions.height
            });
        }
    }, []);

    const add = (type: string) => {
        if (type === "T" && targetArray.length < 4) {
            let tmp = (targetArray.length + 1)
            setTargetArray([...targetArray, tmp])
        }
        else if (type === "S" && sourceArray.length<4) {
            let smp = (sourceArray.length + 1)
            setSourceArray([...sourceArray, smp])
        }
    }

    const positionHandle = (index: number) => {
        if (index === 1 || index === 2) {
            return (dimensions.height / 3) * index
        } else if (index === 3) {
            return 0
        } else if (index === 4) {
            return dimensions.height
        }
    }

    const targetHandles = useMemo(
        () =>
            targetArray.map((x: any, i: number) => {
                const handleId = `target-handle-${i + 1}`;
                return (
                    <Handle
                        key={handleId}
                        type="target"
                        position={Position.Left}
                        id={handleId}
                        style={{ top: positionHandle(i + 1) }}
                    />
                );
            }),
        [targetArray, positionHandle]
    );
    const sourceHandles = useMemo(
        () =>
            sourceArray.map((x: any, i: number) => {
                const handleId = `source-handle-${i + 1}`;
                return (
                    <Handle
                        key={handleId}
                        type="source"
                        position={Position.Right}
                        id={handleId}
                        style={{ top: positionHandle(i + 1) }}
                    />
                );
            }),
        [sourceArray, positionHandle]
    );
    const nodeId: string = props.id
    const updateNodeInternals = useUpdateNodeInternals();
    useEffect(() => {
            updateNodeInternals(nodeId)
    }, [sourceArray, targetArray])

    return (
        <div ref={nodeRef} className={styles.totalCashNode}>
            {targetHandles}
            
               
                <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button onClick={() => add("T")}>Add Input Handle</button>
        <button onClick={() => add("S")}>Add Output Handle</button>
      </NodeToolbar>
    {/* <ButtonGroup
                        
                        aria-label="vertical outlined button group"
                        size="small"
                    >
                        <Button key="targetMore" onClick={() => add("T")}>+</Button>
    </ButtonGroup>-->*/}
                
            
            {sourceHandles}
        </div>
    );
};

export default memo(TotalIncome);