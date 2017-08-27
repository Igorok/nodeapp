import React from 'react'
import { connect } from 'react-redux'

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';


import {api} from '../helpers/action'
import {Alert} from '../helpers/component'

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
	
	froalaConfig = {
		toolbarButtons: [
			'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'help', 'html', '|', 'undo', 'redo'
		],
	}

	fieldChange (e) {
		let stateObj = {};
		stateObj[e.target.id] = e.target.value;
		this.setState(stateObj);
	}

	handleModelChange (text) {
		this.setState({
			description: text,
		});
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
							<Alert opts={alertOpts} />

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
								<label htmlFor="description">Description</label>

								<FroalaEditor 
									tag='textarea'
									model={this.state.description}
									onModelChange={::this.handleModelChange}
									config = {this.froalaConfig}
								/>
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
						</div>
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