import React from 'react'
import { connect } from 'react-redux'
import DOMPurify from 'dompurify'

import {api} from '../helpers/action'
import {Alert} from '../helpers/component'

// blog widget
class Blog extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'BLOG_DETAIL',
			fetch: 'blog.getBlogDetail',
			_id: this.props.blogDetail.blogId
		}));
	}
	render () {
		let alertOpts = null;
		
		if (this.props.blogDetail.status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.blogDetail.error
			}
		} else if (this.props.blogDetail.status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		return <div>
			<ol className="breadcrumb">
				<li>
					<a href="/blog-list">
						<span className='glyphicon glyphicon-bookmark'></span>&nbsp;
						Blogs
					</a>
				</li>
				<li className="active">{this.props.blogDetail.name}</li>
			</ol>
		
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className='panel-title'>
						{this.props.blogDetail.name}
					</h4>
				</div>
				<div className="panel-body">
					<Alert opts={alertOpts} />
					<p >
						{this.props.blogDetail.description}
					</p>
					<p>
						<span className='glyphicon glyphicon-user'></span>&nbsp;&nbsp;
						{this.props.blogDetail.user}&nbsp;&nbsp;
						<span className='glyphicon glyphicon-time'></span>&nbsp;&nbsp;
						{this.props.blogDetail.created}
					</p>
				</div>
			</div>
		</div>
	}
}
const blogStateToProps = (state) => {
	return {blogDetail: state.blogDetail};
}
Blog = connect(blogStateToProps)(Blog);

// post list widget
class PostListItem extends React.Component {
	render () {
		let postLink = '/post-detail/' + this.props.item._id;
		return <div className="col-md-4">
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className='panel-title'>
						<a href={postLink}>{this.props.item.name}</a>
					</h4>
				</div>
				<div className="panel-body">
					<div
						dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.item.description)}}
					></div>
					<p>
						<span className='glyphicon glyphicon-user'></span>&nbsp;&nbsp;
						{this.props.item.user}&nbsp;&nbsp;
						<span className='glyphicon glyphicon-time'></span>&nbsp;&nbsp;
						{this.props.item.created}
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
			fetch: 'blog.getBlogPosts',
			_id: this.props.postList.blogId
		}));
	}
	render () {
		let alertOpts = null,
			postList = null;
		
		if (this.props.postList.status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.error
			}
		} else if (this.props.postList.status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		if (this.props.postList.list && this.props.postList.list.length) {
			postList = this.props.postList.list.map((val) => {
				return <PostListItem key={val._id} item={val} />
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


class BlogDetailComp extends React.Component {
	render () {		
		return <div>
			<Blog />
			<PostList />
		</div>
		
	}
}
export default BlogDetailComp