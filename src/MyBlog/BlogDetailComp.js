import React from 'react'
import { connect } from 'react-redux'
import 'jquery';
import 'bootstrap/dist/js/bootstrap';


import {api} from '../helpers/action'
import {Alert} from '../helpers/component'
import Blog from './BlogComp'
import PostList from './PostListComp'


class BlogDetailComp extends React.Component {
	render () {		
		return <div>
			<Blog />
			<PostList />
		</div>
		
	}
}
export default BlogDetailComp