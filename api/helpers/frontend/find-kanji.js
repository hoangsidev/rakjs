module.exports = {


  friendlyName: 'Find kanji',


  description: '',


  inputs: {
    kanji: {
      type: 'string',
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var w_search = inputs.kanji

    var ws_splits = w_search.split('')

    var arr_results = new Array()


    for( var i = 0; i < ws_splits.length; i++ ) {

      var results = ''

      results = await Words.find({
          and:[
                  {kanji:ws_splits[i]},
                  {flag:'kanji'}
              ]
      })


      arr_results = await arr_results.concat(results) 


    }

    return exits.success(arr_results)

  }


};

