const assert = require('assert');
const app = require('../../src/app');

describe('\'patientcorepopulatedtableCsv\' service', () => {
  it('registered the service', () => {
    const service = app.service('patientcorepopulatedtableCsv');

    assert.ok(service, 'Registered the service (patientcorepopulatedtableCsv)');
  });
});
