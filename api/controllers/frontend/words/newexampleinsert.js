module.exports = {
  friendlyName: 'Thêm mới exam',
  description: 'Thêm mới exam',
  inputs: {
    feed_id: {
        type: 'string',
    },
    sentence: {
        type: 'string',
    },
    mean_ex: {
        type: 'string',
    },
    furi: {
        type: 'string',
    },
    user_id: {
        type: 'string',
    },
    user_name: {
        type: 'string',
    },
    role_user: {
        type: 'string',
    },
        
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/newexampleinsert'
    },
    redirect: {
        responseType: 'redirect'
      }
  },
  fn: async function (inputs, exits) {

    var ObjectID = require('mongodb').ObjectID;

    var feed_id = inputs.feed_id
    var sentence = inputs.sentence
    var mean_ex = inputs.mean_ex
    var furi = inputs.furi
    var user_id = inputs.user_id
    var user_name = inputs.user_name
    var role_user = inputs.role_user



    var data_exams = await Words.findOne({
        '_id': feed_id,
        'active':2
    });

    var exams = new Array();
    var get_exams = data_exams.examples
    var same_exam = 0;

    if( get_exams == null ){

        ////////////////////
        if (role_user == 2 || role_user == 3) {
    
            var new_exam = {
                    id: new ObjectID().toString(),
                    example: sentence,
                    example_hira:null,
                    mean_pinyin:null,
                    mean_exam:mean_ex,
                    type_trans: "vi",
                    furigana: furi,
                    active: 2,
                    created_at: new Date(),
                    updated_at: null,
                    user_created: user_name,
                    user_updated: null,
                    user_actived: null,
                    fb_examples : null
            }

        }else {

                var new_exam = {
                        id: new ObjectID().toString(),
                        example: sentence,
                        example_hira:null,
                        mean_pinyin:null,
                        mean_exam:mean_ex,
                        type_trans: "vi",
                        furigana: furi,
                        active: 0,
                        created_at: new Date(),
                        updated_at: null,
                        user_created: user_name,
                        user_updated: null,
                        user_actived: null,
                        fb_examples : null
                }
        }
        ////////////////////

        var arr_feedback_exams = [];
            arr_feedback_exams.push(new_exam)

            var data_word = await Words.update({ id: feed_id }).set({examples:arr_feedback_exams}).fetch();

            return exits.success({result:1}) 

    }else{

        await get_exams.some(function(item,index){

            if( item.example == sentence ){
                same_exam = 1
                return;
            }else{
    
                var id = item.id.toString()
    
                var exam_item = {
                 'id': id,  
                 'example' : item.example, 
                 'example_hira': item.example_hira,
                 'mean_pinyin' : item.mean_pinyin,
                 'mean_exam': item.mean_exam ,
                 'type_trans': item.type_trans ,
                 'furigana': item.furigana ,
                 'active': item.active ,
                 'created_at': item.created_at ,
                 'updated_at': item.updated_at ,
                 'user_created': item.user_created ,
                 'user_updated': item.user_updated ,
                 'user_actived': item.user_actived,
                 'fb_examples' : item.fb_examples
                 };
    
                 exams.push(exam_item);
    
            }
    
        })
    
        if( same_exam == 0 ){
    
            ////////////////////
            if (role_user == 2 || role_user == 3) {
    
                var new_exam = {
                        id: new ObjectID().toString(),
                        example: sentence,
                        example_hira:null,
                        mean_pinyin:null,
                        mean_exam:mean_ex,
                        type_trans: "vi",
                        furigana: furi,
                        active: 2,
                        created_at: new Date(),
                        updated_at: null,
                        user_created: user_name,
                        user_updated: null,
                        user_actived: null,
                        fb_examples : null
                }
    
            }else {
    
                    var new_exam = {
                            id: new ObjectID().toString(),
                            example: sentence,
                            example_hira:null,
                            mean_pinyin:null,
                            mean_exam:mean_ex,
                            type_trans: "vi",
                            furigana: furi,
                            active: 0,
                            created_at: new Date(),
                            updated_at: null,
                            user_created: user_name,
                            user_updated: null,
                            user_actived: null,
                            fb_examples : null
                    }
            }
            ////////////////////
    
            await exams.push(new_exam);
    
            var data_word = await Words.update({ id: feed_id }).set({examples:exams}).fetch();
    
            return exits.success({result:1})
    
        }else{
            return exits.success({result:0})
        }
    
        /////////////////////////////

    }

    

  }
};
