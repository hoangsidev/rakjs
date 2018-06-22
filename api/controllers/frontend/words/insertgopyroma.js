module.exports = {
  friendlyName: 'Insert gop y roma',
  description: 'Insert gop y roma',
  inputs: {
    roma: {
        type: 'string',
    },
    roma_id: {
        type: 'string',
    },
    feedb_username: {
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
      viewTemplatePath: 'frontend/insertgopyroma'
    },
    redirect: {
        responseType: 'redirect'
      }
  },
  fn: async function (inputs, exits) {

    var ObjectID = require('mongodb').ObjectID;

    var roma = inputs.roma
    var feedb_id = inputs.roma_id
    var user_id = inputs.user_id
    var feedb_username = inputs.feedb_username
    var role_user = inputs.role_user

    var data_word = await Words.findOne({
      '_id': feedb_id,
      'active':2
    });

    var arr_insert = new Array();

    var get_data = data_word.feedback_romajis

    var same_item = 0;

    if( get_data == null ){

      ////////////////////
      if (role_user == 2 || role_user == 3) {

        var new_data = {
                id: new ObjectID().toString(),
                romaji: roma,
                active: 2,
                created_at: new Date(),
                updated_at: null,
                user_created: feedb_username,
                user_updated: null,
                user_actived: null,
        }

    }else {

          var new_data = {
            id: new ObjectID().toString(),
            romaji: roma,
            active: 0,
            created_at: new Date(),
            updated_at: null,
            user_created: feedb_username,
            user_updated: null,
            user_actived: null,
          }
    }
    ////////////////////
          var arr_feedback_romajis = [];
          arr_feedback_romajis.push(new_data)

          var set_data_word = await Words.update({ id: feedb_id }).set({'feedback_romajis' : arr_feedback_romajis }).fetch();

          return exits.success({result:1})  

    }else{

       //////////////
       await get_data.some(function(item,index){

        if( item.romaji == roma ){
            same_item = 1
            return;
        }else{

            var data_item = {
            'id': item.id,  
            'romaji' : item.romaji, 
            'active': item.active ,
            'created_at': item.created_at ,
            'updated_at': item.updated_at ,
            'user_created': item.user_created ,
            'user_updated': item.user_updated ,
            'user_actived': item.user_actived ,
            };

            arr_insert.push(data_item);

        }

    })


    if( same_item == 0 ){

        ////////////////////
          if (role_user == 2 || role_user == 3) {

            var new_data = {
                    id: new ObjectID().toString(),
                    romaji: roma,
                    active: 2,
                    created_at: new Date(),
                    updated_at: null,
                    user_created: feedb_username,
                    user_updated: null,
                    user_actived: null,
            }

        }else {

              var new_data = {
                id: new ObjectID().toString(),
                romaji: roma,
                active: 0,
                created_at: new Date(),
                updated_at: null,
                user_created: feedb_username,
                user_updated: null,
                user_actived: null,
              }
        }
      ////////////////////

      await arr_insert.push(new_data);

      // console.log(arr_insert)

      var set_data_word = await Words.update({ id: feedb_id }).set({'feedback_romajis' : arr_insert }).fetch();


      return exits.success({result:1})

    }else{

    return exits.success({result:0})

    }
    //////////////


    }

    // var data = {
    //     roma:roma,
    //     roma_id:roma_id,
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
