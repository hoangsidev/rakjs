module.exports = {


  friendlyName: 'Find romaji',


  description: '',


  inputs: {
    word_romaji: {
      type: 'string',
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var w_search = inputs.word_romaji


    var arr_word1 = new Array()
    var arr_word2 = new Array()
    var arr_word3 = new Array()
    var arr_word4 = new Array()
    var arr_results = new Array()

    var results = await Words.find({
      'romaji':{ contains: w_search },
      'flag':'word',
      'active':2
    })

    var regex1 = new RegExp('^' + w_search + '$', "iu");
    var regex2 = new RegExp('^' + w_search + '.+', "iu");

    results.forEach( (items, index)=>{


      if ( ( regex1.test(items.romaji) && items.kanji!=null  && items.examples != null ) ) {
        arr_word1 = arr_word1.concat(items)
      }else if ( regex1.test(items.romaji) ) {
        arr_word2 = arr_word2.concat(items) 
      }else if ( ( regex2.test(items.romaji) && items.kanji!=null  && items.examples != null ) ) {
        arr_word3 = arr_word3.concat(items) 
      }else if ( regex2.test(items.romaji) ) {
        arr_word4 = arr_word4.concat(items) 
      } 


    

    })

    arr_results = [].concat(arr_word1, arr_word2, arr_word3, arr_word4)

    return exits.success(arr_results)

  }


};

