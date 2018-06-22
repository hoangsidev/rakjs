module.exports = {
  friendlyName: 'Index',
  description: 'Index words.',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/index'
    },
  },
  fn: async function (inputs, exits) {
         // check login and role
         if(this.req.signedCookies.me) { this.req.session.me =  this.req.signedCookies.me;  }
    return exits.success()
  }
};
