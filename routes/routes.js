const express = require('express');

const controller = require('../controllers/controller.js');

const registerController = require('../controllers/registerController.js');
const successController = require('../controllers/successController.js');

const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');

const homeController = require('../controllers/homeController.js');

const accountController = require('../controllers/accountController.js');

const exploreController = require('../controllers/exploreController.js');

const forumDiscussionController = require('../controllers/forumDiscussionController.js');
const discussionPostController = require('../controllers/discussionPostController.js');
const forumBattleController = require('../controllers/forumBattleController.js');
const battlePostController = require('../controllers/battlePostController.js');
const forumTradeController = require('../controllers/forumTradeController.js');
const tradePostController = require('../controllers/tradePostController.js');
const forumExploreController = require('../controllers/forumExploreController.js');
const explorePostController = require('../controllers/explorePostController.js');

const battleController = require('../controllers/battleController.js');

const tradeController = require('../controllers/tradeController.js');

const validation = require('../helpers/validation.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);

app.get('/register', registerController.getRegister);
app.post('/register', validation.registerValidation(), registerController.postRegister);
app.get('/getCheckUsername', registerController.getCheckUsername);

app.get('/success', successController.getSuccess);

app.get('/login', loginController.getLogIn);
app.post('/login', loginController.postLogIn);

app.get('/logout', logoutController.getLogOut);

app.get('/home/:username', homeController.getHome);

app.get('/account/:username', accountController.getAccount);

/* Forum Discussions */
app.get('/forum/discussion/:username', forumDiscussionController.getDiscussion);
app.post('/forum/discussion/:username', forumDiscussionController.postDiscussion);
app.post('/likeDiscussionPost', forumDiscussionController.postLike);
app.post('/dislikeDiscussionPost', forumDiscussionController.postDislike);
app.get('/updateDiscussionRatings', forumDiscussionController.getRating);

app.get('/forum/discussion/post/:postID', discussionPostController.getDiscussionPost);
app.post('/forum/discussion/post/:postID', discussionPostController.postComment);
app.get('/updateDiscussionRating', discussionPostController.getRating);
app.post('/deleteDiscussionPost', discussionPostController.deletePost);

/* Forum Battles */
app.get('/forum/battle/:username', forumBattleController.getForumBattle);
app.post('/likeBattlePost', forumBattleController.postLike);
app.post('/dislikeBattlePost', forumBattleController.postDislike);
app.get('/updateBattleRatings', forumBattleController.getRating);

app.get('/forum/battle/post/:postID', battlePostController.getBattlePost);
app.post('/forum/battle/post/:postID', battlePostController.postComment);
app.get('/updateBattleRating', battlePostController.getRating);
app.post('/deleteBattlePost', battlePostController.deletePost);

app.get('/battle/:username', battleController.getBattle);
app.post('/postChallenge', battleController.postChallenge);
app.post('/postBattle', battleController.postBattle);

/* Forum Trade */
app.get('/forum/trade/:username', forumTradeController.getForumTrade);
app.post('/likeTradePost', forumTradeController.postLike);
app.post('/dislikeTradePost', forumTradeController.postDislike);
app.get('/updateTradeRatings', forumTradeController.getRating);

app.get('/forum/trade/post/:postID', tradePostController.getTradePost);
app.post('/forum/trade/post/:postID', tradePostController.postComment);
app.get('/updateTradeRating', tradePostController.getRating);
app.post('/postTradeOffer', tradePostController.postTradeOffer);
app.get('/getTradeOffers', tradePostController.getTradeOffers);

app.get('/trade/:username', tradeController.getTrade);
app.post('/postTrade', tradeController.postTrade);
app.get('/getCheckTrade', tradeController.getCheckTrade);
app.post('/acceptTrade', tradeController.acceptTrade);
app.post('/removeTrade', tradeController.removeTrade);
app.post('/postForumTrade', tradeController.postForumTrade);

/* Forum Explorations */
app.get('/forum/explore/:username', forumExploreController.getForumExplore);
app.post('/likeExplorePost', forumExploreController.postLike);
app.post('/dislikeExplorePost', forumExploreController.postDislike);
app.get('/updateExploreRatings', forumExploreController.getRating);

app.get('/forum/explore/post/:postID', explorePostController.getExplorePost);
app.post('/forum/explore/post/:postID', explorePostController.postComment);
app.get('/updateExploreRating', explorePostController.getRating);
app.post('/deleteExplorePost', explorePostController.deletePost);

app.get('/explore/:username', exploreController.getExplore);
app.post('/postExplore', exploreController.postExplore);
app.post('/postTask', exploreController.postTask);
app.get('/getActiveTask', exploreController.getActiveTask);

app.post('/changeUsername', accountController.changeUsername);
app.post('/changePassword', accountController.changePassword);
app.post('/changeStatus', accountController.changeStatus);
app.post('/updateCurr', accountController.updateCurr)

module.exports = app;
