module.exports = {
  friendlyName: 'Delete',
  description: 'Delete words.',
  inputs: {
    id: { type: 'string' }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/words/words'
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
    var delete_word = await Words.destroy({ id: inputs.id }).fetch();
    var count_approvals = await  Words.count({ 'active' : [ 0, 1 ] });
    // this.req.session.count_approvals = count_approvals!=0 ? JSON.stringify(count_approvals) : null;
    if (delete_word.length === 0) { console.log('Not found id' + inputs.id); } else { return exits.redirect('back'); }
    return exits.success();
  }
};