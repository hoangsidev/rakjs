module.exports = {
    friendlyName: 'Insert gop y type word',
    description: 'Insert gop y type word',
    inputs: {
        typeword_id: {
            type: 'string',
        },
        mean: {
            type: 'string',
        },
        mean_id: {
            type: 'string',
        },
        feedb_word_id: {
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
            viewTemplatePath: 'frontend/insertgopymeantypeword'
        },
        redirect: {
            responseType: 'redirect'
        }
    },
    fn: async function (inputs, exits) {

        var ObjectID = require('mongodb').ObjectID;

        var typeword_id = inputs.typeword_id
        var mean_update = inputs.mean
        var mean_id = inputs.mean_id
        var feedb_id = inputs.feedb_word_id
        var feedb_username = inputs.feedb_username
        var user_id = inputs.user_id
        var role_user = inputs.role_user





        // var fid = await Words.findOne({ id: feedb_id }, (err, result) => {
        //     var means = result.means;
        //     means.forEach(element => {
        //         if (element.id == mean_id) {
        //             // console.log(element.fb_means);
        //           var ud =   Words.update({ 'means.id' : element.id }).set({'means.fb_means': 'Frieda'}).fetch();;
        //             console.log(ud)
        //         }

        //     });

        // });



        var data_word = await Words.findOne({
            '_id': feedb_id,
            'active':2
        });

        var arr_insert = new Array();
        var get_data = data_word.means
        var exit_same = 0;

       

        if(  get_data.length > 0  ){

            await  get_data.forEach( element => {

                if( element.id == mean_id && element.active == 2 ){
                    /////////////////////

                        if( element.fb_means == null ){

                                ////////////////////
                                if (role_user == 2 || role_user == 3) {

                                    var new_data = {
                                        id : new ObjectID().toString(), 
                                        fb_mean : mean_update,
                                        fb_type_word : typeword_id,
                                        type_trans : null,
                                        active : 2, 
                                        created_at : new Date(), 
                                        updated_at : null, 
                                        user_created : feedb_username, 
                                        user_updated : null, 
                                        user_actived : null
                                    }

                                }else {

                                    var new_data = {
                                        id : new ObjectID().toString(), 
                                        fb_mean : mean_update,
                                        fb_type_word : typeword_id,
                                        type_trans : null,
                                        active : 0, 
                                        created_at : new Date(), 
                                        updated_at : null, 
                                        user_created : feedb_username, 
                                        user_updated : null, 
                                        user_actived : null
                                    }
                                }
                                ////////////////////

                                var arr_feedback_means = [];

                                arr_feedback_means.push(new_data)

                                element.fb_means = arr_feedback_means

                               arr_insert.push(element);

                        }else{



                            var same_item = 0;

                            var arr_insert2 = new Array();

                            var get_fb_means = element.fb_means

                          get_fb_means.some(function(item,index){

                                if( item.fb_mean == mean_update ){
                                    same_item = 1
                                    return;
                                }else{
                    
                                    var data_item = {
                                    'id': item.id,  
                                    'fb_mean' : item.fb_mean,
                                    'fb_type_word' : item.fb_type_word,
                                    'type_trans' : item.type_trans, 
                                    'active': item.active ,
                                    'created_at': item.created_at ,
                                    'updated_at': item.updated_at ,
                                    'user_created': item.user_created ,
                                    'user_updated': item.user_updated ,
                                    'user_actived': item.user_actived ,
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
                                        fb_mean : mean_update,
                                        fb_type_word : typeword_id,
                                        type_trans : null,
                                        active : 2, 
                                        created_at : new Date(), 
                                        updated_at : null, 
                                        user_created : feedb_username, 
                                        user_updated : null, 
                                        user_actived : null
                                    }
              
                              }else {
              
                                    var new_data = {
                                        id : new ObjectID().toString(), 
                                        fb_mean : mean_update, 
                                        fb_type_word : typeword_id,
                                        type_trans : null,
                                        active : 0, 
                                        created_at : new Date(), 
                                        updated_at : null, 
                                        user_created : feedb_username, 
                                        user_updated : null, 
                                        user_actived : null
                                    }
                              }
                              ////////////////////
              
                            arr_insert2.push(new_data);

                            element.fb_means = arr_insert2

                            arr_insert.push(element);

              
                      }else{
              
                        exit_same = 1

                       
              
                      }
                        //////////////
    
                  }

                    
                }else{

                     arr_insert.push(element);

                }

               


            });

            if( exit_same != 1  ){

                var set_data_word = await Words.update({ id: feedb_id }).set({'means' : arr_insert }).fetch();

                return exits.success({result:1})

            }else{

                return exits.success({result:0})

            }

           

        }



        // var data = {
        //     typeword_id:typeword_id,
        //     mean_update:mean_update,
        //     mean_id:mean_id,
        //     feedb_word_id:feedb_word_id,
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
