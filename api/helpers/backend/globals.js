module.exports = {
  friendlyName: 'Globals',
  description: 'Globals backend.',
  inputs: {
  },
  exits: {
  },
  fn: async function (inputs, exits) {
    // var count_approvals = await  Words.count({ 'active' : [ 0, 1 ] }).fetch();
    // count_approvals : 'xxxxxxxxxxx';
   
    return exits.success({
      count_approvals : 'xxxxxxxxxxx'
    });

  }
};

