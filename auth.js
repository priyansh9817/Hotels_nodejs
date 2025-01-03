// for call the passport function 
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;
//for authrntication 
const Person = require('./models/person')


// code for authentication
passport.use(new Localstrategy(async (username, password, done) => {
    // authentication logics here 
    try {
      //console.log('Recived credential:', username, password);  // this is why i comment bcz due to this we can see the password and id of user
      const user = await Person.findOne({ username: username });
      if (!user)
        return done(null, false, { message: "Incorrect username" });
  
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: "Incorrect password" })
      }
    } catch (err) {
      return done(err);
    }
  }))

  module.exports = passport; // export configured passport 