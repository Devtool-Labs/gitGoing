var router = require('express').Router();

router.route('/signin')
  .get(function(req,res) {
    res.render('./signin.html');
  });

router.route('/testapi')
  .get(function(req,res) {
    res.json({hey: 'hey'});
  });

module.exports = router;
