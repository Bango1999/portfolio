/**
 * GET /
 * ELD Clan page.
 */
exports.eld = function(req, res) {
  res.render('eld/eld', {
    title: 'ELD Clan'
  });
};

/**
 * GET /
 * ELD unban page.
 */
exports.unban = function(req, res) {
  res.render('eld/unban', {
    title: 'Unban Form - ELD'
  });
};
