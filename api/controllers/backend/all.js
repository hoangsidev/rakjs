module.exports = {


  friendlyName: 'All',


  description: 'All backend.',


  inputs: {

  },



  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'backend/feedbacks/kanjis/kanjis'
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
    var count_words = await  Words.count({ 'feedback_kanjis.active' : [ 0, 1 ] }).meta({enableExperimentalDeepTargets:true});
    return exits.success({ 

      page_title : '',
      page_slug : '',
     
      count_kanjis : count_words
    });
     }
   



};
