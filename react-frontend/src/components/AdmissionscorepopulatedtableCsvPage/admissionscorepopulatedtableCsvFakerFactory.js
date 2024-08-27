
import { faker } from "@faker-js/faker";
export default (user,count,patientidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
patientid: patientidIds[i % patientidIds.length],
admissionid: faker.lorem.sentence(1),
admissionstartdate: faker.date.past(""),
admissionenddate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
