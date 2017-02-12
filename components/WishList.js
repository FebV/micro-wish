import React from 'react';
import Wish from './Wish'

const baseUrl = 'http://wesdu.com';

export default class WishLish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishList: []
        }
        this.getWishList();
    }

    getWishList() {
        fetch(baseUrl+'/wish/list')
            .then(res => res.json())
            .then(res => {
                res.map(ele => <Wish
                    wish_id={ele.wish_id}
                    wish_detail={ele.wish_detail}
                    wish_user_name={ele.wish_user_name}
                    wish_pub_date={ele.wish_pub_date}
                    wish_deadline={ele.wish_deadline}
                    wish_user_gender={ele.wish_user_gender}
                />)
            });
    }

    render() {
        return (
        <div style={{width: '100%', paddingTop:'10%', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '60%'}}>
                {this.state.wishList.map(ele => ele)}
            </div>
        </div>
        )
    }
}