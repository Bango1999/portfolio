var path = require('path');
/**
 * GET /
 * Bullseye Home
 */
exports.home = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'index.html'));
};

/**
 * GET /
 * Bullseye Prostaff
 */
exports.prostaff = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'prostaff.html'));
};

/**
 * GET /
 * Bullseye Colors
 */
exports.colors = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'colors.html'));
};

/**
 * GET /
 * Bullseye Order
 */
exports.order = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'order.html'));
};

/**
 * GET /
 * Bullseye Contact
 */
exports.contact = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'contact.html'));
};

/**
 * GET /
 * Bullseye Curt
 */
exports.curt = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'curt.html'));
};

/**
 * GET /
 * Bullseye Jodi
 */
exports.jodi = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'jodi.html'));
};

/**
 * GET /
 * Bullseye 8190
 */
exports.x8190 = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', '8190.html'));
};

/**
 * GET /
 * Bullseye 452x
 */
exports.x452 = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', '452x.html'));
};

/**
 * GET /
 * Bullseye XS2
 */
exports.xs2 = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'xs2.html'));
};

/**
 * GET /
 * Bullseye payment
 */
exports.payment = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'payment.html'));
};

/**
 * GET /
 * Bullseye Cancel
 */
exports.cancel = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'cancel.html'));
};

/**
 * GET /
 * Bullseye Success
 */
exports.success = function(req, res) {
  res.sendFile(path.join(__dirname, '../views/bullseye', 'success.html'));
};
