module.exports = {
  friendlyName: 'ThemVaChinhSuaYNghia',
  description: 'ThemVaChinhSuaYNghia.',
  inputs: {
    typeword_id: { type: 'string' },
    mean: { type: 'json' },
    mean_id: { type: 'string' },
    feed_id: { type: 'string' },
    user_id: { type: 'string' },
    user_name: { type: 'string' },
    role_user: { type: 'string' },
    feedb_word_id: { type: 'string' },
    feedb_username: { type: 'string' },


  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/newmeantypewordinsert'
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {
    var ObjectID = require('mongodb').ObjectID,
      typeword_id = inputs.typeword_id,
      mean = inputs.mean,
      mean_id = inputs.mean_id ? inputs.mean_id : (new ObjectID().toString()),
      id = inputs.feed_id ? inputs.feed_id : inputs.feedb_word_id,
      user_id = inputs.user_id,
      user_name = inputs.user_name ? inputs.user_name : inputs.feedb_username,
      role_user = inputs.role_user,
      data_means = await Words.findOne({ '_id': id, 'active': 2 }),
      get_means = data_means.means; // lấy toàn bộ means của từ được góp ý


    var new_mean_item = {
      'id': mean_id,
      'mean': mean,
      'type_trans': 'vi',
      'type_word': typeword_id,
      'active': (role_user == 2 || role_user == 3) ? 2 : 0,
      'created_at': new Date(),
      'updated_at': new Date(),
      'user_created': user_name,
      'user_updated': null,
      'user_actived': null
    }; // xử lý json theo cấu trúc
    get_means.push(new_mean_item); // push vào mảng cuối




    var data = await Words.update({ id: id }).set({ means: get_means }).fetch();

    if (data) {
      return exits.success({ result: 1 })
    }
  }
};