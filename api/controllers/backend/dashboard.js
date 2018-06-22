module.exports = {
  friendlyName: 'Dashboard',
  description: 'Dashboard backend.',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/dashboard'
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
    var page_title = 'Quản trị & Thống kê';
    var page_slug = 'dashboard';

    var count_words = await  Words.count({ and : [ { 'active': 2 }, { 'kanji': null } ] });
    var count_kanjis = await  Words.count({ and : [ { 'active': 2 }, { 'kanji': { '!=': null } } ] });
    var count_examples = await  Words.count({ and : [ { 'active': 2 }, { 'examples.example': { '!=': null } } ] }).meta({enableExperimentalDeepTargets:true});

    var count_approvals = await  Words.count({ 'active': [ 0, 1 ] });

    var count_guest = await  Users.count({ 'role' : 0 });
    var count_author = await  Users.count({ 'role' : 1 });
    var count_administrator = await  Users.count({ 'role' : 2 });
    var count_root = await  Users.count({ 'role' : 3 });

    // var count_approvals = await  Words.count({ 'active' : [ 0, 1 ] });
    // this.req.session.count_approvals = count_approvals!=0 ? JSON.stringify(count_approvals) : null;
    // sails.sockets.blast('server_count_approvals', this.req.session.count_approvals);
    sails.sockets.broadcast('server_count_approvals', 999);
    return exits.success({ 
      page_title : page_title,
      page_slug : page_slug,
      count_words : count_words,
      count_kanjis : count_kanjis,
      count_examples : count_examples,
      count_approvals : count_approvals,
      count_guest : count_guest,
      count_author : count_author,
      count_administrator : count_administrator,
      count_root : count_root
    });
    
  }
};
