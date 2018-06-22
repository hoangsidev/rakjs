module.exports = {
  friendlyName: 'Users',
  description: 'Users users.',
  inputs: {
    page: { type: 'number', required : true }
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
    var page_title = 'Danh sách người dùng';
    var page_slug = 'users';
    var per_page = 20;
    var page = inputs.page || 1;
    var data_users = await Users.find({}).skip((per_page * page) - per_page).limit(per_page); //.sort([{ role: 'DESC' }, { created_at: 'ASC' }])
    var count_users = await  Users.count({});
    return exits.success({ 
      data_users_json: JSON.stringify(data_users), 
      page_title : page_title,
      page_slug : page_slug,
      current: page,
      pages: Math.ceil(count_users / per_page)
    });
  }
};
