const mongoose = require('mongoose');

/**
 * * Job Description Schema
 * resume text : String
 * self description: String
 * 
 * matchScore : Number 
 * Technical Questions : [ {
 *        question : "",
 *        intention : "",
 *        answer : "" 
 *    } ]
 * Behavioural Question : [{
 *         question : "",
 *        intention : "",
 *        answer : "" 
 * }]
 * Skill gaps :  [ {
 *      skill : "",
 *      severity: "",
 *     type : String,
 *     enum : ["low","mid","high"]
 *      } ]
 * preparation plan : [ {
 *   day: Number,
 *   focus: String,
 *   tasks : [String]
 * 
 * } ]
 */

const technicalQuestionsSchema = new mongoose.Schema({

    question : {
        type : String,
        required : [true, "Technical Question is required"]

    },

    intention : {
        type : String,
        required : [true, "Intention is required"]
    },

    answer : {
        type : String,
        required : [true, "Answer is required"]
    }


}, {
    _id : false
})

const behavioralQuestionsSchema = new mongoose.Schema({

    question : {
        type : String,
        required : [true, "Technical Question is required"]

    },

    intention : {
        type : String,
        required : [true, "Intention is required"]
    },

    answer : {
        type : String,
        required : [true, "Answer is required"]
    }


}, {
    _id: false
})


const skillGapSchema = new mongoose.Schema({

    skill : {
        type : String,
        required : [true, "Skill is required"]
    },

    severity : {
        type : String,
        enum : ["low", "medium", "high"],
        require : [true, "Severity is required"]
    }

}, {
    _id : false
})

const preparationPlanSchema = ({

    day : {
        type : Number,
        required: [true, "Day is requried"]
    },

    focus : {
        type : String,
        required : [true, "Focus is required"]
    },

    tasks : [ {
        type : String,
        required : [true, "Task is required"]
    }]



})


const interviewReportSchema = new mongoose.Schema({

    jobDescription : {
        type : String,
        required : [true, "Job Description is required"]        
    },

    resume : {
        type : String
    },


    selfDescription : {
        type : String
    },

    matchScore : {
        type : Number,
        min : 0,
        max: 100
    },

    technicalQuestions : [technicalQuestionsSchema],
    behavioralQuestions : [behavioralQuestionsSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }



}, {timestamps : true})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel;

  