const Twit = require('twit');
const greet = require('./greeting');

require('dotenv').config()

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function verifyCredentials(cb) {
  T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false,
  }, cb);
};

function sendGreeting(user) {
  T.post('direct_messages/new',{
    user_id: user.id_str,
    text: greet(user.name),
  },
  function(err) {
    if(err) {
      console.log('error <sendGreeting> to user: %s %s %s', user.name, user.screen_name, user.id_str);
      console.log(err);
    }
  });
};

const user_id_str = process.env.USER_ID; // iamjinme
const stream = T.stream('statuses/filter', { follow: user_id_str });

verifyCredentials(function(err, res){
  if (err) throw err;
  const account_id = res.id_str;
  console.log('credentials ok, running bot for user:', res.screen_name);
  stream.on('follow', function(json){
    console.log('follow event with data:', json);
    if(json.event === 'follow' && json.source.id_str !== account_id) sendGreeting(json.source);
  });
  stream.on('error', function(error){
    throw error;
  });
});
