
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
patientid: faker.lorem.sentence(""),
patientgender: faker.lorem.sentence(""),
patientdateofbirth: faker.lorem.sentence(""),
patientrace: faker.lorem.sentence(""),
patientmaritalstatus: faker.lorem.sentence(""),
patientlanguage: faker.lorem.sentence(""),
patientpopulationpercentagebelowpoverty: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
