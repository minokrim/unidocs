import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {convertToPDF}  from '../services/pdfService.js';
import {audioService}  from '../services/pdfService.js';
import { mergeServices } from '../services/pdfService.js';
import util from "util"
import { supabase } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const convertImageToPDF = async (req, res) => {
    const fileBuffer = req.file.buffer;

       const { error } = await supabase.storage
      .from("document")
      .upload("doc", fileBuffer, {
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
  
    try {
      const pdfBuffer = await convertToPDF(publicUrl, __dirname);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
      res.send(pdfBuffer);
      fs.unlinkSync(filepath);
    } catch (err) {
      res.status(500).send("Conversion failed");
    }
  };


  export const convertPdftoaudio=async(req,res)=>{
      const fileBuffer=req.file.buffer;

         const { error } = await supabase.storage
      .from("document")
      .upload("docs", fileBuffer, {
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
          const response= await audioService(publicUrl);
          const writeFile = util.promisify(fs.writeFile);
  
          await writeFile('output.mp3', response.audioContent, 'binary');
    
          res.setHeader('Content-Type', 'audio/mp3');
          res.setHeader('Content-Disposition', 'attachment; filename="output.mp3"');
  
          res.send(response.audioContent);
          
      }
      catch (error) {
        throw error;
      }
  }
  
  export const filemerge=async (req,res)=>{
    const files = req.files.buffer;
    console.log(files)

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
            return err
        }
        
        try {
            fs.unlinkSync(filepath2);
        } catch (err) {
            return err
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while converting the file." });
    }
  }