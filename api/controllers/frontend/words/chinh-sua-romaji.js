module.exports = {
  friendlyName: 'Chinh sua romaji',
  description: 'Chinh sua romaji',
  inputs: {
    
    feedb_id: { type: 'string' },
    feedb_username: { type: 'string' },
    user_id: { type: 'string' },
    role_user: { type: 'number' },
    roma: { type: 'string' },


  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/insertgopyroma'
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {

    var ObjectID = require('mongodb').ObjectID,

      romaji = inputs.roma,
      id = inputs.feedb_id,
      user_id = inputs.user_id,
      user_name = inputs.feedb_username,
      role_user = inputs.role_user;

      

      data_feedback_romajis = await Words.findOne({ '_id': id, 'active': 2 }),
      get_feedback_romajis = data_feedback_romajis.feedback_romajis; // lấy toàn bộ feedback_kanjis của từ được góp ý


    var new_feedback_romajis_item = {
      "romaji": romaji,
      'active': (role_user == 2 || role_user == 3) ? 2 : 0,
      'created_at': new Date(),
      'updated_at': new Date(),
      'user_created': user_name,
      'user_updated': null,
      'user_actived': null
    }; // xử lý json theo cấu trúc
    get_feedback_romajis.push(new_feedback_romajis_item); // push vào mảng cuối

    var data = await Words.update({ id: id }).set({ feedback_romajis: get_feedback_romajis }).fetch();

    if (data) {
      return exits.success({ result: 1 })
    }
  }
};