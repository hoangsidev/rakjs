/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/




  // backend
  'GET /backend/dashboard': { action: 'backend/dashboard' },
  'GET /backend/words/page/:page': { action: 'backend/words/words' },
  // 'GET /backend/word/view/:id': { action: 'backend/words/view' },
  'GET /backend/word/create': { action: 'backend/words/create' },
  'POST /backend/word/insert': { action: 'backend/words/insert' },
  'GET /backend/word/edit/:id': { action: 'backend/words/edit' },
  'POST /backend/word/update': { action: 'backend/words/update' },
  'POST /backend/word/delete': { action: 'backend/words/delete' },

  'GET /backend/approvals/page/:page': { action: 'backend/approvals/approvals' },
  // 'GET /backend/approval/view/:id': { action: 'backend/approvals/view' },
  // 'GET /backend/approval/create': { action: 'backend/approvals/create' },
  // 'POST /backend/approval/insert': { action: 'backend/approvals/insert' },
  'GET /backend/approval/edit/:id': { action: 'backend/approvals/edit' },
  'POST /backend/approval/update': { action: 'backend/approvals/update' },
  'POST /backend/approval/delete': { action: 'backend/approvals/delete' },

  'GET /backend/': { action: 'backend/users/login' },
  'POST /backend/': { action: 'backend/users/login' },
  'GET /backend/logout': { action: 'backend/users/logout' },

  'GET /backend/users/page/:page': { action: 'backend/users/users' },
  // 'GET /backend/user/view/:id': { action: 'backend/users/view' },
  'GET /backend/user/create': { action: 'backend/users/create' },
  'POST /backend/user/insert': { action: 'backend/users/insert' },
  'GET /backend/user/edit/:id': { action: 'backend/users/edit' },
  'POST /backend/user/update': { action: 'backend/users/update' },
  'POST /backend/user/delete': { action: 'backend/users/delete' },

  'GET /backend/config': { action: 'backend/config' },
  'GET /backend/feedback': { action: 'backend/feedback' },



  'GET /backend/feedbacks_kanji/page/:page': { action: 'backend/feedbacks/kanjis/kanjis' },
  'GET /backend/feedbacks_kanji/edit/:id': { action: 'backend/feedbacks/kanjis/edit' },
  'POST /backend/feedbacks_kanji/update': { action: 'backend/feedbacks/kanjis/update' },

  
  'GET /backend/feedbacks_hiragana/page/:page': { action: 'backend/feedbacks/hiraganas/hiraganas' },
  'GET /backend/feedbacks_hiragana/edit/:id': { action: 'backend/feedbacks/hiraganas/edit' },
  'POST /backend/feedbacks_hiragana/update': { action: 'backend/feedbacks/hiraganas/update' },


  'GET /backend/feedbacks_katakana/page/:page': { action: 'backend/feedbacks/katakanas/katakanas' },
  'GET /backend/feedbacks_katakana/edit/:id': { action: 'backend/feedbacks/katakanas/edit' },
  'POST /backend/feedbacks_katakana/update': { action: 'backend/feedbacks/katakanas/update' },


  'GET /backend/feedbacks_romaji/page/:page': { action: 'backend/feedbacks/romajis/romajis' },
  'GET /backend/feedbacks_romaji/edit/:id': { action: 'backend/feedbacks/romajis/edit' },
  'POST /backend/feedbacks_romaji/update': { action: 'backend/feedbacks/romajis/update' },


  
  'GET /backend/feedbacks_mean/page/:page': { action: 'backend/feedbacks/means/means' },
  'GET /backend/feedbacks_mean/edit/:id': { action: 'backend/feedbacks/means/edit' },
  'POST /backend/feedbacks_mean/update': { action: 'backend/feedbacks/means/update' },


  'GET /backend/feedbacks_example/page/:page': { action: 'backend/feedbacks/examples/examples' },
  'GET /backend/feedbacks_example/edit/:id': { action: 'backend/feedbacks/examples/edit' },
  'POST /backend/feedbacks_example/update': { action: 'backend/feedbacks/examples/update' },



  // end backend


  // frontend
  'GET /':  { action: 'frontend/words/index' },
  'GET /search': { action: 'frontend/words/search' },
  'GET /searchpara': { action: 'frontend/words/searchpara' },
  'GET /signup': { action: 'frontend/users/signup' },
  'POST /quicksearch': { action: 'frontend/words/quicksearch' },
  'POST /searchparatranslate': { action: 'frontend/words/searchparatranslate' },
  'POST /drawkanji': { action: 'frontend/words/drawkanji' },

  'POST /insertgopyhira': { action: 'frontend/words/insertgopyhira' },
  'POST /insertgopyroma': { action: 'frontend/words/insertgopyroma' },
  'POST /insertgopykata': { action: 'frontend/words/insertgopykata' },
  'POST /insertgopymeantypeword': { action: 'frontend/words/insertgopymeantypeword' },
  'POST /insertgopyexample': { action: 'frontend/words/insertgopyexample' },
  'POST /create_add_word': { action: 'frontend/words/createaddword' },
  'POST /login': { action: 'frontend/users/login' },
  'GET /logout': { action: 'frontend/users/logout' },
  'POST /newmeantypewordinsert': { action: 'frontend/words/newmeantypewordinsert' },
  'POST /newexampleinsert': { action: 'frontend/words/newexampleinsert' },


  'POST /chinh-sua-kanji': { action: 'frontend/words/chinh-sua-kanji' },
  'POST /chinh-sua-hiragana': { action: 'frontend/words/chinh-sua-hiragana' },
  'POST /chinh-sua-katakana': { action: 'frontend/words/chinh-sua-katakana' },
  'POST /chinh-sua-romaji': { action: 'frontend/words/chinh-sua-romaji' },
  'POST /them-va-chinh-sua-y-nghia': { action: 'frontend/words/them-va-chinh-sua-y-nghia' },
  'POST /them-va-chinh-sua-vi-du': { action: 'frontend/words/them-va-chinh-sua-vi-du' }

  // end frontend

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
