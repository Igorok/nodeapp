import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import AuthForm from '../containers/AuthForm'

const App = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer />
		<br />
		<AuthForm login = 'vasya' />
	</div>
)

export default App
