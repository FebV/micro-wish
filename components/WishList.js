import React from 'react';
import Wish from './Wish'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {baseUrl} from '../config/config';



export default class WishLish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishList: [],
            dialogOpen: false,
            acceptWishId: null,
        }
        this.getWishList();
    }

    getWishList() {
        fetch(baseUrl+'/wish/list?head=0&rows=10', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if  (res.status == 200) {
                    res = res.data;
                    this.setState({wishList: res.map(ele => <Wish
                        key={ele.wish_id}
                        wish_id={ele.wish_id}
                        wish_detail={ele.wish_detail}
                        wish_user_name={ele.wish_user_name}
                        wish_pub_date={ele.wish_pub_date}
                        wish_deadline={ele.wish_deadline}
                        wish_user_gender={ele.wish_user_gender}
                        handleAccept={this.handleAccept.apply(this, ele.wish_id)}
                    />)});
                }
            });
    }

    handleClose() {
        this.setState({dialogOpen: false});
    }

    handleOpen() {
        this.setState({dialogOpen: true});
    }

    handleAccept(id) {
        this.setState({dialogOpen: true, acceptWishId: id});

    }

    render() {
        return (
        <div style={{width: '100%', paddingTop:'10%', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '60%'}}>
                {this.state.wishList.map(ele => ele)}
            </div>
            <AcceptDialog
                wishId={this.state.acceptWishId}
                open={this.state.dialogOpen}
                handleClose={this.handleClose.bind(this)}
                handleAccept={this.handleAccept.bind(this)}
            />
        </div>
        )
    }
}

class AcceptDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accepter_tel: null,
            accept_user_show: 1,
            wish_id: this.props.wishId,
        }
    }

    handleTel(e, val) {
        this.setState({accepter_tel: val});
    }

    handleCheck(e, val) {
        val = val === true ? 0 : 1;
        this.setState({accept_user_show: val});
    }

    handleAccept() {
        const params = this.state;
        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
        fetch('/wish/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams,
        })
            .then(res => res.text())
            .then(res => {
                const msg = res == 0 ? '接收失败' : `接受成功, 发布者的联系方式是${res}`;
                alert(msg);
            });
    }

    render() {
        return (
        <MuiThemeProvider>
        <Dialog
            title="接受心愿"
            actions={this.action}
            open={this.props.open}
            modal={false}
            onRequestClose={this.props.handleClose}
        >
            <TextField
                onChange={this.handleTel.bind(this)}
                hintText="联系电话"
                floatingLabelText="联系电话"
            /><br /><br />
            <Checkbox
                label="你要匿名接受吗"
                onCheck={this.handleCheck.bind(this)}
            /><br /><br />
            <RaisedButton  label="接受心愿" onClick={this.handleAccept.bind(this)} primary={true} />

        </Dialog>
        </MuiThemeProvider>
        );
    }
}