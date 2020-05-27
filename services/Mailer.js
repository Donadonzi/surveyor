const keys = require('../config/keys');
const sendgrid = require('sendgrid');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super();

		// These config stuff is how sendgrid expects to be
		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email('donadonzi@gmail.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body); // Cuz the above is not enough by itself. This is from helper.Mail class itself

		this.addClickTracking(); // I define this myself
		this.addRecipients();
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	addClickTracking() {
		// We have to write it like this cuz sendgrid says so!
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();

		this.recipients.forEach((recipient) => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON(),
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
