module.exports = {
  friendlyName: 'Search Paragrap Ajax',
  description: 'Search Paragrap Ajax',
  inputs: {
    source: {
        type: 'string',
      },
    target: {
      type: 'string',
    },
    content: {
      type: 'string',
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/searchparatranslate'
    },
    redirect: {
        responseType: 'redirect'
      }
  },
  fn: async function (inputs, exits) {

      var translate = require('node-google-translate-skidz');

      var text = inputs.content
      var source = inputs.source
      var target = inputs.target


      var result_search_google = {
        trans:null,
        orig:null,
        translit:null,
        src_translit:null
      }


      translate({
        text: text,
        source: source,
        target: target
      }, function(result) {
       
        result_search_google.orig = text
        result_search_google.trans = result.translation

       

        if( source == "ja" ){
          var last_item =  result.sentences.length - 1;
          result_search_google.src_translit = result.sentences[last_item].src_translit
        }

        if( target == "ja" ){
          var last_item2 =  result.sentences.length - 1;
          result_search_google.translit = result.sentences[last_item2].translit
        }

        return exits.success( {data_search_gg:JSON.stringify(result_search_google)} )

      });


  }

};
