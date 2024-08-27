
import { faker } from "@faker-js/faker";
export default (user,count,patientidIds,admissionidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
patientid: patientidIds[i % patientidIds.length],
admissionid: admissionidIds[i % admissionidIds.length],
labname: faker.date.past(""),
labvalue: faker.date.past(""),
labunits: faker.date.past(""),
labdatetime: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
