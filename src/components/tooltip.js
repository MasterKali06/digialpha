import React from 'react'
import { useState } from 'react'
import "../scss/components/tooltip.scss"

export const Tooltip = (props) => {

    let delay, timeout;
    const [active, setActive] = useState(false)

    const showTip = () => {
        delay = setTimeout(() => {
            setActive(true)
        }, 300)

        timeout = setTimeout(() => {
            setActive(false)
        }, 2000)
    }

    const hideTip = () => {
        setActive(false)
        clearInterval(timeout)
        clearInterval(delay)
    }

    return (
        <div className="tooltip-container" onMouseEnter={showTip} onMouseLeave={hideTip} >
            {props.children}
            {
                active && (
                    <div className="tooltip">
                        {props.text}
                    </div>
                )
            }
        </div>
    )
}
