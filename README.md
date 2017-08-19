# gym buddy

gym buddy is a mobile first full stack application with the primary purpose of keeping track of the users workouts.
There are four majors features:
-Creating an exercise
-Creating a workout
-Selecting and completing a workout
-Ability to view completed workout for future reference

## Built With

SEAN Stack
  Postgresql
  express
  angular
  node

  Angular Materials
  Bootstrap
  Google fonts
  passport
  Heroku

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

technologies used to create gym buddy:

- [Node.js](https://nodejs.org/en/)
- "angular": "^1.6.5",
-  "angular-animate": "^1.6.5",
-  "angular-aria": "^1.6.5",
-  "angular-material": "^1.1.4",
-  "angular-material-data-table": "^0.10.10",
-  "angular-material-icons": "^0.7.1",
-  "angular-messages": "^1.6.5",
-  "angular-moment-picker": "^0.10.1",
-  "angular-route": "^1.6.5",
-  "angular-xeditable": "^0.8.0",
-  "bcrypt": "^1.0.2",
-  "body-parser": "^1.13.3",
-  "bootstrap": "^3.3.5",
-  "express": "^4.15.4",
-  "express-session": "^1.13.0",
-  "jquery": "^2.1.4",
-  "material-design-icons": "^3.0.1",
-  "passport": "^0.2.2",
-  "passport-local": "^1.0.0",
-  "path": "^0.11.14",
-  "pg": "^7.1.0"
- [Postico] (https://eggerapps.at/postico/) (optional)
- [Material Icons] (https://material.io/icons/)


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
CREATE TABLE "quotes" (
  "id" serial primary key,
  "quote" varchar(400) not null UNIQUE
);
CREATE TABLE "classes" (
  "id" serial primary key,
  "class" varchar(80) not null UNIQUE
);
CREATE TABLE "exercises" (
  "id" serial primary key,
  "exercise_name" varchar(80) not null UNIQUE,
  "class" varchar(80)
);

CREATE TABLE "complete_workout" (
  "id" serial primary key,
  "name" varchar(80) not null,
  "exercise_one" varchar (80),
  "exercise_two" varchar (80),
  "exercise_three" varchar (80),
  "exercise_four" varchar (80),
  "exercise_five" varchar (80),
  "exercise_six" varchar (80),
  "reps_one" integer,
  "reps_two" integer,
  "reps_three" integer,
  "reps_four" integer,
  "reps_five" integer,
  "reps_six" integer,
  "user_id" integer,
  FOREIGN KEY (user_id) REFERENCES users,
  "weight_one" integer,
  "weight_two" integer,
  "weight_three" integer,
  "weight_four" integer,
  "weight_five" integer,
  "weight_six" integer,
  "unique_name" varchar(80),
  "workout_date" date,
  "workout_notes" varchar
);

  CREATE TABLE "workouts" (
    "id" serial primary key,
    "name" varchar(80) not null,
    "exercise_one" varchar (80),
    "exercise_two" varchar (80),
    "exercise_three" varchar (80),
    "exercise_four" varchar (80),
    "exercise_five" varchar (80),
    "exercise_six" varchar (80),
    "reps_one" integer,
    "reps_two" integer,
    "reps_three" integer,
    "reps_four" integer,
    "reps_five" integer,
    "reps_six" integer,
    "user_id" integer,
    FOREIGN KEY (user_id) REFERENCES users,

  );
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Name of author(s)


## Acknowledgments

* Hat tip to anyone who's code was used
