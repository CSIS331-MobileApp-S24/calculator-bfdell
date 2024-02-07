import React from 'react';
import './Wrapper.css'
import Screen from './Screen.js'
import ButtonBox from './ButtonBox.js'
const Wrapper = () => {
    return (
        <div className="wrapper bg-dark-gray pa3 tc">
            <Screen value='0'/>
            <ButtonBox />
        </div>
    );

};

export default Wrapper;