
const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')


console.log("Interview Controller working fine")

async function generateInterviewReportController(req,res){

    
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {selfDescription, jobDescription} = req.body;

   const interviewReportByAi = await generateInterviewReport({
     resume : resumeContent.text,
    selfDescription : selfDescription,
    jobDescription : jobDescription
   })


   const interviewReport = await interviewReportModel.create({
    user : req.user.id,
    resume : resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi

   })

   res.status(201).json({
    message : "Interview Report Generated Successfully",
    interviewReport
   })


}


async function getInterviewReportByIdController(req,res){

    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId,
        user : req.user.id
    })

    if(!interviewReport){
        return res.status(404).json({
            msg : "Interview report not found"
        })
    }

    return res.status(200).json({
        msg : "Interview Report fetched successfully.",
        interviewReport
    })

}


async function getAllInterviewReportController(req,res){


    try{
        const interviewReports = await interviewReportModel.find({
            user : req.user.id,
        }).sort({createdAt: -1})

        return res.status(200).json({
            msg : "Interview Report fetched successfully",
            success : true,
            interviewReports
        })

    }catch(error){
        console.log("Error in getting report (getAllInterviewReportController)",err);
    }
    


}




module.exports = {
    generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportController
}