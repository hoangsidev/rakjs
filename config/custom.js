/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  base_url : 'http://localhost:1337',
  base_url_admin : 'http://localhost:1337/backend'
  // get_approvals :  () => {
  //   var count_approvals = sails.helpers.backend.globals();
  //   console.log(count_approvals);
  //   return count_approvals;
  // }
  
};
