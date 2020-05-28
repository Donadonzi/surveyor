// SurveyNew is the parent component of SurveyForm and SurveyReview. It's responsible for showing them and toggling

import React from 'react';
import SurveyForm from './SurveyForm';

class SurveyNew extends React.Component {
	render() {
		return (
			<div>
				<SurveyForm />
			</div>
		);
	}
}

export default SurveyNew;
