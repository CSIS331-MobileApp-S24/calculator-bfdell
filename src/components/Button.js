import React from 'react';
import './ButtonBox.css'

const Button = ({className,value, onClick}) => {
    return (
        <button onClick={onClick} className={className}>{value}</button>
    )
};

export default Button;