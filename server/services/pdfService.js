import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';
import path from 'path';
import dotenv from 'dotenv';
import speech from "@google-cloud/text-to-speech"

dotenv.config();

const publicKey = process.env.ILOVEPDF_PUBLIC;
const secretKey = process.env.ILOVEPDF_SECRET;
const ilovepdf = new ILovePDFApi(publicKey, secretKey);
const googleCredentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);


export const convertToPDF = async (publicUrl, baseDir) => {
    try {
        const task = ilovepdf.newTask('imagepdf');
        await task.start();
        const file = new ILovePDFFile(publicUrl);  
        await task.addFile(file);
        await task.process();
        const pdfBuffer = await task.download();
        return pdfBuffer;
      } catch (error) {
        throw error;
      }
};

export const audioService=async(publicUrl)=>{
    try {
        const task = ilovepdf.newTask("extract");
        await task.start();

        const fullPath = path.join(publicUrl); 
        const file = new ILovePDFFile(fullPath)

        await task.addFile(file);

        await task.process();

        
        const data=await task.download()

        const textData = data.toString('utf16le'); 
    try {
        const client = new speech.TextToSpeechClient({  credentials: {
    client_email: googleCredentials.client_email,
    private_key: googleCredentials.private_key,
  },
  projectId: googleCredentials.project_id,
});
        const request={
            input: { ssml: `<speak>${textData}</speak>` },
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            audioConfig: {audioEncoding: 'MP3'},
        }
        const [response] =  await client.synthesizeSpeech(request);
        return response;

    } catch (error) {
      throw error
    }

}catch (error) {
  throw error
}
}


export const mergeServices=async(filepath1, filepath2)=>{
  try {
    const task = ilovepdf.newTask("merge");

    await task.start();

    const file1 = new ILovePDFFile(path.join(filepath1));
    const file2 = new ILovePDFFile(path.join(filepath2));
  

    await task.addFile(file1);
    await task.addFile(file2)
    
    await task.process();

    const data=await task.download();
    return data;
  } catch (error) {
    throw error;
  }
}