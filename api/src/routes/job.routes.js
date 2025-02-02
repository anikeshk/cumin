const { Router } = require('express');

const JobController = require('../controllers/job.controller');

const router = Router();

router.post('/', JobController.createJob);
router.get('/', JobController.getJobsByUser);

module.exports = router;
