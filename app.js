const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors());

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
    res.json({data: cohortsdata});
    })



app.get("/:id", function (req, res) {
    var record = findById(cohortsdata, req.params.id);
    if (!record){
        res.status = 404;
        res.json({
            error: {
                message: "No record found!"
            }
        });
    }

    res.json({data: record});
});


app.listen(port, () => console.log('Example app listening on port '+ port))