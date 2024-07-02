const request = require("supertest");
const app = require("../app");

let actorId;
const actor = {
  firstName: "Henry",
  lastName: "Cavill",
  nationality: "british",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Henry_Cavill_%2848417913146%29_%28cropped%29.jpg/330px-Henry_Cavill_%2848417913146%29_%28cropped%29.jpg",
  birthday: "1983-05-05",
};
const BASE_URL = "/api/v1/actors";

test("Post -> '/actors', should return status code 201 and res.firstName === actor.firstName", async () => {
  const res = await request(app).post(BASE_URL).send(actor);
  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("Get -> '/actors', should return status code 200 and res.body and have length = 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get -> '/actors/:id', should return status code 200 and res.body === actor", async () => {
  const res = await request(app).get(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
  expect(res.body.lastName).toBe(actor.lastName);
  expect(res.body.nationality).toBe(actor.nationality);
  expect(res.body.image).toBe(actor.image);
  expect(res.body.birthday).toBe(actor.birthday);
});

test("Update -> '/actors/:id', should return status code 200 and res.body === actorUpdate", async () => {
  const actorUpdate = {
    firstName: "Ryan",
    lastName: "Reynolds",
    nationality: "canadian",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg/330px-Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg",
    birthday: "1976-10-23",
  };

  const res = await request(app).put(`${BASE_URL}/${actorId}`).send(actorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdate.firstName);
  expect(res.body.lastName).toBe(actorUpdate.lastName);
  expect(res.body.nationality).toBe(actorUpdate.nationality);
  expect(res.body.image).toBe(actorUpdate.image);
  expect(res.body.birthday).toBe(actorUpdate.birthday);
});

test("Delete -> '/actors/:id', should return status code 204", async() => {
  const res = await request(app).delete(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(204);
});