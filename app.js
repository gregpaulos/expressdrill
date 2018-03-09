const express = require('express')
const cors = require("cors");
const morgan = require('morgan');

const app = express()
app.use(cors());
app.use(morgan('tiny'));

var port = process.env.PORT || 3000;


// clean up cohorts csv
var cohorts = require("./cohorts.js")
cohortsarray = cohorts.cohorts.split("\n")
cohortsdata = []
let keys = cohortsarray[0].split(",")

for (let i = 1; i <cohortsarray.length; i++) {
    let roomarray = cohortsarray[i].split(",")
    let roomdic={}
    roomarray.forEach((value, j) => {
        roomdic[keys[j]] = value
    });
    cohortsdata.push(roomdic)    
}




function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].ID == id){
            return data[i];
        }
    }
    return null;
}


app.get('/', (req, res) => {
    res.status(200);
    res.json({data: cohortsdata});
    })



app.get("/:id", function (req, res, next) {
    var record = findById(cohortsdata, req.params.id);
    if (!record){
            res.status(404);
            const error = new Error('Not Found.');
            next(error);
    } else {
        res.status(200);
        res.json({data: record});
    }
});

app.use((error, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
      message: error.message,
      errors: error.errors
    });
  });


app.listen(port, () => console.log('Example app listening on port '+ port))