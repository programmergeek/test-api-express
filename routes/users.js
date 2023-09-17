var express = require("express");
var router = express.Router();
const supabase = require("../supabase/supabase");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.log(error);
      res.send({ message: "Fail", status: 513 });
    }
    res.send({ message: data, status: 200 });
  } catch (e) {
    console.log("Failed to retrieve users from database:\n " + e);
    res.send({ message: "Fail", status: 505 });
  }
});

// Add a new user
router.post("/add", async (req, res, next) => {
  const user = req.body;
  try {
    const { data, error } = await supabase.from("users").insert([
      {
        name: user.name,
        age: user.age,
        address: user.address,
      },
    ]);
    if (error) {
      console.log("Supabase: " + error);
      res.send({ message: "Database insert error.", status: 514 });
    }
    res.send({ message: "Success", status: 200 });
  } catch (e) {
    console.error("Database request error: " + e);
    res.send({ message: "Failed", status: 500 });
  }
});

//

module.exports = router;
