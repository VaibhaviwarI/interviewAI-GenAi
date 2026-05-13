const {GoogleGenAI} = require('@google/genai')

const {z} = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
});

async function invokeGeminiAi(){

    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents: "Hello Gemini ! Explain what is interview"
    })

    console.log(response.text);
    
}


const interviewReportSchema = z.object({

    matchScore : z.number().describe("A score between 0 to 100 indicating how well the candidate's profile is according to the job description"),

    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical questions can be asked in the interview"),
        intention : z.string().describe('The intention of interviewer behind asking this question'),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical Questions that can be asked in interview"),

    behavioralQuestions : z.array(z.object({
        question : z.string().describe("The behavioral questions can be asked in the interview"),
        intention : z.string().describe('The intention of interviewer behind asking this question'),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral Questions that can be asked in interview.."),


    skillGaps: z.array(z.object({
        skill : z.string().describe("The skill which the candidate is lacking"),
        severity : z.enum(["low", "medium", "high"]).describe("Severity level of the skill gap")
    })).describe("The list of skill gaps in the candidate's profile along with severity"),


    preparationPlan: z.array(z.object({
        day : z.number().describe("The day number in the preparation from, starting from 1"),
        focus : z.string().describe("The main focus of this day in preparation plan"),
        tasks : z.array(z.string()).describe("Lists of tasks to be done on this day to follow the preparation plan")
    })).describe("A day wise preparation plan for the candidate to follow in"),


    title : z.string().describe("The title of the job for which the interview report is generated")

     

})


async function generateInterviewReport( {resume, selfDescription, jobDescription} ){

    const prompt = `Given the candidate's resume, self description and job description, generate a comprehensive interview report which includes the following sections:
            Resume : ${resume}
            Self Description : ${selfDescription}
            Job Description : ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents : prompt,
        config : {
            responseMimeType : "application/json",
            responsechema : zodToJsonSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text);

}


module.exports = generateInterviewReport