# Surveyor App

*	An application for sending out surveys and collecting back data, built using `Node.js`, `Express`, `React.js`, `Redux/Redux Form` and `MongoDB Atlas`
* User login on server side with `Google OAuth` and `Passport.js`
* Cookie based authentication with `Cookie Session` library
*	Handling payments with `React Stripe Checkout` and `Stripe Node.js`
*	Allows users to send customized surveys to their own recipients
* Uses `SendGrid` and its event webhook for sending emails and click tracking

#### Environment variables

   In order to run the server in dev mode, you need to create `dev.js` file in `/server/config` with the following content:

```
module.exports = {
	googleClientID: <GOOGLE_CLIENT_ID>,
	googleClientSecret: <GOOGLE_CLIENT_SECRET>,
	mongoURI:
		'mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-5qb2z.mongodb.net/<DB_NAME>?retryWrites=true&w=majority',
	cookieKey: <COOKIE_KEY>,
	stripePublishableKey: <STRIPE_PUBLISHABLE_KEY>,
	stripeSecretKey: <STRIPE_SECRET_KEY>,
	sendGridKey: <SENDGRID_KEY>,
	redirectDomain: 'http://localhost:3000',
};
```
