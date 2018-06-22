module.exports = {


  friendlyName: 'Filter words',


  description: '',


  inputs: {

    word_filter: {
      type: 'string',
    },

  },

  exits: {

  },


  fn: async function (inputs, exits) {

    var result = null;

    var ws = inputs.word_filter;

    ws = ws.trim();

    if (ws == '' || ws == undefined ) {
       result = null
    } else {
        var pattern = /[\/\\@^;,+()$~%.'":*?<>!{}]/giu;
        var regex_symbols = new RegExp(pattern);
        if (regex_symbols.test(ws)) {
            result = ws.replace(pattern, '')
        } else {
            result = ws
        }
        result = result.toLowerCase()
    }

    return exits.success(result)

}


};

