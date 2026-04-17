const express = require('express');
const app = express();

const port = process.env.PORT || 8086;

app.use(express.json());


let businesses = [];
let marked_for_delete = [];

app.listen(port, () => {
    console.log(`=== Server is listening on port ${port}`);
});


app.get('/businesses', (req, res, next) => {
    if (businesses.length === 0) {
        res.status(200);
        res.send("Nothing is here ");
    } else {
        activeBusinesses = [];
        for (let i = 0; i < businesses.length; i++) {
            let msg = businesses[i];
            if (msg && msg[1]) {
                activeBusinesses.push(msg[0]);
            }
        }
        res.status(200)
        res.send(activeBusinesses)
    }
});

//[business], deleted, review, photo]
app.post("/businesses", (req, res, next) => {
    if (marked_for_delete.length === 0) {
        businesses.push([req.body, true, [], []])
        res.status(201);
        console.log(businesses[businesses.length - 1][0])
        res.send(businesses[businesses.length - 1][0]);
    } else {
        let empty_space = marked_for_delete.pop();
        businesses[empty_space] = [req.body, true, [], []];
        res.status(201);
        console.log(businesses[empty_space][0])
        res.send(businesses[empty_space][0]);
    }
});


app.get("/businesses/:id", (req, res, next) => {
    let id = Number(req.params.id);
    if (businesses[id] && businesses[id][1]) {
        res.status(200);
        res.send(businesses[id][0]);
    } else {

        res.status(404);
        res.send("Businesses not found");

    }
});

app.put("/businesses/:id", (req, res, next) => {
    let id = Number(req.params.id);

    if (!businesses[id] || !businesses[id][1]) {
        res.status(404);
        res.send("Businesses not found");
    } else {
        businesses[id][0] = req.body;
        res.status(200);
        res.send(businesses[id][0]);
    }
});


app.delete("/businesses/:id", (req, res, next) => {

    let id = Number(req.params.id)

    let currentBusinesses = businesses[id]

    if (!currentBusinesses || !currentBusinesses[1]) {
        res.status(404);
        res.send("Businesses not found")
    } else {

        currentBusinesses[1] = false
        marked_for_delete.push(id)
        res.status(200);
        res.send(currentBusinesses[0]);
    }


});

//[0][1][2][3]
app.get('/businesses/:id/review', (req, res, next) => {
    let id = Number(req.params.id)
    let currentBusinessesReview = businesses[id][2]
    if (!businesses[id]) {
        res.status(404).send("Businesses not found");
        return;
    }

    if (currentBusinessesReview.length === 0) {
        res.status(200);
        res.send("No reviews");
    } else {
        let activeBusinesses = [];
        for (let i = 0; i < currentBusinessesReview.length; i++) {
            let msg = currentBusinessesReview[i];
            if (msg && msg[1]) {
                currentBusinessesReview.push(msg[0]);
            }
        }
        res.status(200)
        res.send(activeBusinesses)
    }
});

app.post("/businesses/:id/review", (req, res, next) => {
    let id = Number(req.params.id)
    let currentBusinessesReview = businesses[id][2]

    let deletedReview = []

    if (!businesses[id]) {
        res.status(404).send("Businesses not found");
        return;
    }

    for (let i = 0; i < currentBusinessesReview.length && deletedReview.length === 0; i++) {
        if (currentBusinessesReview[i][1] == false) {
            deletedReview.push(i)
        }
    }

    if (deletedReview.length === 0) {
        currentBusinessesReview.push([req.body, true])
        res.status(201);
        
        res.send(req.body);
    } else {
        let empty_space = deletedReview.pop();

        currentBusinessesReview[empty_space] = [req.body, true];

        res.status(201);
        res.send(req.body);
    }
});


