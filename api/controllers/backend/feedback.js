module.exports = {
  friendlyName: 'Feedback',
  description: 'Feedback backend.',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/feedback'
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
    var page_title = 'Danh sách đóng góp ý kiến của người dùng';
    var page_slug = 'feedback';
    return exits.success({ 
      page_title : page_title,
      page_slug : page_slug
    });
  }
};
