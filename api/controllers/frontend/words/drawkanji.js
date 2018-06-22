module.exports = {
  friendlyName: 'Draw Kanji',
  description: 'Draw Kanji',
  inputs: {
    kq: {
        type: 'string',
      }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/drawkanji'
    },
    redirect: {
        responseType: 'redirect'
      }
  },
  fn: async function (inputs, exits) {
    
    ///////////////////////
    var get_data = inputs.kq
    
    var get_data_json = JSON.parse(get_data)
    
    var request = require('request');

    var headersOpt = {  
        "content-type": "application/json",
        "content-length": get_data.length
    };

    request(
        {
        method:'post',
        url:'https://inputtools.google.com/request?itc=ja-t-i0-handwrit&app=demopage', 
        body: get_data_json, 
        headers: headersOpt,
        json: true,
    }, function (error, response, body) {  
        //Print the Response
        return exits.success({datadraw:body})
       
    }); 


    
    ////////////////////////
  }

};
