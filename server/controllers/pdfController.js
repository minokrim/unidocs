import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {convertToPDF}  from '../services/pdfService.js';
import {audioService}  from '../services/pdfService.js';
import { mergeServices } from '../services/pdfService.js';
import util from "util"
import { supabase } from '../config/db.js';
import { v4 as uuidv4 } from "uuid";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const convertImageToPDF = async (req, res) => {
    const fileBuffer = req.file.buffer;
    const ext = req.file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const tempPath = path.join("/tmp", filename);

    fs.writeFileSync(tempPath, fileBuffer);
  
    try {
      const pdfBuffer = await convertToPDF(tempPath);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
      res.send(pdfBuffer);
      fs.unlinkSync(pdfBuffer)
    } catch (err) {
      console.log(err)
      res.status(500).send("Conversion failed");
    }
  };


  export const convertPdftoaudio=async(req,res)=>{
      const fileBuffer=req.file.buffer;
      const ext = req.file.originalname.split('.').pop();
      const filename = `${uuidv4()}.${ext}`;
    const tempPath = path.join("/tmp", filename);

    fs.writeFileSync(tempPath, fileBuffer);
         const { error } = await supabase.storage
      .from("document")
      .upload(filename, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }

    const { data: publicUrlData} = supabase.storage
      .from("document")
      .getPublicUrl(filename);

    const publicUrl = publicUrlData.publicUrl;
  
      try{
          const response= await audioService(tempPath);
          const writeFile = util.promisify(fs.writeFile);
          console.log(response)
  
          await writeFile('output.mp3', response.audioContent, 'binary');
    
          res.setHeader('Content-Type', 'audio/mp3');
          res.setHeader('Content-Disposition', 'attachment; filename="output.mp3"');
  
          res.send(response.audioContent);
          
      }
      catch (error) {
        throw error;
      }
  }

export const mergeServices = async (url1, url2) => {
  try {
    const task = ilovepdf.newTask("merge");
    await task.start();

    // Download from Supabase
    const downloadFile = async (url, filename) => {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const filePath = path.join("/tmp", filename); // temp directory
      fs.writeFileSync(filePath, response.data);
      return new ILovePDFFile(filePath);
    };

    const file1 = await downloadFile(url1, "file1.pdf");
    const file2 = await downloadFile(url2, "file2.pdf");

    await task.addFile(file1);
    await task.addFile(file2);

    await task.process();
    const data = await task.download();

    return data;
  } catch (error) {
    throw error;
  }
};

