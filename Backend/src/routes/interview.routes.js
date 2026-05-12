const express = require('express');
const interviewRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')

/** 
 * POST /api/interview
 * generate interview report for the candidate based on the resume, self description and job description provided by the candidate. The interview report will include match score, technical questions, behavioral questions, skill gaps and preparation plan for the candidate.
 * access : private
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController);


module.exports = interviewRouter;