// SurveyNew is the parent component of SurveyForm and SurveyReview. It's responsible for showing them and toggling

import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends React.Component {
	state = { showReview: false };

	renderContent() {
		if (this.state.showReview) {
			return (
				<SurveyReview onCancel={() => this.setState({ showReview: false })} />
			);
		}
		return (
			<SurveyForm onSurveySubmit={() => this.setState({ showReview: true })} />
		);
	}
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'surveyForm',
})(SurveyNew);
