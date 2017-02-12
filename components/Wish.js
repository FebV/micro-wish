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
    }

    render() {
        return (
            <MuiThemeProvider>
            <Card style={this.style}>
                <CardHeader
                    title="韩楚怡"
                    subtitle="80岁"
                />
                <CardText style={{fontSize: '3vh'}}>
                    我的心愿就是，牙不要再疼了，真的真的，不要再疼了，谁来帮帮我呢
                </CardText>
                <CardActions>
                    <RaisedButton  label="接受心愿" primary={true} />
                </CardActions>
            </Card>
            </MuiThemeProvider>
        );
    }
}