<img src="https://predictcovid.com/card.png" width="512" alt="Banner with chart preview" />

# Interactive COVID-19 Country Tracker

Built with [RedwoodJS](https://redwoodjs.com), an interactive visualization of the COVID-19 pandemic,
charted country-to-country. Made by [@lachlanjc](https://lachlanjc.me) +
[@zachlatta](https://zachlatta.com) (while in isolation, of course).

Check it out live: [**predictcovid.com**](https://predictcovid.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/bdfb5b9d-a04d-4f31-88b6-b8fe7c10c14c/deploy-status)](https://app.netlify.com/sites/countrycovid19/deploys)

## Development

### Clone

```terminal
git clone https://github.com/lachlanjc/covid19
cd covid19
```

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn
```

### Initialize Database

We’re using [Prisma2](https://github.com/prisma/prisma2), a modern DB toolkit to query, migrate and model your database.

Prisma2 is [ready for production](https://isprisma2ready.com).

To create a development database:

1. Change `./api/prisma/schema.prisma` to use `"sqlite"`:

```prisma
datasource DS {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

2. Then run `yarn redwood prisma migrate dev`

This will read the schema definition in `api/prisma/schema.prisma` and generate a SQLite database in `api/prisma/dev.db`

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on
`http://localhost:8911` and are also proxied to `http://localhost:8910/api/functions/*`.

But we don’t have any data!

### Downloading data

First, seed the database:

```terminal
yarn redwood prisma db seed
```

Now, run the scraper. In one terminal, start the server (`yarn rw dev`), and in another, make this request:

```terminal
curl http://localhost:8911/scrape
```

(Note: it will eventually hang, first on your curl request, & then the scraper doesn’t currently print a success message.)

You should be good to go now! Open [localhost:8910](http://localhost:8910) & enjoy development.

### Docker

You should be able to start the app in docker with `docker-compose up --build`. If you want to run it in the background: `docker-compose up -d --build`. If you want to run a shell in a container: `docker-compose run --rm web sh` or `docker-compose run --rm api sh`

Database should persist, so you can run `docker-compose down` and restart whenever you'd like. If you want to delete the database/volume, run `docker-compose down -v`.

---

_Thanks to [dDara](https://thenounproject.com/dDara/) for [the icon](https://thenounproject.com/dDara/collection/coronavirus/)._

MIT License
