import React from 'react';
import {baseUrl} from '../config/config';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


export default class MyWish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myPub: [],
            myAccept: [],
        }
        fetch(baseUrl+'/user/wish_pub?head=0&rows=10', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => {
                if(res.status == 200) {
                    this.setState({myPub: res.data});
                }
            });
        fetch(baseUrl+'/user/wish_accept?head=0&rows=10', {
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
            body: encodeURIComponent(`wish_id=${id}`),
            credentials: 'include',
        })
            .then(res => res.text())
            .then(res => {alert(res)});
    }

    render() {

        let pubWishes = this.state.myPub.map((ele, idx) => {
            console.log(idx);
            return (
                <div key={ele.wish_id}>
                <Card key={ele.wish_id} >
                    <CardHeader
                    title={`心愿状态 ${ele.wish_statue}  ${ele.wish_pub_date}-${ele.wish_deadline}`}
                    subtitle={`${ele.wish_accept_user_name} ${ele.wish_accept_date} ${ele.wish_accept_tel}`}
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
        pubWishes = <div>我发布的<br />{pubWishes}</div>;

        let acceptWishes = this.state.myAccept.map(ele => {
            return (
                <div key={ele.wish_id}>
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

        acceptWishes = <div>我接受的<br />{acceptWishes}</div>;


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