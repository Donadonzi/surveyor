const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

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

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server is up!');
});
