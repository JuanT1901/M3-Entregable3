const request = require("supertest");
const app = require("../app");

let directorId;
const director = {
  firstName: "Shawn",
  lastName: "Levy",
  nationality: "canadian",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/4/47/Shawn_Levy_in_Moscow%2C_October_2011.jpg",
  birthday: "1968-07-23",
};
const BASE_URL = "/api/v1/directors";

test("Post -> '/directors', should return status code 201 and res.firstName === director.firstName", async () => {
  const res = await request(app).post(BASE_URL).send(director);
  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("Get -> '/directors', should return status code 200 and res.body and have length = 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get -> '/directors/:id', should return status code 200 and res.body === director", async () => {
  const res = await request(app).get(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
  expect(res.body.lastName).toBe(director.lastName);
  expect(res.body.nationality).toBe(director.nationality);
  expect(res.body.image).toBe(director.image);
  expect(res.body.birthday).toBe(director.birthday);
});

test("Update -> '/directors/:id', should return status code 200 and res.body === directorUpdate", async () => {
  const directorUpdate = {
    firstName: "Pete",
    lastName: "Docter",
    nationality: "american",
    image:
      "https://static.wikia.nocookie.net/pixar/images/c/cb/Pete_Docter.png/revision/latest?cb=20170103151800&path-prefix=es",
    birthday: "1968-10-09",
  };

  const res = await request(app).put(`${BASE_URL}/${directorId}`).send(directorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directorUpdate.firstName);
  expect(res.body.lastName).toBe(directorUpdate.lastName);
  expect(res.body.nationality).toBe(directorUpdate.nationality);
  expect(res.body.image).toBe(directorUpdate.image);
  expect(res.body.birthday).toBe(directorUpdate.birthday);
});

test("Delete -> '/directors/:id', should return status code 204", async() => {
  const res = await request(app).delete(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(204);
});