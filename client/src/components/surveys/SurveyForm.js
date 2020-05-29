import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {

	renderFields() {
		return formFields.map(({ label, name }) => {
			return (
				<Field
					key={name}
					type="text"
					component={SurveyField}
					label={label}
					name={name}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				{/* We wrap the Field component in <form> to be able to submit it */}
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						<i className="material-icons right">done</i>
						Next
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || ''); // || '' ==> Cuz when the app boots up, the list is empty so throws an error of not being able to read blah blah

	formFields.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `This field is required.`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false,
})(SurveyForm);
