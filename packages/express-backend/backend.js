// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.get("/users", (req, res) => {
    const name = req.query.name;
    
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

app.get("/users/name-and-job", (req, res) => {
    const { name, job } = req.query;  
    if (name && job) {
      const result = findUserByNameAndJob(name, job);  
      res.json({ users_list: result });
    } 
  });

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);

  if (addedUser) {
    //Currently trying to test for error handling, need to change this to code to 200 to check for that
    res.status(201).json(addedUser);
  } else {
    res.status(500).send("Error adding user");
  }
  res.send();
});

const delUser = (name) => {
    const index = users["users_list"].findIndex(user => user.name === name);
    if (index !== -1) {
      return users["users_list"].splice(index, 1); 
    }
    return null; 
  };
  
  app.delete("/users", (req, res) => {
    const { name } = req.body;  
    const deletedUser = delUser(name);
    if (deletedUser) {
        res.status(200).send('Deleted successfully');
      } else {
        res.status(404).send('Not found');
      }      
  });
  
