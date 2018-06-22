module.exports = {
    friendlyName: 'Logout',
    description: 'Logout users.',
    inputs: {
        url: {
            type: 'string',
          },
    },
    exits: {
    success: {
        responseType: 'view',
        viewTemplatePath: 'frontend/logout'
        },
      redirect: {
        responseType: 'redirect'
      }
    },
    fn: async function (inputs, exits) {

      this.res.clearCookie('me');
      this.req.session.destroy(function(err) {  
        return exits.redirect(inputs.url);
      });
    //    console.log('Hello')
    }
  };
