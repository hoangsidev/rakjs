module.exports = {
  friendlyName: 'ThemVaChinhSuaViDu',
  description: 'ThemVaChinhSuaViDu.',
  inputs: {


    feed_id: { type: 'string' },
    user_id: { type: 'string' },
    user_name: { type: 'string' },
    role_user: { type: 'string' },
    feedb_word_id: { type: 'string' },
    feedb_username: { type: 'string' },
    sentence: { type: 'string' },
    mean_ex: { type: 'string' },
    furi: { type: 'string' }


  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/newexampleinsert'
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {
    var ObjectID = require('mongodb').ObjectID,
      sentence = inputs.sentence,
      mean_ex = inputs.mean_ex,
      furi = inputs.furi,
      id = inputs.feedb_word_id ? inputs.feedb_word_id : inputs.feedb_word_id,
      example_id =  inputs.feed_id ? inputs.feed_id : (new ObjectID().toString()),
      user_id = inputs.user_id,
      user_name = inputs.user_name ? inputs.user_name : inputs.feedb_username,
      role_user = inputs.role_user,

      data_examples = await Words.findOne({ '_id': id, 'active': 2 }),
    get_examples = data_examples.examples; // lấy toàn bộ means của từ được góp ý


    var new_example_item = {
      'id': example_id,
      "example": sentence,
      "example_hira": "",
      "mean_pinyin": "",
      "mean_exam": mean_ex,
      "furigana": furi,
      'type_trans': 'vi',
      'active': (role_user == 2 || role_user == 3) ? 2 : 0,
      'created_at': new Date(),
      'updated_at': new Date(),
      'user_created': user_name,
      'user_updated': null,
      'user_actived': null
    }; // xử lý json theo cấu trúc
    get_examples.push(new_example_item); // push vào mảng cuối

    var data = await Words.update({ id: id }).set({ examples: get_examples }).fetch();

    if (data) {
      return exits.success({result:1})
    }
  }
};