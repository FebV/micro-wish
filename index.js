import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title';
import WishList from './components/WishList';
import {baseUrl} from './config/config';
injectTapEventPlugin();


ReactDOM.render(
    <div>
        <Title></Title>
        <WishList />
    </div>,
document.getElementById('root'));

let msgPush = new WebSocket('ws://www.yuesdu.com/message/messagePush');
msgPush.onmessage = msge => {
    console.log(msge.data);
}