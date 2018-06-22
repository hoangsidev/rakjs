module.exports = {
  friendlyName: 'Update',
  description: 'Update users.',
  inputs: {
    id : { type: 'string' },
    email: { type: 'string' },
    display_name: { type: 'string' },
    password: { type: 'string' },
    role: { type: 'number' }
  },
  exits: {
    // success: {
    //   responseType: 'view',
    //   viewTemplatePath: 'backend/users/users'
    // },
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
    var arr_update = new Object();
    arr_update.email = inputs.email ? inputs.email : null;
    arr_update.display_name = inputs.display_name ? inputs.display_name : null;
    if(inputs.password && inputs.password!=null) { arr_update.password = inputs.password } /* Nếu nhập mật khẩu vào mới cho đổi */
    // arr_update.active = 0;
    arr_update.updated_at = Date.now();
    arr_update.role = inputs.role ? inputs.role : 0;
    var data_user = await Users.update({ id: inputs.id }).set(arr_update).fetch();
    return exits.redirect('/backend/users/page/1');
  }
};
