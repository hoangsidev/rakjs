module.exports = {


  friendlyName: 'Check words',


  description: '',


  inputs: {

    word_check: {
      type: 'string',
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    /////////////////

    var arr_match = {
      hiragana: {
          isset: 0,
          word: ""
      },
      katakana: {
          isset: 0,
          word: ""
      },
      romaji: {
          isset: 0,
          word: ""
      },
      kanji: {
          isset: 0,
          word: ""
      },
      vi: {
          isset: 0,
          word: ""
      },
      word_space: 0,
      word_search: null
  }
  var ws = inputs.word_check
  arr_match.word_search = ws
  if (ws == null) {
    return exits.success(null)
  } else {
      var table_hiragana = [
          'あ', 'い', 'う', 'え', 'お',
          'か', 'き', 'く', 'け', 'こ',
          'さ', 'し', 'す', 'せ', 'そ',
          'た', 'ち', 'つ', 'て', 'と',
          'な', 'に', 'ぬ', 'ね', 'の',
          'は', 'ひ', 'ふ', 'へ', 'ほ',
          'ま', 'み', 'む', 'め', 'も',
          'や', 'ゆ', 'よ',
          'ら', 'り', 'る', 'れ', 'ろ',
          'わ', 'を', 'ん',
          'が', 'ぎ', 'ぐ', 'げ', 'ご',
          'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
          'だ', 'ぢ', 'づ', 'で', 'ど',
          'ば', 'び', 'ぶ', 'べ', 'ぼ',
          'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
          'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'っ',
      ];
      var table_katakana = [
          'ア', 'イ', 'ウ', 'エ', 'オ',
          'カ', 'キ', 'ク', 'ケ', 'コ',
          'サ', 'シ', 'ス', 'セ', 'ソ',
          'タ', 'チ', 'ツ', 'テ', 'ト',
          'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
          'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
          'マ', 'ミ', 'ム', 'メ', 'モ',
          'ヤ', 'ユ', 'ヨ',
          'ラ', 'リ', 'ル', 'レ', 'ロ',
          'ワ', 'ヲ', 'ン',
          'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
          'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
          'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
          'バ', 'ビ', 'ブ', 'ベ', 'ボ',
          'パ', 'ピ', 'プ', 'ペ', 'ポ',
          'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
          'ー', 'ッ'
      ];
      var table_romaji = [
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
      ]
      var table_unicode = [
          'á', 'à', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'đ', 'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'í', 'ì', 'ỉ', 'ĩ', 'ị', 'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'
      ]
      var ws_splits = ws.split('');
      var w_space = 0
      ws_splits.forEach((element, index) => {
          if (table_hiragana.indexOf(element) != -1) {
              arr_match.hiragana.isset = 1;
              arr_match.hiragana.word = arr_match.hiragana.word + element;
          } else if (table_katakana.indexOf(element) != -1) {
              arr_match.katakana.isset = 1;
              arr_match.katakana.word = arr_match.katakana.word + element;
          } else if (table_unicode.indexOf(element) != -1) {
              arr_match.vi.isset = 1;
              arr_match.vi.word = arr_match.vi.word + element;
          } else if (table_romaji.indexOf(element) != -1) {
              arr_match.romaji.isset = 1;
              arr_match.romaji.word = arr_match.romaji.word + element;
          } else if (element.indexOf(' ') >= 0 || element.indexOf('　') >= 0) {
              w_space = w_space + 1;
              arr_match.word_space = w_space;
          } else {
              arr_match.kanji.isset = 1;
              arr_match.kanji.word = arr_match.kanji.word + element;
          }

      })

      if (arr_match.vi.isset == 1 || (arr_match.romaji.isset == 1 && arr_match.word_space > 0)) {
          arr_match.vi.isset = 1;
          arr_match.vi.word = ws
      }
      if (arr_match.romaji.isset == 1 && arr_match.word_space == 0) {
          ws = ws.replace(/\s+/g, '');
          ws = ws.replace(/　/g, '');
          arr_match.romaji.word = ws;
      } else if (arr_match.romaji.isset == 1 && arr_match.word_space > 0) {
          arr_match.romaji.isset = 0;
          arr_match.romaji.word = '';
      }
      return exits.success(arr_match)
  }//end ws != null
    /////////////////
   

  }


};

