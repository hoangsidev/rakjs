module.exports = {


  friendlyName: 'Find mean',


  description: '',


  inputs: {
    word_mean: {
      type: 'string',
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var w_search = inputs.word_mean
 

    
    var arr_mean1 = new Array()
    var arr_mean2 = new Array()
    var arr_mean3 = new Array()
    var arr_mean4 = new Array()
    var arr_results = new Array()


    var results = await Words.find({
      'means.mean': { contains: w_search },
      'means.active':2,
      'flag':'word',
      'active':2,
    }).meta({enableExperimentalDeepTargets:true})


  //  var regex_mean1 = new RegExp('^' + w_search + '$', "iu");
  //  var regex_mean2 = new RegExp('^' + w_search + ',|;|,|;|.+', "iu");
  //  var regex_mean3 = new RegExp('.+ ' + w_search + ',|;|,|;|.+' , "iu");

  var regex_mean1 = new RegExp('^' + w_search + '$', "iu");
  var regex_mean2 = new RegExp('^' + w_search + '[;,]?' + ' ' + '.+' , "iu");
  var regex_mean3 = new RegExp('.+' + ' ' + w_search + '[;,]?' + ' ' + '.+', "iu");


   results.forEach( (items, index)=>{

        var flat1 = 0
        var flat2 = 0
        var flat3 = 0

        items.means.forEach( (item, index2)=>{

          if (regex_mean1.test(item.mean)) {
            flat1 = 1
          } 

          if (regex_mean2.test(item.mean)) {
            flat2 = 1  
          } 

          if (regex_mean3.test(item.mean)) {
            flat3 = 1  
          } 

        })

        if( (flat1 == 1 && items.kanji!=null && items.hiragana != null && items.examples != null ) || flat1 == 1  ){
            
          arr_mean1 = arr_mean1.concat(items)

        }else if( (flat2 == 1 && items.kanji!=null && items.hiragana != null && items.examples != null) || (flat3 == 1 && items.kanji!=null && items.hiragana != null && items.examples != null)  ){

          arr_mean2 = arr_mean2.concat(items)

        }else if( (flat1 == 1 && items.kanji!=null && items.hiragana != null ) || (flat2 == 1 && items.kanji!=null && items.hiragana != null) || (flat3 == 1 && items.kanji!=null && items.hiragana != null)  ){

          arr_mean3 = arr_mean3.concat(items)

        }else if( flat2 == 1  ){

          arr_mean4 = arr_mean4.concat(items)

        }

   })

   
    arr_results = [].concat(arr_mean1, arr_mean2, arr_mean3, arr_mean4)

    return exits.success(arr_results)

  }


};

