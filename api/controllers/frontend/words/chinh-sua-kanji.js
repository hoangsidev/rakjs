module.exports = {
  friendlyName: 'Chinh sua Kanji',
  description: 'Chinh sua Kanji',
  inputs: {
    kanji_w: { type: 'string' },
    feedb_id: { type: 'string' },
    feedb_username: { type: 'string' },
    user_id: { type: 'string' },
    role_user: { type: 'number' }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/insertgopykanjiw'
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {

    var ObjectID = require('mongodb').ObjectID,
 
      kanji_w = inputs.kanji_w,
      id = inputs.feedb_id,
      user_id = inputs.user_id,
      user_name = inputs.feedb_username ,
      role_user = inputs.role_user,


      data_feedback_kanjis = await Words.findOne({ '_id': id, 'active': 2 }),
      get_feedback_kanjis = data_feedback_kanjis.feedback_kanjis; // lấy toàn bộ feedback_kanjis của từ được góp ý


    var new_feedback_kanjis_item = {
      "kanji" : kanji_w, 
      'active': (role_user == 2 || role_user == 3) ? 2 : 0,
      'created_at': new Date(),
      'updated_at': new Date(),
      'user_created': user_name,
      'user_updated': null,
      'user_actived': null
    }; // xử lý json theo cấu trúc
    get_feedback_kanjis.push(new_feedback_kanjis_item); // push vào mảng cuối

    var data = await Words.update({ id: id }).set({ feedback_kanjis: get_feedback_kanjis }).fetch();

    if (data) {
      return exits.success({ result: 1 })
    }
  }
};