import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails' },
];

class SurveyForm extends React.Component {
	/////// Refactored this al DRY ! ///////
	// renderFields() {
	// 	return (
	// <div>
	// 	<Field
	// 		type="text"
	// 		name="title"
	// 		component={SurveyField}
	// 		label="Survey Title"
	// 	/>

	// 	<Field
	// 		type="text"
	// 		name="subject"
	// 		component={SurveyField}
	// 		label="Subject Line"
	// 	/>

	// 	<Field
	// 		type="text"
	// 		name="body"
	// 		component={SurveyField}
	// 		label="Email Body"
	// 	/>

	// 	<Field
	// 		type="text"
	// 		name="emails"
	// 		component={SurveyField}
	// 		label="Recipient List"
	// 	/>
	// </div>
	// 	);
	// }

	renderFields() {
		return FIELDS.map(({ label, name }) => {
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
				<form
					onSubmit={this.props.handleSubmit((values) =>
						console.log(values, 'khar'),
					)}>
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

	errors.emails = validateEmails(values.emails || ''); // || '' ==> Cuz when the app bootas up, the list is empty so throws an error of not being able to read blah blah

	FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `This field is required.`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
})(SurveyForm);
