/**
 * GET /
 * the wonders of science frame
 */
exports.home = function(req, res) {
  res.render('science/home', {
    title: 'The Wonders of Science'
  });
};