import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {convertToPDF}  from '../services/pdfService.js';
import {audioService}  from '../services/pdfService.js';
import { mergeServices } from '../services/pdfService.js';
import util from "util"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const convertImageToPDF = async (req, res) => {
    const filepath = req.file.path;
  
    try {
      const pdfBuffer = await convertToPDF(filepath, __dirname);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
      res.send(pdfBuffer);
      fs.unlinkSync(filepath);
    } catch (err) {
      res.status(500).send("Conversion failed");
    }
  };


  export const convertPdftoaudio=async(req,res)=>{
      const filePath=req.file.path;
  
      try{
          const response= await audioService(filePath);
          const writeFile = util.promisify(fs.writeFile);
  
          await writeFile('output.mp3', response.audioContent, 'binary');
  
          console.log('Audio content written to file: output.mp3');
  
          res.setHeader('Content-Type', 'audio/mp3');
          res.setHeader('Content-Disposition', 'attachment; filename="output.mp3"');
  
          res.send(response.audioContent);
          
      }
      catch (error) {
          console.error("Error processing file:", error);
      }
  }
  
  export const filemerge=async (req,res)=>{
    const files = req.files;

    if (!files || files.length < 2) {
        return res.status(400).json({ error: "Please upload two files for merging." });
    }

    const [filepath1, filepath2] = files.map(file => file.path);
    try {
          const response= await mergeServices(filepath1,filepath2);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');

        res.send(response);

        try {
            fs.unlinkSync(filepath1);
        } catch (err) {
            console.error(`Error deleting file ${filepath1}:`, err.message);
        }
        
        try {
            fs.unlinkSync(filepath2);
        } catch (err) {
            console.error(`Error deleting file ${filepath2}:`, err.message);
        }
    } catch (error) {
        console.error("Error merging files:", error);
        res.status(500).json({ error: "An error occurred while converting the file." });
    }
  }