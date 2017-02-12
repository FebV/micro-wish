import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'


export default class Title extends React.Component{
    constructor(props) {
        super(props);
        this.logoUrl = '/static/img/index.png';
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
            open: false
        };

    }

    handleOpen() {
        this.setState({open: true});
        console.log('open');
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        return (
            <div style={this.style} >
                <IndexLogo />
                <span style={{fontSize: '25px'}}>心愿单</span>
                <span><PublishButton handleOpen={this.handleOpen.bind(this)} /></span>
                <PublishWish open={this.state.open} handleClose={this.handleClose.bind(this)} />
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

class PublishWish extends React.Component {
    constructor(props) {
        super(props);
        this.action = [
            <RaisedButton
                primary={true}
                label="发布心愿"
            />
        ];
        this.state = {
            currentTime: new Date()
        }
    }
    
    render() {
        return (
        <MuiThemeProvider>
        <Dialog
            title="发布心愿"
            actions={this.action}
            open={this.props.open}
            modal={false}
            onRequestClose={this.props.handleClose}
        >
            <DatePicker defaultDate={this.state.currentTime} floatingLabelText="截止日期" /><br />
            <TextField
                hintText="联系电话"
                floatingLabelText="联系电话"
            /><br />
            <TextField
                hintText="心愿详情"
                floatingLabelText="心愿详情"
                multiLine={true}
                rows={2}
                fullWidth={true}
            /><br /><br />
            <Checkbox
                label="你要匿名发布吗"
            />
        </Dialog>
        </MuiThemeProvider>
        );
    }
}