

module.exports = {
    friendlyName: 'Thêm mới mean',
    description: 'Thêm mới mean',
    inputs: {
        typeword_id: {
            type: 'string',
        },
        mean: {
            type: 'string',
        },
        feed_id: {
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
            viewTemplatePath: 'frontend/newmeantypewordinsert'
        },
        redirect: {
            responseType: 'redirect'
        }
    },
    fn: async function (inputs, exits) {

        var ObjectID = require('mongodb').ObjectID;

        var typeword_id = inputs.typeword_id
        var mean = inputs.mean
        var feed_id = inputs.feed_id
        var user_id = inputs.user_id
        var user_name = inputs.user_name
        var role_user = inputs.role_user

        var data_means = await Words.findOne({
            '_id': feed_id,
            'active':2
        });
       
        var means = new Array();

        var get_means = data_means.means

        var same_mean = 0;


        if( get_means == null ){


            ////////////////////
            if (role_user == 2 || role_user == 3) {

                var new_mean = {
                        id: new ObjectID().toString(),
                        mean: mean,
                        type_trans: "vi",
                        type_word: typeword_id,
                        active: 2,
                        created_at: new Date(),
                        updated_at: null,
                        user_created: user_name,
                        user_updated: null,
                        user_actived: null,
                        fb_means: null
                }

            }else {

                    var new_mean = {
                            id: new ObjectID().toString(),
                            mean: mean,
                            type_trans: "vi",
                            type_word: typeword_id,
                            active: 0,
                            created_at: new Date(),
                            updated_at: null,
                            user_created: user_name,
                            user_updated: null,
                            user_actived: null,
                            fb_means: null
                    }
            }
            ////////////////////

            var arr_feedback_means = [];
                arr_feedback_means.push(new_mean)

            var data_word = await Words.update({ id: feed_id }).set({means:arr_feedback_means}).fetch();

            return exits.success({result:1})    


        }else{

                ////////////////
                await get_means.some(function(item,index){

                    if( item.mean == mean ){
                        same_mean = 1
                        return;
                    }else{

                        var id = item.id.toString()

                        var mean_item = {
                        'id': id,  
                        'mean' : item.mean, 
                        'type_trans': item.type_trans,
                        'type_word' : item.type_word,
                        'active': item.active ,
                        'created_at': item.created_at ,
                        'updated_at': item.updated_at ,
                        'user_created': item.user_created ,
                        'user_updated': item.user_updated ,
                        'user_actived': item.user_actived ,
                        'fb_means':item.fb_means
                        };

                        means.push(mean_item);

                    }

                })
                /////////////////


                if( same_mean == 0 ){

                    ////////////////////
                    if (role_user == 2 || role_user == 3) {

                        var new_mean = {
                                id: new ObjectID().toString(),
                                mean: mean,
                                type_trans: "vi",
                                type_word: typeword_id,
                                active: 2,
                                created_at: new Date(),
                                updated_at: null,
                                user_created: user_name,
                                user_updated: null,
                                user_actived: null,
                                fb_means: null
                        }

                    }else {

                            var new_mean = {
                                    id: new ObjectID().toString(),
                                    mean: mean,
                                    type_trans: "vi",
                                    type_word: typeword_id,
                                    active: 0,
                                    created_at: new Date(),
                                    updated_at: null,
                                    user_created: user_name,
                                    user_updated: null,
                                    user_actived: null,
                                    fb_means: null
                            }
                    }
                    ////////////////////

                    await means.push(new_mean);
                    

                    var data_word = await Words.update({ id: feed_id }).set({means:means}).fetch();

                    return exits.success({result:1})

                }else{

                    return exits.success({result:0})
                    
                }

        }


        
    
    }
};
