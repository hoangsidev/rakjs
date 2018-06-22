module.exports = {
  friendlyName: 'Login',
  description: 'Login user.',
  inputs: {
    user_login: {
      type: 'string',
    },
    user_pass: {
      type: 'string',
    },
    url_current: {
      type: 'string',
    },
    remember: { type: 'string' }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/login'
    },
    redirect: {
        responseType: 'redirect'
      }
  },

  fn: async function (inputs, exits) {

    var username = inputs.user_login
    var password = inputs.user_pass
    var url_current = inputs.url_current
  
    console.log(inputs.remember);
    
     // check login and role
     if(this.req.signedCookies.me) { this.req.session.me =  this.req.signedCookies.me;  }

     if ((await sails.helpers.backend.checklogin(this.req.session.me)) != 0) { // nếu đã đăng nhập nhưng quyền khách thì ko đc vào backend nữa
       if ((await sails.helpers.backend.checkrole(this.req.session.me)) === 0) { return exits.redirect(sails.config.custom.base_url); }
     }
   // end check login and role

   if (this.req.method == 'GET') {
    var page_title = 'Đăng nhập';
    var page_slug = 'get_login';
    return exits.success({
      page_title: page_title,
      page_slug: page_slug,
      error_message: null
    });
  } else if (this.req.method == 'POST') {
    var data_user = await Users.find({ 'username': username,  'password': inputs.password  });
    if (data_user.length === 0) {
      return exits.success({
        page_title: page_title,
        page_slug: page_slug,
        error_message: '<strong>Lỗi!</strong> Tài khoản hoặc mật khẩu sai, xin vui lòng kiểm tra lại!'
      });
    } else {
      this.req.session.me = data_user ? JSON.stringify(data_user) : null; // đăng ký session
      if(inputs.remember=='on') {
        this.res.cookie('me', JSON.stringify(data_user), { signed : true, maxAge : 60 * 60 * 24 * 30 }); 
      }
      // không làm được cookie
      // var count_approvals = await  Words.count({ 'active' : [ 0, 1 ] });
      // this.req.session.count_approvals = count_approvals!=0 ? JSON.stringify(count_approvals) : null;
      // console.log(this.req.session.count_approvals);
      if(this.req.session.me) { return exits.redirect(url_current); }
    }
  }


   // var datalogin={
    //   username:username,
    //   password:password,
    // }

    // return exits.success(datalogin);




  }


};
