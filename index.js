const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

// Use body-parser as a middleware to parse the request body and make it availabe at req.body
app.use(bodyParser.json());

// Tell express about the cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	}),
);

// Tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app); // This works too instead of that:     require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app);

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets like main.js or main.css
	app.use(express.static('client/build'));

	// Express will serve up the index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server is up!');
});
