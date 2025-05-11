import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';
import path from 'path';
import dotenv from 'dotenv';
import speech from "@google-cloud/text-to-speech"

dotenv.config();

const publicKey = process.env.ILOVEPDF_PUBLIC;
const secretKey = process.env.ILOVEPDF_SECRET;
const ilovepdf = new ILovePDFApi(publicKey, secretKey);


export const convertToPDF = async (filepath, baseDir) => {
    try {
        const task = ilovepdf.newTask('imagepdf');
        await task.start();
        const file = new ILovePDFFile(filepath);  
        await task.addFile(file);
        await task.process();
        const pdfBuffer = await task.download();
        return pdfBuffer;
      } catch (error) {
        console.error("ILovePDF conversion error:", error.response?.data || error.message || error);
        throw error;
      }
};

export const audioService=async(filepath)=>{
    try {
        const task = ilovepdf.newTask("extract");
        await task.start();

        const fullPath = path.join(filepath); // correct join
        const file = new ILovePDFFile(fullPath)

        await task.addFile(file);

        await task.process();

        const data=await task.download()

        const textData = data.toString('utf16le'); 
    try {
        const client = new speech.TextToSpeechClient();
        const request={
            input: { ssml: `<speak>${textData}</speak>` },
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            audioConfig: {audioEncoding: 'MP3'},
        }
        const [response] =  await client.synthesizeSpeech(request);
        console.log(response)
        return response;

    } catch (error) {
        console.error("Error in Text-to-Speech:", error);
    }

}catch (error) {
    console.error("Error processing file:", error);
}
}


export const mergeServices=async(filepath1, filepath2)=>{
  try {
    const task = ilovepdf.newTask("merge");

    await task.start();

    const file1 = new ILovePDFFile(path.resolve(filepath1));
    const file2 = new ILovePDFFile(path.resolve(filepath2));

    await task.addFile(file1);
    await task.addFile(file2)
    
    await task.process();

    const data=await task.download();
    return data;
  } catch (error) {
    console.error("ILovePDF merge error:", error.response?.data || error.message || error);
    throw error;
  }
}