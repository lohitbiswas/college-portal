const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const { errorMonitor } = require('nodemailer/lib/xoauth2');
const prisma = new PrismaClient();

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: 'http://localhost:8085/student/auth/google/callback',
    scope: ['profile', 'email'], 
}, async (accessToken, refreshToken, profile, done) => {

    try{
        return done(null,profile);
    }
    catch{
        return done(error,null); 
    }
    
}));

passport.serializeUser((student, done) => {
    done(null, student.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const student = await prisma.student.findUnique({ where: { id: +id } });
        done(null, student);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
