import React from 'react';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';




class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }

    showModal () {
        $('.modal').modal('show');
    }
    render () {
        return <div className="panel panel-default">
            <div className="panel-heading">About</div>
            <div className="panel-body">
                I am web developer. I had planned these few personal pages for implement and checking some of my ideas. Sometimes i write here short notes about my work and development.
            </div>
        </div>
    }
}
export default About