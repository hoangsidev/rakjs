module.exports = {
  friendlyName: 'Update',
  description: 'Update words.',
  inputs: {
    id: { type: 'string' },
    kanji: { type: 'string' },
    hiragana: { type: 'string' },
    katakana: { type: 'string' },
    romaji: { type: 'string' },

    onyomi: { type: 'string' },
    kunyomi: { type: 'string' },
    jlpt: { type: 'string' },
    strokes: { type: 'string' },
    pinyin: { type: 'string' },
    pinyins: { type: 'string' },

    jishokei: { type: 'string' },
    takei: { type: 'string' },
    mizenkei: { type: 'string' },
    teineikei: { type: 'string' },
    teikei: { type: 'string' },
    kanoukei: { type: 'string' },
    ukemitei: { type: 'string' },
    shiekitei: { type: 'string' },
    shieki_ukemitei: { type: 'string' },
    joukentei: { type: 'string' },
    meireitei: { type: 'string' },
    ikoutei: { type: 'string' },
    kinshikei: { type: 'string' },

    mean: { type: 'json' },
    type_word: { type: 'json' },

    example: { type: 'json' },
    mean_exam: { type: 'json' },
    furigana: { type: 'json' }
  },
  exits: {
    success: {
      responseType: 'view',

    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {
    var ObjectID = require('mongodb').ObjectID;
    // check login and role
    if (this.req.signedCookies.me) { this.req.session.me = this.req.signedCookies.me; }
    if ((await sails.helpers.backend.checklogin(this.req.session.me)) === 0) {
      return exits.redirect(sails.config.custom.base_url_admin);
    } else {
      if ((await sails.helpers.backend.checkrole(this.req.session.me)) === 0) { return exits.redirect(sails.config.custom.base_url); }
    }
    // end check login and role
    // action update
    var arr_update = new Object();
    if (inputs.kanji) { arr_update.kanji = inputs.kanji };
    if (inputs.hiragana) { arr_update.hiragana = inputs.hiragana };
    if (inputs.katakana) { arr_update.katakana = inputs.katakana };
    if (inputs.romaji) { arr_update.romaji = inputs.romaji.toLowerCase() };

    var kanji_options = new Object();
    if (inputs.onyomi) { kanji_options.onyomi = inputs.onyomi };
    if (inputs.kunyomi) { kanji_options.kunyomi = inputs.kunyomi };
    if (inputs.jlpt) { kanji_options.jlpt = inputs.jlpt };
    if (inputs.strokes) { kanji_options.strokes = inputs.strokes };
    if (inputs.pinyin) { kanji_options.pinyin = inputs.pinyin };
    if (inputs.pinyins) { kanji_options.pinyins = inputs.pinyins };
    if (kanji_options) { arr_update.kanji_options = kanji_options };

    var type_verbs = new Object();
    if (inputs.jishokei) { type_verbs.jishokei = inputs.jishokei };
    if (inputs.takei) { type_verbs.takei = inputs.takei };
    if (inputs.mizenkei) { type_verbs.mizenkei = inputs.mizenkei };
    if (inputs.teineikei) { type_verbs.teineikei = inputs.teineikei };

    if (inputs.teikei) { type_verbs.teikei = inputs.teikei };
    if (inputs.kanoukei) { type_verbs.kanoukei = inputs.kanoukei };
    if (inputs.ukemitei) { type_verbs.ukemitei = inputs.ukemitei };
    if (inputs.shiekitei) { type_verbs.shiekitei = inputs.shiekitei };

    if (inputs.shieki_ukemitei) { type_verbs.shieki_ukemitei = inputs.shieki_ukemitei };
    if (inputs.joukentei) { type_verbs.joukentei = inputs.joukentei };
    if (inputs.meireitei) { type_verbs.meireitei = inputs.meireitei };
    if (inputs.ikoutei) { type_verbs.ikoutei = inputs.ikoutei };
    if (inputs.kinshikei) { type_verbs.kinshikei = inputs.kinshikei };

    if (type_verbs) { arr_update.type_verbs = type_verbs };



    var session_info = await sails.helpers.backend.sessioninfo(this.req.session.me);
    // Xử lý means
    var arr_mean = []; arr_mean = inputs.mean ? inputs.mean : null;
    var arr_type_word = []; arr_type_word = inputs.type_word ? inputs.type_word : null;
    var means = []; var i = 0;
    if (arr_mean != null) {
      arr_mean.forEach(function (index) {
        if (arr_mean[i] != null) {
          var mean_item = ''; // Chuỗi để xử lý cấu trúc Json theo yêu cầu
          var json_mean = new Object();
          json_mean['mean'] = arr_mean[i];

          var json_type_word = new Object();
          json_type_word['type_word'] = arr_type_word[i];

          mean_item = {
            'id' : (new ObjectID().toString()),
            'mean': json_mean['mean'],
            'type_trans': 'vi',
            'type_word': json_type_word["type_word"],
            'active': 2,
            'updated_at': Date.now(),
            'user_updated': session_info.display_name,
            'user_actived': session_info.display_name
          }; // xử lý json theo cấu trúc
          means.push(mean_item); // push vào mảng cuối
          i++;
        }
      });
    }
    arr_update.means = means ? means : null;
    // Kết thúc xử lý means

    // Xử lý Examples
    var arr_example = []; arr_example = inputs.example ? inputs.example : null;
    var arr_mean_exam = []; arr_mean_exam = inputs.mean_exam ? inputs.mean_exam : null;
    var arr_furigana = []; arr_furigana = inputs.furigana ? inputs.furigana : null;
    var examples = []; var i = 0;
    if (arr_example != null) {
      arr_example.forEach(function (index) { // Foreach mảng example, để bắt trường hợp khách bấm thêm nhưng để trống thì sẽ ko chèn
        if (arr_example[i] != '') {
          var example_item = ''; // Chuỗi để xử lý cấu trúc Json theo yêu cầu
          var json_example = new Object();
          json_example['example'] = arr_example[i];

          var json_mean_exam = new Object();
          json_mean_exam['mean_exam'] = arr_mean_exam[i];

          var json_furigana = new Object();
          json_furigana['furigana'] = arr_furigana[i];

          example_item = {
            'id' : (new ObjectID().toString()),
            'example': json_example['example'],
            'example_hira': '',
            'mean_pinyin': '',
            'mean_exam': json_mean_exam['mean_exam'],
            'type_trans': 'vi',
            'furigana': json_furigana['furigana'],
            'active': 2,
            // 'created_at':  Date.now(),
            'updated_at': Date.now(),
            // 'user_created': 'Hoàng Sĩ',
            'user_updated': session_info.display_name,
            'user_actived': 'Đình Luật'
          }; // xử lý json theo cấu trúc
          examples.push(example_item); // push vào mảng cuối
          i++;
        }
      });
    }
    arr_update.examples = examples ? examples : null;
    // Kết thúc xử lý Examples

    arr_update.updated_at = Date.now();
    // arr_update.user_created = 'Hoàng Sĩ';
    arr_update.user_updated = session_info.display_name ? session_info.display_name : null;
    arr_update.user_actived = session_info.display_name ? session_info.display_name : null;
    // arr_update.user_ip = '192.168.200.99';
    var data_word = await Words.update({ id: inputs.id }).set(arr_update).fetch();

    if (data_word) {
      return exits.redirect('/backend/feedbacks_mean/page/1');
    }
  }
};
