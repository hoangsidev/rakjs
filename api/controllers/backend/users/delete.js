module.exports = {
  friendlyName: 'Delete',
  description: 'Delete users.',
  inputs: {
    id: { type: 'string' }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/users/users'
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {
    // check login and role
    if(this.req.signedCookies.me) { this.req.session.me =  this.req.signedCookies.me;  } 
    if ((await sails.helpers.backend.checklogin(this.req.session.me)) === 0) {
      return exits.redirect(sails.config.custom.base_url_admin);
    } else {
      if ((await sails.helpers.backend.checkrole(this.req.session.me)) === 0) { return exits.redirect(sails.config.custom.base_url); }
    }
  // end check login and role
    var delete_user = await Users.destroy({ id: inputs.id }).fetch();
    if (delete_user.length === 0) {  console.log('Not found id' + inputs.id); } else { return exits.redirect('back');  }
  }
};
