const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const mongoose = require('mongoose');
const Survey = mongoose.model('surveys'); // Rquired it in differently to avoid possible issues when testing

module.exports = (app) => {
	////////// Route of the user's dashboard. It must show a list of surveys /////////
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false,
		}); // equals:  {recipients: 0}

		res.send(surveys);
	});

	/////// Redirect route for users after clicking in the email /////////
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	///////// Handle click events received from sendgrid webhook /////////
	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');
		_.chain(req.body)
			.map((event) => {
				const match = p.test(new URL(event.url).pathname);
				if (match) {
					return {
						surveyId: match.surveyId,
						choice: match.choice,
						email: event.email,
					};
				}
			})
			.compact()
			.uniqWith((a, b) => a.email === b.email && a.surveyId === b.surveyId) // Cuz I read in Q&A that uniqBy doesn't accept third argument
			.each((event) => {
				Survey.updateOne(
					{
						_id: event.surveyId,
						recipients: {
							$elemMatch: {
								email: event.email,
								responded: false,
							},
						},
					},
					{
						$inc: { [event.choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date(),
					},
				).exec();
			})
			.value();

		res.send({});

		// Refactored this to the above shorthand with chaining
		// const events = _.map(req.body, (event) => {
		// 	const match = p.test(new URL(event.url).pathname);
		// 	if (match) {
		// 		return { surveyId: match.surveyId, choice: match.choice, email: event.email };
		// 	}
		// });
		// const compactEvents = _.compact(events);
		// const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
		// console.log(uniqueEvents);
		// res.send({});
	});

	///////// Route for sending the surveys /////////
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients
				.split(',')
				.map((email) => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user); // badan age action creator khasi nanevesht ke ino pass bede be reducer ke header update beshe, I'll be confused!
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
