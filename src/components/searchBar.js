import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class SearchBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.props.submitHandler}>
                <Field className="form-control search-input" type="text" placeholder="Search any planet" name="query" component="input" onChange={event=> this.props.planetSearch(event.target.value)}/>
                <button className="btn btn-rounded " type="submit">Search</button>
            </form>
        )

    }
}

export default reduxForm({
    form: 'searchForm'
})(SearchBar);