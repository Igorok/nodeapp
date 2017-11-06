import React from 'react'
import { connect } from 'react-redux'

import {api} from '../helpers/action'
import {Alert, TextEditor} from '../helpers/component'

class PostDetailComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.postDetail._id,
            name: this.props.postDetail.name,
            description: this.props.postDetail.description,
            status: this.props.postDetail.status,
        }
        this.statArr = [
            {key: 'write', text: 'Write'},
            {key: 'publish', text: 'Publish'},
            {key: 'archive', text: 'Archive'},
        ];
    }
    fieldChange (e) {
        let stateObj = {};
        stateObj[e.target.id] = e.target.value;
        this.setState(stateObj);
    }
    setDescription (description) {
        this.setState({description: description});
    }

    formSubmit (e) {
        e.preventDefault();

        this.props.dispatch(api({
            type: 'POST_EDIT',
            fetch: 'blog.editMyPostDetail',
            _id: this.state._id,
            status: this.state.status,
            name: this.state.name,
            description: this.state.description,
        }));
    }

    componentWillMount () {
        this.props.dispatch(api({
            type: 'POST_DETAIL',
            fetch: 'blog.getMyPostDetail',
            _id: this.props.postDetail.postId
        }));
    }
    componentWillReceiveProps (newProps) {
        this.setState({
            _id: newProps.postDetail._id,
            name: newProps.postDetail.name,
            description: newProps.postDetail.description,
            status: newProps.postDetail.status,
        });
    }

    render () {
        let alertOpts = null,
            blogLink = '/my-blog-detail/' + this.props.postDetail._bId;
        

        if (
            this.props.postDetail.fetch_status === 'error' ||
            this.props.postDetail.fetch_status === 'error_edit'
        ) {
            alertOpts = {
                className: 'danger',
                text: this.props.postDetail.fetch_error
            }
        } else if (
            this.props.postDetail.fetch_status === 'send' ||
            this.props.postDetail.fetch_status === 'send_edit'
        ) {
            alertOpts = {
                className: 'info',
                text: 'Loading, please wait',
            }
        } else if (this.props.postDetail.fetch_status === 'success_edit') {
            alertOpts = {
                className: 'success',
                text: 'Updated successfully!',
            }
        }
        
        return <div >
            <ol className="breadcrumb">
                <li>
                    <a href="/profile">
                        <span className='glyphicon glyphicon-home'></span>&nbsp;
                        Profile
                    </a>
                </li>
                <li>
                    <a href="/my-blog-list">
                        My blogs
                    </a>
                </li>
                <li>
                    <a href={blogLink}>
                        {this.props.postDetail.blogName}
                    </a>
                </li>
                <li className="active">
                    {this.state.name}
                </li>
            </ol>

            <div className="panel panel-default">
                <div className="panel-body">
                    <form onSubmit={::this.formSubmit}>
                        <div className="modal-body">
                            

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    placeholder="Name" 
                                    onChange={::this.fieldChange}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                            </div>
                            <div className="form-group">
                                <select 
                                    id = 'status'
                                    className="form-control" 
                                    value = {this.state.status}
                                    onChange = {::this.fieldChange}
                                >
                                    {this.statArr.map((v) => {
                                        return <option 
                                            value = {v.key}
                                            key = {v.key}
                                        >
                                            {v.text}
                                        </option>
                                    })}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label >Description</label>
                                <TextEditor 
                                    description={this.state.description} 
                                    cb={::this.setDescription} 
                                />
                            </div>

                        </div>
                        <Alert opts={alertOpts} />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">
                                <span className='glyphicon glyphicon-floppy-disk'></span>&nbsp;
                                Save changes
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {...state};
}
PostDetailComp = connect(mapStateToProps)(PostDetailComp);

export default PostDetailComp