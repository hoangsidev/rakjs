module.exports = {
  friendlyName: 'Chinh sua Hiragana',
  description: 'Chinh sua Hiragana',
  inputs: {
    
    feedb_id: { type: 'string' },
    feedb_username: { type: 'string' },
    user_id: { type: 'string' },
    role_user: { type: 'number' },
    hira: { type: 'string' },


  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/insertgopyhira'
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {

    var ObjectID = require('mongodb').ObjectID,

      hiragana = inputs.hira,
      id = inputs.feedb_id,
      user_id = inputs.user_id,
      user_name = inputs.feedb_username,
      role_user = inputs.role_user;

      

      data_feedback_hiraganas = await Words.findOne({ '_id': id, 'active': 2 }),
      get_feedback_hiraganas = data_feedback_hiraganas.feedback_hiraganas; // lấy toàn bộ feedback_kanjis của từ được góp ý


    var new_feedback_hiraganas_item = {
      "hiragana": hiragana,
      'active': (role_user == 2 || role_user == 3) ? 2 : 0,
      'created_at': new Date(),
      'updated_at': new Date(),
      'user_created': user_name,
      'user_updated': null,
      'user_actived': null
    }; // xử lý json theo cấu trúc
    get_feedback_hiraganas.push(new_feedback_hiraganas_item); // push vào mảng cuối

    var data = await Words.update({ id: id }).set({ feedback_hiraganas: get_feedback_hiraganas }).fetch();

    if (data) {
      return exits.success({ result: 1 })
    }
  }
};module.exports = {
  friendlyName: 'Chinh sua Hiragana',
  description: 'Chinh sua Hiragana',
  inputs: {
    
    feedb_id: { type: 'string' },
    feedb_username: { type: 'string' },
    user_id: { type: 'string' },
    role_user: { type: 'number' },
    hira: { type: 'string' },


  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/insertgopyhira'
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {

    var ObjectID = require('mongodb').ObjectID,

      hiragana = inputs.hira,
      id = inputs.feedb_id,
      user_id = inputs.user_id,
      user_name = inputs.feedb_username,
      role_user = inputs.role_user;

      

      data_feedback_hiraganas = await Words.findOne({ '_id': id, 'active': 2 }),
      get_feedback_hiraganas = data_feedback_hiraganas.feedback_hiraganas; // lấy toàn bộ feedback_kanjis của từ được góp ý


    var new_feedback_hiraganas_item = {
      "hiragana": hiragana,
      'active': (role_user == 2 || role_user == 3) ? 2 : 0,
      'created_at': new Date(),
      'updated_at': new Date(),
      'user_created': user_name,
      'user_updated': null,
      'user_actived': null
    }; // xử lý json theo cấu trúc
    get_feedback_hiraganas.push(new_feedback_hiraganas_item); // push vào mảng cuối

    var data = await Words.update({ id: id }).set({ feedback_hiraganas: get_feedback_hiraganas }).fetch();

    if (data) {
      return exits.success({ result: 1 })
    }
  }
};