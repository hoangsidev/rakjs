module.exports = {
  friendlyName: 'Insert gop y example',
  description: 'Insert gop y example',
  inputs: {
    example_id: {
        type: 'string',
    },
    exam_sentence: {
        type: 'string',
    },
    mean_ex: {
        type: 'string',
    },
    furi: {
        type: 'string',
    },
    feedb_username: {
        type: 'string',
    },
    feedb_word_id: {
        type: 'string',
    },
    user_id: {
        type: 'string',
    },
    role_user: {
        type: 'number',
    },
        
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/insertgopyexample'
    },
    redirect: {
        responseType: 'redirect'
      }
  },
  fn: async function (inputs, exits) {

    var ObjectID = require('mongodb').ObjectID;

    var example_id = inputs.example_id
    var exam_sentence = inputs.exam_sentence
    var mean_ex = inputs.mean_ex
    var furi = inputs.furi
    var feedb_id = inputs.feedb_word_id
    var feedb_username = inputs.feedb_username
    var user_id = inputs.user_id
    var role_user = inputs.role_user



    var data_word = await Words.findOne({
        '_id': feedb_id,
        'active':2
    });

    // console.log(data_word)

        var arr_insert = new Array();
        var get_data = data_word.examples
        var exit_same = 0;

        if(  get_data.length > 0  ){

            await  get_data.forEach( element => { 


                if( element.id == example_id && element.active == 2 ){
                    ////////////////////
                    if( element.fb_examples == null ){

                        ////////////////////
                        if (role_user == 2 || role_user == 3) {

                            var new_data = {
                                id : new ObjectID().toString(), 
                                fb_example: exam_sentence,
                                fb_example_hira : null,
                                fb_mean_pinyin : null,
                                fb_mean_exam : mean_ex,
                                type_trans : null,  
                                fb_furigana : furi, 
                                active : 2, 
                                created_at : new Date(), 
                                updated_at : null, 
                                user_created : feedb_username, 
                                user_updated : null, 
                                user_actived : null,
                            }

                        }else {

                            var new_data = {
                                id : new ObjectID().toString(), 
                                fb_example: exam_sentence,
                                fb_example_hira : null,
                                fb_mean_pinyin : null,
                                fb_mean_exam : mean_ex,
                                type_trans : null,  
                                fb_furigana : furi, 
                                active : 0, 
                                created_at : new Date(), 
                                updated_at : null, 
                                user_created : feedb_username, 
                                user_updated : null, 
                                user_actived : null,
                            }
                        }
                        ////////////////////

                        var arr_feedback_examples = [];

                        arr_feedback_examples.push(new_data)

                        element.fb_examples = arr_feedback_examples

                        arr_insert.push(element);


                    }else{

                            var same_item = 0;

                            var arr_insert2 = new Array();

                            var get_fb_exams = element.fb_examples

                            get_fb_exams.some(function(item,index){

                                if( item.fb_example == exam_sentence || item.fb_mean_exam == mean_ex  ){
                                    same_item = 1
                                    return;
                                }else{
                    
                                    var data_item = {
                                        "id" : item.id,
                                        "fb_example": item.fb_example,
                                        "fb_example_hira" : item.fb_example_hira,
                                        "fb_mean_pinyin" : item.fb_mean_pinyin,
                                        "fb_mean_exam" : item.fb_mean_exam,
                                        "type_trans" : item.type_trans,  
                                        "fb_furigana" : item.fb_furigana, 
                                        "active" : item.active, 
                                        "created_at" : item.created_at, 
                                        "updated_at" : item.updated_at, 
                                        "user_created" : item.user_created, 
                                        "user_updated": item.user_updated, 
                                        "user_actived" : item.user_actived,
                                    };
                    
                                    arr_insert2.push(data_item);
                    
                                }
                    
                            })

                            //////////////
                            if( same_item == 0 ){

                                ////////////////////
                                if (role_user == 2 || role_user == 3) {
              
                                    var new_data = {
                                        id : new ObjectID().toString(), 
                                        fb_example: exam_sentence,
                                        fb_example_hira : null,
                                        fb_mean_pinyin : null,
                                        fb_mean_exam : mean_ex,
                                        type_trans : null,  
                                        fb_furigana : furi, 
                                        active : 2, 
                                        created_at : new Date(), 
                                        updated_at : null, 
                                        user_created : feedb_username, 
                                        user_updated : null, 
                                        user_actived : null,
                                    }
              
                              }else {
              
                                    var new_data = {
                                        id : new ObjectID().toString(), 
                                        fb_example: exam_sentence,
                                        fb_example_hira : null,
                                        fb_mean_pinyin : null,
                                        fb_mean_exam : mean_ex,
                                        type_trans : null,  
                                        fb_furigana : furi, 
                                        active : 0, 
                                        created_at : new Date(), 
                                        updated_at : null, 
                                        user_created : feedb_username, 
                                        user_updated : null, 
                                        user_actived : null,
                                    }
                              }
                              ////////////////////

                                 arr_insert2.push(new_data);

                                element.fb_examples = arr_insert2

                                arr_insert.push(element);

                            }else{
                                exit_same = 1
                            }
                            /////////////

                    }
                    ////////////////////
                }else{
                    arr_insert.push(element);
                }


            });

            if( exit_same != 1  ){

                var set_data_word = await Words.update({ id: feedb_id }).set({'examples' : arr_insert }).fetch();

                return exits.success({result:1})

            }else{

                return exits.success({result:0})

            }

        }    

    // var data = {
    //     example_id:example_id,
    //     exam_sentence:exam_sentence,
    //     mean_ex:mean_ex,
    //     furi:furi,
    //     feedb_id:feedb_id,
    //     feedb_username:feedb_username,
    //     user_id:user_id,
    //     role_user:role_user
    // }

    // data = JSON.stringify(data)

    // var result = {
    //   result:data
    // }

    // return exits.success(result)

  }
};
