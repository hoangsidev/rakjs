module.exports = {
  friendlyName: 'Search Paragraph',
  description: 'Search Paragraph.',
  inputs: {
    word: {
        type: 'string',
      }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'frontend/searchpara'
    },
    redirect: {
        responseType: 'redirect'
      }
  },
  fn: async function (inputs, exits) {
    return exits.success()
  }
};
