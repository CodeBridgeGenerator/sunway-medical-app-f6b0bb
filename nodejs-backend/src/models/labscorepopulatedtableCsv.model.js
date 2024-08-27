
    module.exports = function (app) {
        const modelName = 'labscorepopulatedtable_csv';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            patientid: { type: Schema.Types.ObjectId, ref: "patientcorepopulatedtable_csv" },
admissionid: { type: Schema.Types.ObjectId, ref: "admissionscorepopulatedtable_csv" },
labname: { type: String, required: false, unique: false, lowercase: false, uppercase: false, minLength: 2, maxLength: 1000, index: true, trim: true },
labvalue: { type: String, required: false, unique: false, lowercase: false, uppercase: false, minLength: 1, maxLength: 1000, index: true, trim: true },
labunits: { type: String, required: false, unique: false, lowercase: false, uppercase: false, minLength: 1, maxLength: 1000, index: true, trim: true },
labdatetime: { type: Date, required: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };