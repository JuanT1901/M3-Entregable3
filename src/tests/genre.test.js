const request = require("supertest");
const app = require("../app");

let genreId;
const genre = {
  name: "action",
};
const BASE_URL = "/api/v1/genres";

test("Post -> '/genres', should return status code 201 and res.name === genre.name", async () => {
  const res = await request(app).post(BASE_URL).send(genre);
  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("Get -> '/genres', should return status code 200 and res.body and have length = 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get -> '/genres/:id', should return status code 200 and res.body === genre", async () => {
  const res = await request(app).get(`${BASE_URL}/${genreId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("Update -> '/genres/:id', should return status code 200 and res.body === genreUpdate", async () => {
  const genreUpdate = {
    name: "comedian",
  };

  const res = await request(app).put(`${BASE_URL}/${genreId}`).send(genreUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genreUpdate.name);
});

test("Delete -> '/genres/:id', should return status code 204", async() => {
  const res = await request(app).delete(`${BASE_URL}/${genreId}`);

  expect(res.status).toBe(204);
});