import React from 'react'
import {useStyle}  from './hooks'
import withContext from './withContext'

interface BPBProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}

const BouncyProgressBox : React.FC<BPBProps> = (props : BPBProps) => {
    const {blockStyle, lineStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <button onClick = {() => props.onClick()}></button>
            <div style = {blockStyle()}>
                <div style = {lineStyle()}></div>
            </div>
        </React.Fragment>
    )
}

export default withContext(BouncyProgressBox)
