import React from 'react';
import {baseUrl} from '../config/config';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


export default class MyWish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myPub: [],
            myAccept: [],
        }
        this.loadData();
        window.addEventListener('refreshMyWish', () => this.loadData());
    }

    loadData() {
        fetch(baseUrl+'/user/wish_pub?head=0&rows=100', {
        // fetch(baseUrl+'/mock/mypub.json', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => {
                if(res.status == 200) {
                    this.setState({myPub: res.data});
                }
            });
        // fetch(`${baseUrl}/mock/myaccept.json`, {
        fetch(baseUrl+'/user/wish_accept?head=0&rows=100', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => {
                if(res.status == 200) {
                    this.setState({myAccept: res.data});
                }
            });
    }

    handleDelete(id) {
        fetch(`${baseUrl}/wish/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `wish_id=${id}`,
            credentials: 'include',
        })
            .then(res => res.text())
            .then(res => {
                alert(res);
                dispatchEvent(new Event('refreshMyWish'));
});
    }

    render() {

        let pubWishes = this.state.myPub.map((ele, idx) => {
            const subtitle = ele.wish_status == 1 ? `接收者: ${ele.wish_accept_user} ${ele.wish_accept_tel}` : '';
            let status = '暂未被接受';
            if(ele.wish_status == 1)
                status = '有人接受！';
            if(ele.wish_status == 2)
                status = '已经过期';
            
            let acceptDate = ele.wish_status == 1 ?  `接收日期: ${ele.wish_accept_date}` : `截止到: ${ele.wish_deadline}`;
            return (
                <div key={ele.wish_id}>
                <Card key={ele.wish_id} >
                    <CardHeader
                    //title={`心愿状态 ${ele.wish_status == 0 ? '暂未接受' : '已经接受' }  ${ele.wish_pub_date} ~ ${ele.wish_deadline}`}
                    title={`${status} ${subtitle} `}
                    subtitle={`${acceptDate}`}
                    children={``}
                    />
                    <CardText style={{fontSize: '3vh'}}>
                    {ele.wish_detail}
                    </CardText>
                    <CardActions>
                        <RaisedButton onClick={() => this.handleDelete(ele.wish_id)} primary={true} label="删除心愿"/>
                    </CardActions>
                </Card>
                <br />
                </div>
            );
        });
        pubWishes = <div><br />我发布的<br /><br />{pubWishes}</div>;

        let acceptWishes = this.state.myAccept.map(ele => {
            return (
                <div key={ele.wish_id}>
                <Card key={ele.wish_id} >
                    <CardHeader
                    title={`${ele.wish_user_name} ${ele.wish_user_gender == 1 ? '男' : '女'} ${ele.wish_user_tel}`}
                    subtitle={`截止到 ${ele.wish_deadline}`}
                    avatar={ele.wish_user_headimgurl}
                    />
                    <CardText style={{fontSize: '3vh'}}>
                    {ele.wish_detail}
                    </CardText>
                </Card>
                <br />
                </div>
            );
        });

        acceptWishes = <div><br />我接受的<br /><br />{acceptWishes}</div>;


        return (
        <MuiThemeProvider>
        <Dialog
            title="我的心愿"
            actions={this.action}
            open={this.props.open}
            modal={false}
            onRequestClose={this.props.handleClose}
            autoScrollBodyContent={true}
        >
            {pubWishes}
            {acceptWishes}
        </Dialog>
        </MuiThemeProvider>
        );
    }
}