module.exports = {
  friendlyName: 'Insert',
  description: 'Insert words.',
  inputs: {
    kanji: { type: 'string' },
    hiragana: { type: 'string' },
    katakana: { type: 'string' },
    romaji: { type: 'string' },

    onyomi: { type: 'string' },
    kunyomi: { type: 'string' },
    jlpt: { type: 'string' },
    strokes: { type: 'string' },
    pinyin: { type: 'string' } ,
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
    furigana: { type: 'json' },

    user_ip : { type: 'string' }
  },
  exits: {
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
    var arr_insert = new Object();
      arr_insert.kanji = inputs.kanji ? inputs.kanji : null;
      arr_insert.hiragana = inputs.hiragana ? inputs.hiragana : null;
      arr_insert.katakana = inputs.katakana ? inputs.katakana : null;
      arr_insert.romaji = inputs.romaji ? inputs.romaji.toLowerCase() : null;
      arr_insert.flag = inputs.kanji ? 'kanji' : 'word';

    var kanji_options = new Object();
      kanji_options.onyomi = inputs.onyomi ? inputs.onyomi : null;
      kanji_options.kunyomi = inputs.kunyomi ? inputs.kunyomi : null;
      kanji_options.jlpt = inputs.jlpt ? inputs.jlpt : null;
      kanji_options.strokes = inputs.strokes ? inputs.strokes : null;
      kanji_options.pinyin = inputs.pinyin ? inputs.pinyin : null;
      kanji_options.pinyins = inputs.pinyins ? inputs.pinyins : null;
      arr_insert.kanji_options = kanji_options ? kanji_options : null;

    var type_verbs = new Object();
      type_verbs.jishokei = inputs.jishokei ? inputs.jishokei : null;
      type_verbs.takei = inputs.takei ? inputs.takei : null;
      type_verbs.mizenkei = inputs.mizenkei ? inputs.mizenkei : null;
      type_verbs.teineikei = inputs.teineikei ? inputs.teineikei : null;

      type_verbs.teikei = inputs.teikei ? inputs.teikei : null;
      type_verbs.kanoukei = inputs.kanoukei ? inputs.kanoukei : null;
      type_verbs.ukemitei = inputs.ukemitei ? inputs.ukemitei : null;
      type_verbs.shiekitei = inputs.shiekitei ? inputs.shiekitei : null;

      type_verbs.shieki_ukemitei = inputs.shieki_ukemitei ? inputs.shieki_ukemitei : null;
      type_verbs.joukentei = inputs.joukentei ? inputs.joukentei : null;
      type_verbs.meireitei = inputs.meireitei ? inputs.meireitei : null;
      type_verbs.ikoutei = inputs.ikoutei ? inputs.ikoutei : null;
      type_verbs.kinshikei = inputs.kinshikei ? inputs.kinshikei : null;

      var role = 0;
      if ((await sails.helpers.backend.checkrole(this.req.session.me)) === 1) {
        role = 1;
      } else if ((await sails.helpers.backend.checkrole(this.req.session.me)) === 2) {
        role = 2;
      } else if ((await sails.helpers.backend.checkrole(this.req.session.me)) === 3) {
        role = 2;
      }
      var session_info = await sails.helpers.backend.sessioninfo(this.req.session.me);
      // Xử lý means
        var arr_mean = []; arr_mean = inputs.mean ? inputs.mean : null;
        var arr_type_word = [];	arr_type_word = inputs.type_word ? inputs.type_word : null;
        var means = []; var i = 0;
        if(arr_mean!=null) {
            arr_mean.forEach(function(index){
                if(arr_mean[i]!=null) {
                    var mean_item = ''; // Chuỗi để xử lý cấu trúc Json theo yêu cầu
                    var json_mean = new Object();
                    json_mean['mean'] = arr_mean[i];

                    var json_type_word = new Object();
                    json_type_word['type_word'] = arr_type_word[i];

                    mean_item = { 
                        'mean' : json_mean['mean'], 
                        'type_trans': 'vi',
                        'type_word' : json_type_word["type_word"],
                        'active': role,
                        'created_at': Date.now(),
                        'updated_at': null,
                        'user_created': session_info.display_name,
                        'user_updated': null,
                        'user_actived': null
                    }; // xử lý json theo cấu trúc
                    means.push(mean_item); // push vào mảng cuối
                    i++;
                }	
            });
        }
        arr_insert.means = means ? means : null;
      // Kết thúc xử lý means

      // Xử lý Examples
        var arr_example = []; arr_example = inputs.example ? inputs.example : null;
        var arr_mean_exam = []; arr_mean_exam = inputs.mean_exam ? inputs.mean_exam : null;
        var arr_furigana = []; arr_furigana = inputs.furigana ? inputs.furigana : null;
        var examples = []; var i = 0;
        if(arr_example!=null) {
            arr_example.forEach(function(index){ // Foreach mảng example, để bắt trường hợp khách bấm thêm nhưng để trống thì sẽ ko chèn
                if(arr_example[i]!='') {
                    var example_item = ''; // Chuỗi để xử lý cấu trúc Json theo yêu cầu
                    var json_example = new Object();
                    json_example['example'] = arr_example[i];

                    var json_mean_exam = new Object();
                    json_mean_exam['mean_exam'] = arr_mean_exam[i];

                    var json_furigana = new Object();
                    json_furigana['furigana'] = arr_furigana[i];

                    example_item = {
                        'example' : json_example['example'], 
                        'example_hira': '',
                        'mean_pinyin': '',
                        'mean_exam' : json_mean_exam['mean_exam'],
                        'type_trans': 'vi',
                        'furigana':  json_furigana['furigana'],
                        'active': role,
                        'created_at':  Date.now(),
                        'updated_at':  null,
                        'user_created': session_info.display_name,
                        'user_updated': null,
                        'user_actived': null
                    }; // xử lý json theo cấu trúc
                    examples.push(example_item); // push vào mảng cuối
                    i++;
                }	
            });
        }
        arr_insert.examples = examples ? examples : null;
      // Kết thúc xử lý Examples
     
      arr_insert.active  = role ? role : null;
      arr_insert.created_at = Date.now();
      
      arr_insert.user_created = session_info.display_name ? session_info.display_name : null;
      if(role===0) {
        arr_insert.user_updated = null;
        arr_insert.updated_at = null;
      } else {
        arr_insert.updated_at = Date.now();
        arr_insert.user_updated = session_info.display_name ? session_info.display_name : null;
      } 
      arr_insert.user_updated = session_info.display_name ? session_info.display_name : null;
      if(role===3 || role===2) {
        arr_insert.user_actived = session_info.display_name ? session_info.display_name : null;
      } else {
        arr_insert.user_actived = null;
      }
      
      arr_insert.user_ip =  inputs.user_ip ? inputs.user_ip : null;

      var data_word = await Words.create(arr_insert).fetch();
      // return exits.success({
      //   data_word_json: JSON.stringify(data_word)
      // });
      // var count_approvals = await  Words.count({ 'active' : [ 0, 1 ] });
      // this.req.session.count_approvals = count_approvals!=0 ? JSON.stringify(count_approvals) : null;
      // sails.sockets.blast('server_count_approvals', this.req.session.count_approvals);

      if (data_word) {
        if(role===3 || role===2) {
          return exits.redirect('/backend/word/edit/' + data_word.id);
        } else {
          return exits.redirect('/backend/approval/edit/' + data_word.id);
        }
        
      }
  }
};
