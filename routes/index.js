var express = require('express');
var steem = require('steem');
var request = require('request');
steem.api.setOptions({ url: 'https://api.steemit.com/' });

var router = express.Router();

var account = "hsynterkr";
var _username, _sbd, _steem, _mysbd,_mysteem, _rep, _profile, _image, _cover, _about, _website, _location,_sbddata,_steemdata,_steemPrice, _sbdPrice;

/*
// This request show your total SBD balance (USD)
request.get('https://min-api.cryptocompare.com/data/price?fsym=SBD&tsyms=USD', function (err, res, body) {
    _sbddata = JSON.parse(body);
    _sbdPrice = _sbddata.USD;
    console.log(_sbdPrice)
});

// This request show your total STEEM balance (USD)
request.get('https://min-api.cryptocompare.com/data/price?fsym=STEEM&tsyms=USD', function (err, res, body) {
    _steemdata = JSON.parse(body);
    _steemPrice = _steemdata.USD;
    console.log(_steemPrice)
});
 */

steem.api.getAccounts([account], function(err, result){

  _username = result[0].name;
  _sbd      = result[0].sbd_balance;
  _steem    = result[0].balance;
  _rep      = (result[0].reputation / 17901198978).toFixed(2);
  _profile  = JSON.parse(result[0].json_metadata);
  _image    = _profile.profile.profile_image;
  _about    = _profile.profile.about;
  _website  = _profile.profile.website;
  _location = _profile.profile.location;
  _cover    = _profile.profile.cover_image;
  _mysbd    = _sbdPrice * parseFloat(result[0].sbd_balance);
  _mysbd    = _mysbd.toFixed(2);
  _mysteem  = _steemPrice * parseFloat(result[0].balance);
  _mysteem  = _mysteem.toFixed(2)

});

/* GET home page. */
router.get(`/${account}`, function(req, res) {
  res.render('index', {
      username:_username,
      sbd:_sbd,
      steem:_steem,
      rep:_rep,
      image:_image,
      cover:_cover,
      about:_about,
      website:_website,
      location:_location
    //  totalsbd:_mysbd,     //   This is your total SBD balance (USD)
    //  totalsteem:_mysteem  // This is your total STEEM balance (USD)
  });
});

module.exports = router;
