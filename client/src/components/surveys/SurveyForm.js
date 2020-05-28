import React from 'react';
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends React.Component {
	render() {
		return (
			<div>
				{/* We wrap the Field component in <form> to be able to submit it */}
				<form
					onSubmit={this.props.handleSubmit((values) => console.log(values))}>
					<Field type="text" name="surveyTitle" component="input" />
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'surveyForm',
})(SurveyForm);
