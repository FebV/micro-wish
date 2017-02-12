import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title';
import Wish from './components/Wish';
injectTapEventPlugin();


ReactDOM.render(
    <div>
        <Title></Title>
        <div style={{width: '100%', paddingTop:'10%', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '60%'}}>
                <Wish />
                <Wish />
                <Wish />
                <Wish />
            </div>
        </div>
    </div>,
document.getElementById('root'));