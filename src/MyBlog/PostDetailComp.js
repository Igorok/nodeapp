import React from 'react'
import { connect } from 'react-redux'

import {api} from '../helpers/action'
import {Alert} from '../helpers/component'

class PostDetailComp extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'POST_DETAIL',
			fetch: 'blog.getMyPostDetail',
			_id: this.props.postDetail.postId
		}));
	}
	render () {		
		let alertOpts = null,
			blogLink = '/my-blog-detail/' + this.props.postDetail._bId;
		
		if (this.props.postDetail.fetch_status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.error
			}
		} else if (this.props.postDetail.fetch_status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		
		return <div >
			<Alert opts={alertOpts} />

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

				
				<li className="active">{this.props.postDetail.name}</li>
			</ol>

			<div className="panel panel-default">
				<div className="panel-body">
					<p>
						<span className='glyphicon glyphicon-user'></span>&nbsp;&nbsp;
						{this.props.postDetail.user}&nbsp;&nbsp;
						<span className='glyphicon glyphicon-time'></span>&nbsp;&nbsp;
						{this.props.postDetail.created}
					</p>
					<p className='h4'>
						{this.props.postDetail.name}
					</p>
					<p>{this.props.postDetail.description}</p>
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