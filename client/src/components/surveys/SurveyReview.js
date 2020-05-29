import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyReview = (props) => {
	const reviewFields = formFields.map(({ label, name }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{props.formValues[name]}</div>
			</div>
		);
	});
	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={props.onCancel}>
				Back
			</button>
			<button
				onClick={() => props.submitSurvey(props.formValues, props.history)}
				className="green btn-flat right white-text">
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
