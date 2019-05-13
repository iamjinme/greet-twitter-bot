const Twit = require('twit');
const dotenv = require('dotenv');
const greet = require('./greeting');

dotenv.config();

console.log(process.env);

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
  });
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
