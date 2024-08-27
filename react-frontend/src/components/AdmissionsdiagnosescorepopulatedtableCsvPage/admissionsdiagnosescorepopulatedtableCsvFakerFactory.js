
import { faker } from "@faker-js/faker";
export default (user,count,patientidIds,admissionidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
patientid: patientidIds[i % patientidIds.length],
admissionid: admissionidIds[i % admissionidIds.length],
primarydiagnosiscode: faker.lorem.sentence(""),
primarydiagnosisdescription: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
