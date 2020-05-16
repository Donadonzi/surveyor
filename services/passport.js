const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		// async (accessToken, refreshToken, profile, done) => {
		// 	const user = await User.findOne({ googleId: profile.id });
		// 	if (user) {
		// 		console.log('User already exists!');
		// 		done(null, user); // first arg = error, second = we send back the user we found to passport
		// 	} else {
		// 		const user = new User({ googleId: profile.id });
		// 		await user.save();
		// 		console.log('Saved new user');
		// 		done(null, user);
		// 	}
		// },
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ googleId: profile.id }).save().then((user) => {
						done(null, user);
					});
				}
			});
		},
	),
);
