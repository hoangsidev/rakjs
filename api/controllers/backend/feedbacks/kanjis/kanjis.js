module.exports = {


  friendlyName: 'Feedbackmean',


  description: 'Feedbackmean backend.',


  inputs: {
    page: { type: 'number', required : true }
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
 var page_title = 'Danh sách Kanji cần duyệt';
 var page_slug = 'feedbacks_kanji';
 var per_page = 200;
 var page = inputs.page || 1;
 var data_words = await Words.find({ 'feedback_kanjis.active' : [ 0, 1 ] }).skip((per_page * page) - per_page).limit(per_page).sort('id DESC').meta({enableExperimentalDeepTargets:true});
//  console.log(data_words)
 var count_words = await  Words.count({ 'feedback_kanjis.active' : [ 0, 1 ] }).meta({enableExperimentalDeepTargets:true});
 return exits.success({ 
   data_words_json: JSON.stringify(data_words), 
   page_title : page_title,
   page_slug : page_slug,
   current: page,
   pages: Math.ceil(count_words / per_page),
   count_kanjis : count_words
 });
  }


};
