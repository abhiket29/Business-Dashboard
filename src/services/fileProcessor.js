import * as XLSX from 'xlsx';
import { processUploadedData } from '../utils/helpers';

/**
 * Process uploaded Excel/CSV file
 * @param {File} file 
 * @returns {Promise<Array>}
 */
export const processFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Process the data to ensure it has the required columns
        const processedData = processUploadedData(jsonData);
        resolve(processedData);
      } catch (error) {
        reject(new Error('Error processing file. Please check the format.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Validate file type
 * @param {File} file 
 * @returns {boolean}
 */
export const validateFileType = (file) => {
  const allowedTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ];
  
  return allowedTypes.includes(file.type) || 
         file.name.endsWith('.csv') || 
         file.name.endsWith('.xlsx') || 
         file.name.endsWith('.xls');
};

/**
 * Validate file size (max 10MB)
 * @param {File} file 
 * @returns {boolean}
 */
export const validateFileSize = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
};