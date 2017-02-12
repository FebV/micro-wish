import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title';
import WishList from './components/WishList';
injectTapEventPlugin();



ReactDOM.render(
    <div>
        <Title></Title>
        <WishList />
    </div>,
document.getElementById('root'));