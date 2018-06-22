module.exports = {
  friendlyName: 'Quick Search',
  description: 'Quick Search words.',
  inputs: {
    value: {
        type: 'string',
      }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/quicksearch'
    },
    redirect: {
        responseType: 'redirect'
      }
  },
  fn: async function (inputs, exits) {

    var get_word_search = inputs.value

    var translate = require('node-google-translate-skidz')

    if( get_word_search == undefined || get_word_search == null || get_word_search == ''  ){
        throw {redirect: '/'};
      } else {
            var keyword = await sails.helpers.frontend.filterWords.with({word_filter:get_word_search})
            var wordcheck = await sails.helpers.frontend.checkWords.with({word_check:keyword})
        
            var result_get_hiragana = new Array()
            var result_get_katakana = new Array()
            var result_get_romaji = new Array()
            var result_get_kanji_word = new Array()
            var result_get_mean = new Array()
            var result_search = new Array()

            var result_search_google = {
              trans:null,
              orig:null,
              translit:null,
              type_trans:null
            }
            var w_search = wordcheck.word_search
            if (wordcheck.hiragana.isset = 1 && wordcheck.hiragana.word != '') {
                  result_get_hiragana = await sails.helpers.frontend.findHiragana.with({word_hiragana:w_search})
            }

            if (wordcheck.katakana.isset = 1 && wordcheck.katakana.word != '') {
                result_get_katakana = await sails.helpers.frontend.findKatakana.with({word_katakana:w_search})
            }

            if (wordcheck.romaji.isset = 1 && wordcheck.romaji.word != '') {
              result_get_romaji = await sails.helpers.frontend.findRomaji.with({word_romaji:w_search})
           }

             if (wordcheck.vi.isset = 1 && wordcheck.vi.word != '') {
               result_get_mean = await sails.helpers.frontend.findMean.with({word_mean:w_search})
             }

             if (wordcheck.kanji.isset = 1 && wordcheck.kanji.word != '') {
              result_get_kanji_word = await sails.helpers.frontend.findKanjiWord.with({word_kanji:w_search})
             }

            result_search = await [].concat(result_get_hiragana, result_get_katakana, result_get_romaji, result_get_kanji_word, result_get_mean)


            if( result_search.length > 0 ){

              var data_words = {
                data_words_json: JSON.stringify(result_search),
                data_search_google: JSON.stringify(result_search_google)
              }

              return exits.success(data_words) 

            }else{


              if( wordcheck.vi.isset == 1 || wordcheck.romaji.isset == 1 ){

                translate({
                  text: w_search,
                  source: 'vi',
                  target: 'ja'
                }, function(result) {
                 

                  result_search_google.orig = result.sentences[0].orig
                  result_search_google.trans = result.sentences[0].trans
                  result_search_google.translit = result.sentences[1].translit
                  result_search_google.type_trans = 1
                  

                  var data_words = {
                    data_words_json: JSON.stringify(result_search),
                    data_search_google: JSON.stringify(result_search_google)
                  }


                  return exits.success(data_words)

                });


              }else{

                
                translate({
                  text: w_search,
                  source: 'ja',
                  target: 'vi'
                }, function(result) {
                 
                  result_search_google.orig = result.sentences[0].orig
                  result_search_google.trans = result.sentences[0].trans
                  result_search_google.translit = result.sentences[1].src_translit
                  result_search_google.type_trans = 2

                  var data_words = {
                    data_words_json: JSON.stringify(result_search),
                    data_search_google: JSON.stringify(result_search_google),
                  }

                  return exits.success(data_words)


                });





              }

             


            }

           

            
      }




  }

};
