import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {baseUrl} from '../config/config';
import PublishWish from './PublishWish';
import MyWish from './MyWish';

// const url = (obj) => {
//     let params = '';
//     for(let i in obj) {
//         params += `i=${obj[i]}&`;
//     }
//     return encodeURI(params);
// }


export default class Title extends React.Component{
    constructor(props) {
        super(props);
        this.logoUrl = 'static/img/index.png';
        this.titleText = '心愿单';
        this.style = {
            height:'10%',
            maxHeight: '50px',
            minHeight: '35px',
            width: '100%',
            position:'fixed',
            display:'flex',
            justifyContent: 'space-around',
            backgroundColor: '#607D8B',
            alignItems: 'center',
            zIndex: '1',
        };
        this.state = {
            publishOpen: false,
            myWishOpen: false,
        };

    }

    handlePublishOpen() {
        this.setState({publishOpen: true});
    }

    handlePublishClose() {
        this.setState({publishOpen: false});
    }

    handleMyWishOpen() {
        this.setState({myWishOpen: true});
        console.log('open');
    }

    handleMyWishClose() {
        this.setState({myWishOpen: false});
    }


    render() {
        return (
            <div style={this.style} >
                <IndexLogo />
                <span style={{fontSize: '25px', flexBasis: '60%', textAlign:'center'}}>心愿单</span>
                
                <span style={{display:'flex'}}>
                    <PublishButton handleOpen={this.handlePublishOpen.bind(this)} />
                    <span>&nbsp;</span>
                    <MyWishButton handleOpen={this.handleMyWishOpen.bind(this)} />
                </span>


                <PublishWish open={this.state.publishOpen} handleClose={this.handlePublishClose.bind(this)} />
                <MyWish open={this.state.myWishOpen} handleClose={this.handleMyWishClose.bind(this)} />
            </div>
        );
    }
}

let IndexLogo = () => <img height="60%" src="/static/img/index.png" />;
class PublishButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MuiThemeProvider><RaisedButton onClick={this.props.handleOpen} primary={true} label="发布心愿"/></MuiThemeProvider>
        );
    }
} 
class MyWishButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MuiThemeProvider><RaisedButton onClick={this.props.handleOpen} primary={true} label="我的心愿"/></MuiThemeProvider>
        );
    }
} 



