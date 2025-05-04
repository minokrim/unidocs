import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {convertToPDF}  from '../services/pdfService.js';

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