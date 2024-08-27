const assert = require('assert');
const app = require('../../src/app');

describe('\'admissionscorepopulatedtableCsv\' service', () => {
  it('registered the service', () => {
    const service = app.service('admissionscorepopulatedtableCsv');

    assert.ok(service, 'Registered the service (admissionscorepopulatedtableCsv)');
  });
});
