var path = require('path');
/**
 * GET /
 * Being Bango Home
 */
exports.home = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/beingbango', 'index.html'));
};

/**
 * GET /
 * Being Bango browning
 */
exports.browning = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/beingbango', 'browning.html'));
};

/**
 * GET /
 * Being Bango einstein
 */
exports.einstein = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/beingbango', 'einstein.html'));
};

/**
 * GET /
 * Being Bango lloyd
 */
exports.lloyd = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/beingbango', 'loyd.html'));
};

/**
 * GET /
 * Being Bango plan
 */
exports.plan = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/beingbango', 'plan.html'));
};

/**
 * GET /
 * Being Bango sparta
 */
exports.sparta = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/beingbango', 'sparta.html'));
};