import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';
import path from 'path';
import dotenv from 'dotenv';

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