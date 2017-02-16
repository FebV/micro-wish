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

setInterval(() => {
    fetch(baseUrl + '/message/messagePush')
        .then(res => res.json())
        .then(res => {
            if(Array.isArray(res)) {
                console.log(res);
                // res.map(ele => {
                //     fetch(baseUrl + '/message/messagePush', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/x-www-form-urlencoded'
                //         },
                //         body: `message_id=${ele.message_id}`
                //     })
                //         .then(res => res.text())
                //         .then(res => {alert(res)});
                // });
            }
        })
}, 10000)