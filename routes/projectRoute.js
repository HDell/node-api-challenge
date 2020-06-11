const express = require("express");
const router = express.Router();
const ProjectModel = require("../data/helpers/projectModel.js");
router.get('/', (req, res) => {
    ProjectModel.get()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The Projects could not be retrieved."})
        });
});
router.get('/:id', (req, res) => {
    const {id} = req.params;
    ProjectModel.get(id)
        .then(response => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({err: 'The project with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The Project could not be retrieved."})
        });
});
router.post('/', (req, res) => {
    const project = req.body;
    if (!(project.name && project.description)) {
        res.status(400).json({errorMessage: 'Please provide name and description for the project.'});
    } else {
        ProjectModel.insert(project)
            .then(response => {
                res.status(201).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({err: "Sorry. The Project could not be created."})
            });
    }
});
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if (!(changes.name && changes.description)) {
        res.status(400).json({errorMessage: 'Please provide name and description for the project.'});
    } else {
        ProjectModel.update(id, changes)
            .then(response => {
                if (response) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({err: 'The project with the specified ID does not exist.'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({err: "Sorry. The Project could not be modified."})
            });
    }
});
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    ProjectModel.remove(id)
        .then(response => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({err: 'The project with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The Project could not be removed."})
        });
});
router.get('/actions/:id', (req, res) => {
    const {id} = req.params;
    ProjectModel.getProjectActions(id)
        .then(response => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({err: 'The project with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The Actions could not be retrieved."})
        });
});
module.exports = router;