app.get("/businesses/:id/review/:reviewid", (req, res, next) => {

    if (!businesses[id]) {
        res.status(404).send("Businesses not found");
        return;
    }

    let id = Number(req.params.id)

    let reviewid = Number(req.params.reviewid)

    let currentBusinessesReview = businesses[id][2][reviewid]

    if (currentBusinessesReview && currentBusinessesReview[1]) {
        res.status(200);
        res.send(currentBusinessesReview[0]);
    } else {

        res.status(404);
        res.send("Businesses not found");

    }
});

app.put("/businesses/:id/review/:reviewid", (req, res, next) => {
    let id = Number(req.params.id);
    let reviewid = Number(req.params.reviewid);

    if (!businesses[id]) {
        res.status(404);
        res.send("Businesses not found");
        return;
    }

    let currentReview = businesses[id][2][reviewid];

    if (!currentReview || !currentReview[1]) {
        res.status(404);
        res.send("Review not found");
    } else {
        currentReview[0] = req.body;
        res.status(200);
        res.send(currentReview[0]);
    }
});

app.delete("/businesses/:id/review/:reviewid", (req, res, next) => {

    let id = Number(req.params.id);
    let reviewid = Number(req.params.reviewid);

    if (!businesses[id]) {
        res.status(404).send("Businesses not found");
        return;
    }

    let currentBusinessesReview = businesses[id][2][reviewid];

    if (!currentBusinessesReview || !currentBusinessesReview[1]) {
        res.status(404);
        res.send("Businesses not found")
    } else {
        currentBusinessesReview[1] = false
        res.status(200);
        res.send(currentBusinessesReview[0]);
    }
});


app.post("/businesses/:id/photo", (req, res, next) => {
    let id = Number(req.params.id);

    if (!businesses[id]) {
        res.status(404).send("Businesses not found");
        return;
    }

    let currentBusinessesPhoto = businesses[id][3];
    let deletedPhoto = [];

    for (let i = 0; i < currentBusinessesPhoto.length && deletedPhoto.length === 0; i++) {
        if (currentBusinessesPhoto[i][1] === false) {
            deletedPhoto.push(i)
        }
    }

    if (deletedPhoto.length === 0) {
        currentBusinessesPhoto.push([req.body, true])
        res.status(201);
        res.send(req.body);
    } else {
        let empty_space = deletedPhoto.pop();
        currentBusinessesPhoto[empty_space] = [req.body, true];
        res.status(201);
        res.send(req.body);
    }
});


app.get("/businesses/:id/photo/:photoid", (req, res, next) => {

    let id = Number(req.params.id);
    let photoid = Number(req.params.photoid);

    if (!businesses[id]) {
        res.status(404).send("Businesses not found");
        return;
    }

    let currentBusinessesPhoto = businesses[id][3][photoid];

    if (currentBusinessesPhoto && currentBusinessesPhoto[1]) {
        res.status(200);
        res.send(currentBusinessesPhoto[0]);
    } else {
        res.status(404);
        res.send("Businesses not found");
    }
});

app.put("/businesses/:id/photo/:photoid", (req, res, next) => {
    let id = Number(req.params.id);
    let photoid = Number(req.params.photoid);

    if (!businesses[id]) {
        res.status(404);
        res.send("Businesses not found");
        return;
    }

    let currentPhoto = businesses[id][3][photoid];

    if (!currentPhoto || !currentPhoto[1]) {
        res.status(404);
        res.send("Photo not found");
    } else {
        currentPhoto[0] = req.body;
        res.status(200);
        res.send(currentPhoto[0]);
    }
});


app.delete("/businesses/:id/photo/:photoid", (req, res, next) => {
    let id = Number(req.params.id);
    let photoid = Number(req.params.photoid);

    if (!businesses[id]) {
        res.status(404).send("Businesses not found");
        return;
    }

    let currentBusinessesPhoto = businesses[id][3][photoid];

    if (!currentBusinessesPhoto || !currentBusinessesPhoto[1]) {
        res.status(404);
        res.send("Businesses not found")
    } else {
        currentBusinessesPhoto[1] = false
        res.status(200);
        res.send(currentBusinessesPhoto[0]);
    }
});




