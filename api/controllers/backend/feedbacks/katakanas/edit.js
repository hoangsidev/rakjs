module.exports = {
  friendlyName: 'Edit',
  description: 'Edit katakana.',
  inputs: {
    id: { type: 'string' }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/feedbacks/katakanas/edit_katakana'
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
    var page_title = 'Duyệt katakana';
    var page_slug = 'feedbacks_edit_katakana';
    var data_word = await Words.find({ id: inputs.id }).limit(1);
    return exits.success({
      data_word_json: JSON.stringify(data_word), 
      page_title : page_title,
      page_slug : page_slug,
    });
  }
};
