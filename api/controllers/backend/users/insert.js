module.exports = {
  friendlyName: 'Insert',
  description: 'Insert words.',
  inputs: {
    username: { type: 'string' },
    email: { type: 'string' },
    display_name: { type: 'string' },
    password: { type: 'string' },
    role: { type: 'number' }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/users/edit_user'
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
      
    // var file_upload = await this.req.file('thumbnail')
    
    // var xxx = await file_upload.upload({ 
    //   maxBytes: 10000000,
    //   dirname: require('path').resolve(sails.config.appPath, 'assets/backend/uploads')
    // }, function (err, file) {
    //   return this.exits.success({ file : file });
    // });

    // console.log(xxx);
    var arr_insert = new Object();
    arr_insert.username = inputs.username ? inputs.username : null;
    arr_insert.email = inputs.email ? inputs.email : null;
    arr_insert.display_name = inputs.display_name ? inputs.display_name : null;
    arr_insert.password = inputs.password ? inputs.password : null;
    arr_insert.active = 1;
    arr_insert.created_at = Date.now();
    arr_insert.role = inputs.role ? inputs.role : 0;
    var data_user = await Users.create(arr_insert).fetch();
    if (data_user) {
      return exits.redirect('/backend/users/page/1');
    }
  }
};
