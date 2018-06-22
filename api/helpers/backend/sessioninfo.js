module.exports = {
  friendlyName: 'Sessioninfo',
  description: 'Sessioninfo backend.',
  inputs: {
    session_me: {
      type: 'json',
    }
  },
  fn: async function (inputs, exits) {
    var data_user_session = JSON.parse(inputs.session_me);
    if(data_user_session!=null && data_user_session.length > 0) {
      return exits.success(data_user_session[0]);
    }
  }
};

