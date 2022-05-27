db.createUser({
  user: "twitter",
  pwd: "twitter",
  roles: [
    {
      role: "readWrite",
      db: "twitter",
    },
  ],
});

db = new Mongo().getDB("twitter");

db.createCollection("contents");

// db.contents.insertMany([
//   { tweet: "Hello World!", img: "" },
//   {
//     tweet:
//       "Content creation and programming are basically full time jobs. I have enough projects and work to keep me busy for years. Working in tech is definitely going to entertain you for a long time which is why so many people want to transition into this field.",
//     img: "",
//   },
//   { tweet: "JavaScript developers are forever in high demand", img: "" },
// ]);
