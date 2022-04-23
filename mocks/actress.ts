import Mock, { Random } from "mockjs";

Mock.setup({
  timeout: "200-600",
});

Random.extend({
  uuid() {
    return Random.guid();
  },
  name() {
    return Random.cname();
  },
  birthday() {
    return Random.date("yyyy-mm-dd");
  },
  location() {
    return [
      Random.region(),
      Random.province(),
      Random.city(),
      Random.county(),
    ].join("-");
  },
});

Mock.mock("/api/actress", function () {
  return Mock.mock({
    "list|20": [
      {
        uuid: "@uuid",
        name: "@name",
        birthday: "@birthday",
        location: "@location",
      },
    ],
  }).list;
});
