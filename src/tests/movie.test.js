require("../models")
const request = require("supertest");
const app = require("../app");

let movieId;
const movie = {
  name: "Deadpool",
  image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Deadpool_logo.jpg",
  synopsis: "Wade Wilson, tras ser sometido a un cruel experimento científico, adquiere poderes especiales que le convierten en Deadpool. Armado con sus nuevas habilidades y un retorcido sentido del humor tratará de dar caza al hombre que casi destruye su vida.",
  releaseYear: 2016
};
const BASE_URL = "/api/v1/movies";

test("Post -> '/movies', should return status code 201 and res.name === movie.name", async () => {
  const res = await request(app).post(BASE_URL).send(movie);
  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("Get -> '/movies', should return status code 200 and res.body and have length = 1", async () => {
  const res = await request(app).get(BASE_URL);
  
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get -> '/movies/:id', should return status code 200 and res.body === movie", async () => {
  const res = await request(app).get(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
  expect(res.body.image).toBe(movie.image);
  expect(res.body.synopsis).toBe(movie.synopsis);
  expect(res.body.releaseYear).toBe(movie.releaseYear);
});

test("Update -> '/movies/:id', should return status code 200 and res.body === movieUpdate", async () => {
  const movieUpdate = {
    name: "Monster Inc",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Monsters%2C_Inc._logo.svg/450px-Monsters%2C_Inc._logo.svg.png",
    synopsis: "Monstruos S.A. es la mayor empresa de miedo del mundo, y su principal misión es asustar a los niños entrando al mundo humano a través de sus armarios. Sulley, un imponente personaje de dos metros, piel azul y cuernos, posee el récord de mayor número de sustos a niños.",
    releaseYear: 2001
  };

  const res = await request(app).put(`${BASE_URL}/${movieId}`).send(movieUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movieUpdate.name);
  expect(res.body.image).toBe(movieUpdate.image);
  expect(res.body.synopsis).toBe(movieUpdate.synopsis);
  expect(res.body.releaseYear).toBe(movieUpdate.releaseYear);
});

test("Delete -> '/movies/:id', should return status code 204", async() => {
  const res = await request(app).delete(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(204);
});