const { PatientcorepopulatedtableCsv } = require('./patientcorepopulatedtableCsv.class');
const createModel = require('../../models/patientcorepopulatedtableCsv.model');
const hooks = require('./patientcorepopulatedtableCsv.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/patientcorepopulatedtableCsv', new PatientcorepopulatedtableCsv(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('patientcorepopulatedtableCsv');

  service.hooks(hooks);
};