module.exports = function(app, passport, db) {
  ObjectID = require('mongodb').ObjectID
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('list').find({name: req.user.local.email}).toArray((err, result) => {
  
          if (err) return console.log(err)
          let nyc = result.filter(hash => hash.dropDown === 'dropDown_newYork')
          let philly = result.filter(hash => hash.dropDown === 'dropDown_philadelphia')
          let boston = result.filter(hash => hash.dropDown === 'dropDown_boston')
          let pittsburgh = result.filter(hash => hash.dropDown === 'dropDown_pittsburgh')
          // do it for the other cities
          let arr = [nyc,boston,philly,pittsburgh].flat()
          res.render('profile.ejs', {
            user : req.user,
            list: arr
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      console.log(req.body.jobListing)
      console.log(req.body.connect)
      db.collection('list').insertOne(
        {
        name: req.body.name,
        jobListing: req.body.jobListing, 
        connect: req.body.connect, 
        msg: req.body.msg,
        dropDown: req.body.dropDown
      },
    (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile');
      });
    })

    // 11/4, 1:21PM, tested logic below. 
    // green checkbox tested and it does not return false when clicked after it returns true. (you can't uncheck)

    app.put('/editMsg', (req, res) => {

      db.collection('list').findOneAndUpdate(
        {
         _id: ObjectID(req.body._id)

        },
        {
          // $set explanation
        $set: {
          msg: req.body.msg
        },
      }, 
      {
        sort: {_id: -1},
        upsert: true
      }, 
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      }
    )
  })

    app.delete('/delete', (req, res) => {
      db.collection('list').findOneAndDelete({
        name: req.body.name, 
        msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('deleted')
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
