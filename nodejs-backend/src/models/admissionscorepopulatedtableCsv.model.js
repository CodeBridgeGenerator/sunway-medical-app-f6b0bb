
    module.exports = function (app) {
        const modelName = 'admissionscorepopulatedtable_csv';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            patientid: { type: Schema.Types.ObjectId, ref: "patientcorepopulatedtable_csv" },
admissionid: { type: String, required: false, unique: false, lowercase: false, uppercase: false, minLength: 2, maxLength: 150, index: true, trim: true },
admissionstartdate: { type: Date, required: false },
admissionenddate: { type: Date, required: false },

            
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