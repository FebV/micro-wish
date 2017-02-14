import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const baseUrl = 'http://wesdu.com';

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

class PublishWish extends React.Component {
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

class MyWish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myPub: [],
            myAccept: [],
        }
        fetch(baseUrl+'/wish/myPub')
            .then(res => res.json())
            .then(res => {
                if(Array.isArray(res)) {
                    this.setState({myPub: res});
                    console.log(res);
                }
            });
    }

    handleDelete(id) {
        fetch(`${baseUrl}/wish/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodeURIComponent(`wish_id=${id}`),
        })
            .then(res => res.text())
            .then(res => {alert(res)});
    }

    render() {

        const pubWishes = this.state.myPub.map((ele, idx) => {
            console.log(idx);
            return (
                <div>
                    我发布的
                <Card key={ele.wish_id} >
                    <CardHeader
                    title={`心愿状态 ${ele.wish_statue}  ${ele.wish_pub_date}-${ele.wish_deadline}`}
                    subtitle={`${ele.wish_accept_user_name} ${ele.wish_accept_date} ${ele.wish_accept_tel}`}
                    />
                    <CardText style={{fontSize: '3vh'}}>
                    {ele.wish_detail}
                    </CardText>
                    <RaisedButton onClick={this.handleDelete.apply(this, ele.wish_id)} primary={true} label="删除心愿"/>
                </Card>
                <br />
                </div>
            );
        });

        const acceptWishes = this.state.myAccept.map(ele => {
            return (
                <div>
                    我接受的
                <Card key={ele.wish_id} >
                    <CardHeader
                    title={`${ele.wish_pub_date}-${ele.wish_deadline}`}
                    subtitle={`${ele.wish_accept_user_name} ${ele.wish_user_gender} ${ele.wish_accept_date} ${ele.wish_accept_tel}`}
                    />
                    <CardText style={{fontSize: '3vh'}}>
                    {ele.wish_detail}
                    </CardText>
                </Card>
                <br />
                </div>
            );
        });

        return (
        <MuiThemeProvider>
        <Dialog
            title="我的心愿"
            actions={this.action}
            open={this.props.open}
            modal={false}
            onRequestClose={this.props.handleClose}
        >
            {pubWishes}
        </Dialog>
        </MuiThemeProvider>
        );
    }
}