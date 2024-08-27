const assert = require('assert');
const app = require('../../src/app');

describe('\'admissionsdiagnosescorepopulatedtableCsv\' service', () => {
  it('registered the service', () => {
    const service = app.service('admissionsdiagnosescorepopulatedtableCsv');

    assert.ok(service, 'Registered the service (admissionsdiagnosescorepopulatedtableCsv)');
  });
});
