import React from 'react'
import { connect } from 'react-redux'
import DOMPurify from 'dompurify'
import 'jquery';
import 'bootstrap/dist/js/bootstrap';


import {api} from '../helpers/action'
import {Alert} from '../helpers/component'
import Blog from './BlogComp'

// post list widget
class PostListItem extends React.Component {
	constructor(props) {
		super(props);
	}
	removePost (e) {
		e.preventDefault();
		this.props.removePost(this.props.item._id);
	}
	render () {
		let postLink = `/my-post-detail/${this.props.blogId}/${this.props.item._id}`;
		return <div className="col-md-4">
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className='panel-title'>
						<span className='glyphicon glyphicon-file'></span>&nbsp;&nbsp;
						<a href={postLink}>{this.props.item.name}</a>
					</h4>
				</div>
				<div className="panel-body">
					<div
						dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.item.description)}}
					></div>
					<p>
						Status: {this.props.item.status}&nbsp;&nbsp;
						Approved: {this.props.item.approved}&nbsp;&nbsp;
					</p>
					<p>
						<span className='glyphicon glyphicon-time'></span>&nbsp;&nbsp;
						Created: {this.props.item.created}<br />
						Updated: {this.props.item.updated}<br />
						<button className="btn btn-danger btn-xs" type="button" onClick={::this.removePost}>
							<span className='glyphicon glyphicon-trash'></span>
						</button> Remove

					</p>
				</div>
			</div>
		</div>
	}
}

class PostList extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'POST_LIST',
			fetch: 'blog.getMyBlogPosts',
			_id: this.props.postList.blogId
		}));
	}

	removePost (_id) {
		this.props.dispatch(api({
			type: 'POST_REMOVE',
			fetch: 'blog.removePost',
			_id: _id,
		}));
	}
	render () {
		let alertOpts = null,
			postList = null;

		if (this.props.postList.fetch_status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.postList.fetch_error
			}
		} else if (this.props.postList.fetch_status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		if (this.props.postList.list && this.props.postList.list.length) {
			postList = this.props.postList.list.map((val) => {
				return <PostListItem
					key={val._id}
					item={val}
					blogId={this.props.postList.blogId}
					removePost={::this.removePost}
				/>
			});
		}

		return <div>
			<Alert opts={alertOpts} />
			<div className='row'>
				{postList}
			</div>
		</div>

	}
}
const postStateToProps = (state) => {
	return {postList: state.postList};
}
PostList = connect(postStateToProps)(PostList);
export default PostList;