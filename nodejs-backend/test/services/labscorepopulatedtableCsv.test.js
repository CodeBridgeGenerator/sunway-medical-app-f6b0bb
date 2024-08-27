const assert = require('assert');
const app = require('../../src/app');

describe('\'labscorepopulatedtableCsv\' service', () => {
  it('registered the service', () => {
    const service = app.service('labscorepopulatedtableCsv');

    assert.ok(service, 'Registered the service (labscorepopulatedtableCsv)');
  });
});
