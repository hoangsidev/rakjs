module.exports = {
  friendlyName: 'Globals Check Login',
  description: 'Globals Check Login',
  inputs: {
   session_me: {
      type: 'json',
    }
  },
  fn: async function (inputs, exits) { // truyền vào session
    if(inputs.session_me) {
      var data_user_session = JSON.parse(inputs.session_me);
      return exits.success(data_user_session.length);
    } else {
      return exits.success(0);
    }
  }
};

