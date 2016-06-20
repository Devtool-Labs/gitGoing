var router = require('express').Router();

router.route('/signin')
  .get(function(req,res) {
    res.render('./signin.html');
  });

module.exports = router;
