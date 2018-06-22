module.exports = {
   friendlyName: 'Globals Check Role ',
   description: 'Globals Check Role ',
   inputs: {
    session_me: {
       type: 'json',
     }
   },
   fn: async function (inputs, exits) { // truyền vào session
    var data_user_session = JSON.parse(inputs.session_me);
    if(data_user_session!=null && data_user_session.length > 0) {
      return exits.success(data_user_session[0].role);
    }
   }
};

