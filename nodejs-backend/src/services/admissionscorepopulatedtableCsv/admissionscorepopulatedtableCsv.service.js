const { AdmissionscorepopulatedtableCsv } = require('./admissionscorepopulatedtableCsv.class');
const createModel = require('../../models/admissionscorepopulatedtableCsv.model');
const hooks = require('./admissionscorepopulatedtableCsv.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/admissionscorepopulatedtableCsv', new AdmissionscorepopulatedtableCsv(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admissionscorepopulatedtableCsv');

  service.hooks(hooks);
};