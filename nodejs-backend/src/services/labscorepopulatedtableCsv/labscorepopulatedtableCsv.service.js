const { LabscorepopulatedtableCsv } = require('./labscorepopulatedtableCsv.class');
const createModel = require('../../models/labscorepopulatedtableCsv.model');
const hooks = require('./labscorepopulatedtableCsv.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/labscorepopulatedtableCsv', new LabscorepopulatedtableCsv(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('labscorepopulatedtableCsv');

  service.hooks(hooks);
};