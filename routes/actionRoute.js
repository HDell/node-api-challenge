const express = require("express");
const router = express.Router();
const ActionModel = require("../data/helpers/actionModel.js");
router.get('/', (req, res) => {
    ActionModel.get()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The Actions could not be retrieved."})
        });
});
router.get('/:id', (req, res) => {
    const {id} = req.params;
    ActionModel.get(id)
        .then(response => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({err: 'The action with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The Action could not be retrieved."})
        });
});
router.post('/', (req, res) => {
    const action = req.body;
    if (!(action.project_id && action.description && action.notes)) {
        res.status(400).json({errorMessage: 'Please provide a project id, description, and note for the action.'});
    } else {
        ActionModel.insert(action)
            .then(response => {
                res.status(201).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({err: "Sorry. The Action could not be created."})
            });
    }
});
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if (!(changes.project_id && changes.description && changes.notes)) {
        res.status(400).json({errorMessage: 'Please provide a project id, description, and note for the action.'});
    } else {
        ActionModel.update(id, changes)
            .then(response => {
                if (response) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({err: 'The action with the specified ID does not exist.'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({err: "Sorry. The Action could not be modified."})
            });
    }
});
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    ActionModel.remove(id)
        .then(response => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({err: 'The action with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The Action could not be removed."})
        });
});
module.exports = router;