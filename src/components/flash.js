import React from 'react'

export default function Flash(props) {
    return (
        <div className={props.type} >
            <p> {props.text} </p>
        </div>
    )
}
