import React from 'react'

class UserItemComp extends React.Component {
    render () {
        let cName = 'label label-';
        if (this.props.user.online) {
            cName += 'success';
        } else {
            cName += 'danger';
        }

        return <span><span className={cName}>
            {this.props.user.login}
        </span>&nbsp;</span>
    }
}

class UserListComp extends React.Component {
    render () {
        let userList = this.props.users.map((val) => {
            return <UserItemComp user={val} key={val._id}/>
        });
        return <div>{userList}</div>
    }
}
export default UserListComp;