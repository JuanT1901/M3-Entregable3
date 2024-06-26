const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Actor, { through: "actorMovie" });
Actor.belongsToMany(Movie, { through: "actorMovie" });

Movie.belongsToMany(Director, { through: "directorMovie" });
Director.belongsToMany(Movie, { through: "directorMovie" });

Movie.belongsToMany(Genre, { through: "genreMovie" });
Genre.belongsToMany(Movie, { through: "genreMovie" });