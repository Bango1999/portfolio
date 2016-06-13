/**
 * GET /
 * Gun Me Down page.
 */
exports.gun = function(req, res) {
  res.render('gun', {
    title: 'Gun Me Down!'
  });
};