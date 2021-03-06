/**
 * Module dependencies.
 */
var express = require('express');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var dotenv = require('dotenv');
var MongoStore = require('connect-mongo/es5')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var sass = require('node-sass-middleware');
var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({ path: '/home/nitrous/code/app/.env' });

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');
var gunController = require('./controllers/gun');
var eldController = require('./controllers/eld');
var bullseyeController = require('./controllers/bullseye');
var bangoController = require('./controllers/beingbango');

/**
 * API keys and Passport configuration.
 */
var passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();



/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(e) {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  // After successful login, redirect back to /api, /contact or /
  if (/(api)|(contact)|(^\/$)/i.test(req.path)) {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
* Showcase routes
*/
app.get('/gunmedown', gunController.gun);
app.get('/eld', eldController.eld);
  app.get('/eld/arma2/unban', eldController.unban);
  app.get('/eld/epoch/unban', eldController.unban);
app.get('/bullseye', bullseyeController.home);
  app.get('/bullseye/prostaff', bullseyeController.prostaff);
    app.get('/bullseye/prostaff/jodi', bullseyeController.jodi);
    app.get('/bullseye/prostaff/curt', bullseyeController.curt);
  app.get('/bullseye/colors', bullseyeController.colors);
    app.get('/bullseye/colors/452x', bullseyeController.x452);
    app.get('/bullseye/colors/8190', bullseyeController.x8190);
    app.get('/bullseye/colors/xs2', bullseyeController.xs2);
  app.get('/bullseye/order', bullseyeController.order);
  app.get('/bullseye/contact', bullseyeController.contact);
  app.get('/bullseye/success', bullseyeController.success);
  app.get('/bullseye/cancel', bullseyeController.cancel);
app.get('/being-bango', bangoController.home);
  app.get('/being-bango/browning', bangoController.browning);
  app.get('/being-bango/einstein', bangoController.einstein);
  app.get('/being-bango/lloyd', bangoController.lloyd);
  app.get('/being-bango/plan', bangoController.plan);
  app.get('/being-bango/sparta', bangoController.sparta);


/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/lastfm', apiController.getLastfm);
app.get('/api/nyt', apiController.getNewYorkTimes);
app.get('/api/aviary', apiController.getAviary);
app.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
app.get('/api/stripe', apiController.getStripe);
app.post('/api/stripe', apiController.postStripe);
app.get('/api/scraping', apiController.getScraping);
app.get('/api/twilio', apiController.getTwilio);
app.post('/api/twilio', apiController.postTwilio);
app.get('/api/clockwork', apiController.getClockwork);
app.post('/api/clockwork', apiController.postClockwork);
app.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
app.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
app.get('/api/venmo', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getVenmo);
app.post('/api/venmo', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postVenmo);
app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
app.get('/api/yahoo', apiController.getYahoo);
app.get('/api/paypal', apiController.getPayPal);
app.get('/api/paypal/success', apiController.getPayPalSuccess);
app.get('/api/paypal/cancel', apiController.getPayPalCancel);
app.get('/api/lob', apiController.getLob);
app.get('/api/bitgo', apiController.getBitGo);
app.post('/api/bitgo', apiController.postBitGo);
app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
app.get('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getPinterest);
app.post('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postPinterest);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});

/**
 * OAuth authorization routes. (API examples)
 */
app.get('/auth/foursquare', passport.authorize('foursquare'));
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/foursquare');
});
app.get('/auth/tumblr', passport.authorize('tumblr'));
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/tumblr');
});
app.get('/auth/venmo', passport.authorize('venmo', { scope: 'make_payments access_profile access_balance access_email access_phone' }));
app.get('/auth/venmo/callback', passport.authorize('venmo', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/venmo');
});
app.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
app.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
app.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/api/pinterest');
});

/**
 * Error Handler.
 */
app.use(errorHandler());

var allClients = [];
var index = 0;
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

//someone connected
io.on('connection', function(socket){
  console.log('someone connected');
  var az = Math.floor((Math.random() * 360) + 1);
  if (az % 2 == 1) {
    az = (az + 1) % 360;
  }
  //set up the new player
  var player = {
    'id': (index++).toString(),
    'x': (Math.floor((Math.random() * 500) + 1)).toString(),
    'y': (Math.floor((Math.random() * 500) + 1)).toString(),
    'az': az.toString(),
    'r': (Math.floor((Math.random() * 255) + 1)).toString(),
    'g': (Math.floor((Math.random() * 255) + 1)).toString(),
    'b': (Math.floor((Math.random() * 255) + 1)).toString(),
    'h': "1"
  };
  //i shall call him index
  socket.id = player.id;
  socket.player = player;
  //make array of everyone before him, to send him
  var players = [];
  for (var i = 0; i < allClients.length; i++) {
    players.push(allClients[i].player);
  }
  socket.emit('you', player.id);
  socket.emit('get bearings', players);
  allClients.push(socket);
  //everyone now has him
  io.emit('new player', socket.player);


  /*
   * SOCKET RECEIVE FUNCTIONS
   */

  //someone sent a chat message
  socket.on('chat message', function(arr){
    io.emit('chat message', arr);
  });

  //someone disconnected
  socket.on('disconnect', function(){
     console.log('someone disconnected');
    var i = allClients.indexOf(socket);
    io.emit('player disconnect', allClients[i].player.id);
    allClients.splice(i, 1);
  });

  //someone updated themselves
  socket.on('update', function(arr) {
    for (var i = 0; i < allClients.length; i++) {
      if (allClients[i].player.id == arr.id) {
        allClients[i].player.x = arr.x;
        allClients[i].player.y = arr.y;
        allClients[i].player.az = arr.az;
        allClients[i].player.r = arr.r;
        allClients[i].player.g = arr.g;
        allClients[i].player.b = arr.b;
        allClients[i].player.h = arr.h;
        var player = allClients[i].player;
        player.forceUpdate = arr.forceUpdate ? true : false;
        io.emit('update player', player);
        break;
      }
    }
  });
});


server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
/**
 * Start Express server.
 */
// app.listen(app.get('port'), function() {
//   console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
// });

module.exports = app;
