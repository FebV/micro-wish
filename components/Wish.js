import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Wish extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            width: '100%',
            fontFamily: 'Microsoft Yahei',
            margin: '30px',
            opacity: 0.9,
        }
        this.state = {
            wish_id: this.props.wish_id,
        }
    }


    render() {
        return (
            <MuiThemeProvider>
            <Card style={this.style}>
                <CardHeader
                    title={`${this.props.wish_user_name} ${this.props.wish_user_gender}`}
                    subtitle={`发布时间 ${this.props.wish_pub_date}   截止时间 ${this.props.wish_deadline}`}
                />
                <CardText style={{fontSize: '3vh'}}>
                    {this.props.wish_detail}
                </CardText>
                <CardActions>
                    <RaisedButton  label="接受心愿" onClick={() => this.props.handleAccept(this.props.wish_id)} primary={true} />
                </CardActions>
            </Card>
            </MuiThemeProvider>
        );
    }
}