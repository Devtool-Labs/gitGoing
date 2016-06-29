const router = require('express').Router();
//const passport = require('passport');
const github = require('../util/githubInterface');
const redisUtil = require('../util/redisUtil');
const isAuthenticated = require('../util/authentication.js');

module.exports = function(app, passport, redisClient) {
  const rUtil = redisUtil(redisClient);
  const cache = require('../util/cache.js')(redisClient);

  router.route('/repo/:repo/createroom')
    .post(function(req,res) {
      if(req.params.repo === undefined) {
        return res.json({err: 'repo not defined' });
      }
      const repo = req.params.repo;
      rUtil.setNewRoom(req.user.id, repo)
        .then(function(room) {
          res.json(room);
        })
    })
    .get(function(req,res) {
      if(req.params.repo === undefined) {
        return res.json({err: 'repo not defined' });
      }
      const repo = req.params.repo;
      rUtil.setNewRoom(req.user.id, repo)
        .then(function(room) {
          res.json(room);
        })
    });

  router.route('/user')
    .get(function(req,res) {
      res.json(req.user);
    });

  router.route('/room/:roomid/branch')//get all branches
    .get(function(req,res) {
      const path = {
        roomId: req.params.roomid,
      }
      cache.getBranches(req.user, path)
      .then((data) => {res.json(data)})
    });

  router.route('/room/:roomid/branch/:branch')//get a branch
    .get(function(req,res) {
      const path = {
        roomId: req.params.roomid,
        branch: req.params.branch
      }
      cache.getBranch(req.user, path)
      .then((data) => {
        res.json(data)
      });
    });

  router.route('/room/:roomid/commits')//get commits
    .get(function(req, res) {
      const path = {
        roomId: req.params.roomid
      }
      cache.getCommits(req.user, path)
      .then((data) => {
        res.json(data)
      });
    });

  router.route('/room/:roomid/git/tree/:sha')//get a fileTree
    .get(function(req,res) {
      const path = {
        roomId: req.params.roomid,
        sha: req.params.sha
      };
      cache.getFileTree(req.user, path)
      .then((data) => {res.json(data)});
    })
    
  router.route('/room/:roomid/sha/:sha/file/*')//get a file
    .get(function(req, res) {
      const path = {
        roomId: req.params.roomid,
        sha: req.params.sha,
        file: req.url.split('/file/')[1]
      };
      cache.getFile(req.user, path)
      .then((data) => {res.json(data)});
    })

  router.route('/auth/github')
    .get(passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.route('/auth/github/callback')
    .get(passport.authenticate('github', { failureRedirect: '/signin' }),
    function(req, res) {
      if(req.user) {
        const userId = req.user.profile.id;
        const userObj = {
          id: userId,
          accessToken: req.user.accessToken,
          displayName: req.user.profile.displayName,
          username: req.user.profile.username,
          profileUrl: req.user.profile.profileUrl,
          provider: req.user.profile.provider,
          photos: req.user.profile.photos 
        }
        rUtil.setUserToken(userId, req.user.accessToken);
      }
      res.redirect('/');
    });

  app.use('/api', router);

}
