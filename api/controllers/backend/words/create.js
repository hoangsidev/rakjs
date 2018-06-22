module.exports = {
  friendlyName: 'Create',
  description: 'Create words.',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/words/create_word'
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
    var page_title = 'Thêm mới từ vựng';
    var page_slug = 'create_word';
    return exits.success({
      page_title : page_title,
      page_slug : page_slug
    });
  }
};
