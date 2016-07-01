const router = require('express').Router();
//const passport = require('passport');
const atob = require('atob');
const github = require('../util/githubInterface');
const redisUtil = require('../util/redisUtil');
const auth = require('../util/authentication.js');


module.exports = function(app, passport, redisClient) {
  const rUtil = redisUtil(redisClient);
  const cache = require('../util/cache.js')(redisClient);
  
  let rooms = [{roomNumber: 1, roomName: 'Brandon\'s Room', repoName: 'Roam'}, {roomNumber: 2, roomName: 'Symphonic Dust\'s room', repoName: 'Symphonic Dust'}, {roomNumber: 3, roomName: 'Veena\'s Room', repoName: 'Roam'}, {roomNumber: 4, roomName: 'Sean\'s room', repoName: 'u-do-u'}];

  router.route('/rooms/getAll')
    .get(auth.apiAuthRedirect, function(req, res) {
      res.json(rooms);
    });
    // hello meow cat

  router.route('/repo/:repo/createroom')
    .post(auth.apiAuthRedirect, function(req,res) {
      const repo = req.params.repo;
      rUtil.setNewRoom(req.user.id, repo)
        .then(function(room) {
          console.log('room = ', room);      // room = { roomId: 110, hostId: '7043747', repo: 'HowsTheWeather' }                       
          res.json(room);                    // then respond with FrontEnd with { roomId: 110, hostId: '7043747', repo: 'HowsTheWeather' }     
        })
        .catch(function (err) {
          res.json('There was an error in creating your room. Please try again.');
        });
    })
    .get(auth.apiAuthRedirect, function(req,res) {
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
    .get(auth.apiAuthRedirect, function(req,res) {
      res.json(req.user);
    });

  router.route('/room/:roomid')
    .get(auth.apiAuthRedirect, function(req,res) {
      rUtil.getRoom(req.params.roomid)
      .then(function(room) {
        return res.json(room);
      });
    });

  router.route('/room/:roomid/branch')//get all branches
    .get(auth.apiAuthRedirect, function(req,res) {
      const path = {
        roomId: req.params.roomid,
      }
      cache.getBranches(req.user, path)
      .then((data) => {res.json(data)})
    });

  router.route('/room/:roomid/branch/:branch')//get a branch
    .get(auth.apiAuthRedirect, function(req,res) {
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
    .get(auth.apiAuthRedirect, function(req, res) {
      const path = {
        roomId: req.params.roomid
      }
      cache.getCommits(req.user, path)
      .then((data) => {
        res.json(data)
      });
    });

  router.route('/room/:roomid/git/tree/:sha')//get a fileTree
    .get(auth.apiAuthRedirect, function(req,res) {
      const path = {
        roomId: req.params.roomid,
        sha: req.params.sha
      };
      cache.getFileTree(req.user, path)
      .then((data) => {
        res.json(data);
      });
    });
    
  router.route('/room/:roomid/sha/:sha/file/*')//get a file
    .get(auth.apiAuthRedirect, function(req, res) {
      const path = {
        roomId: req.params.roomid,
        sha: req.params.sha,
        file: req.url.split('/file/')[1]
      };
      cache.getFile(req.user, path)
      .then((data) => {res.json(data)});
    })
    
  router.route('/room/:roomid/commitsha/:commitSha/filesha/:fileSha/file/*')//for commits
    .post(auth.apiAuthRedirect, function(req,res) {
      let repo;
      const message = req.body.message;
      const path = {
        roomId: req.params.roomid,
        sha: req.params.commitSha, //this is commit sha
        fileSha: req.params.fileSha,
        file: req.url.split('/file/')[1],
        branch: req.body.branch
      };
      rUtil.getRepo(path)
        .then(function(r) {
          repo = r;
          return rUtil.getFileContent(path);
        })
        .then(function(data){
          return github.pushFile(req.user.username, repo, path, req.user.accessToken, message, data);
        })
        .then(function(responseJson) {
          res.json(responseJson);
        });
    })

  router.route('/auth/github')
    .get(passport.authenticate('github', { scope: [ 'user:email', 'repo' ] }));

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
