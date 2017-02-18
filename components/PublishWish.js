import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {baseUrl} from '../config/config';

export default class PublishWish extends React.Component {
    constructor(props) {
        super(props);
        this.action = [
            <RaisedButton
                primary={true}
                label="发布心愿"
                onClick={this.publish.bind(this)}
            />
        ];
        this.state = {
            wish_detail: '',
            wish_user_show: '',
            wish_deadline: new Date(),
            wish_user_tel: '',
            if_tel_change: 1,
        }
    }


    handleCheck(e, val) {
        val = val === true ? 0 : 1;
        this.setState({wish_user_show: val});
    }

    handleTel(e, val) {
        this.setState({wish_user_tel: val});
    }

    handleDDL(e, val) {
        val = this.formatTime(val);
        this.setState({wish_deadline: val});
    }
    handleDetail(e, val) {
        this.setState({wish_detail: val});
    }

    leftPad(ori) {
        return ori < 10 ? '0'+ori : ori;
    }

    formatTime(val) {
        return `${val.getFullYear()}-${this.leftPad(val.getMonth()+1)}-${this.leftPad(val.getDate())} ${this.leftPad(val.getHours())}:${this.leftPad(val.getMinutes())}:${this.leftPad(val.getSeconds())}`;
    }

    publish() {
        const params = this.state;
        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
        fetch(baseUrl+'/wish/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: searchParams,
        })
        console.log(this.state);
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
            <DatePicker
                defaultDate={this.state.currentTime}
                floatingLabelText="截止日期"
                onChange={this.handleDDL.bind(this)}
            /><br />
            <TextField
                onChange={this.handleTel.bind(this)}
                hintText="联系电话"
                floatingLabelText="联系电话"
            /><br />
            <TextField
                hintText="心愿详情"
                floatingLabelText="心愿详情"
                multiLine={true}
                rows={2}
                fullWidth={true}
                onChange={this.handleDetail.bind(this)}
            /><br /><br />
            <Checkbox
                label="你要匿名发布吗"
                onCheck={this.handleCheck.bind(this)}
            />
        </Dialog>
        </MuiThemeProvider>
        );
    }
}