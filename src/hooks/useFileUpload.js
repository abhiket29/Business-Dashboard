import { useState } from 'react';
import { processFile, validateFileType, validateFileSize } from '../services/fileProcessor';

/**
 * Custom hook for file upload functionality
 * @returns {Object} Upload state and methods
 */
export const useFileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e, onSuccess) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0], onSuccess);
    }
  };

  const handleFileInput = async (e, onSuccess) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0], onSuccess);
    }
  };

  const handleFile = async (file, onSuccess) => {
    setError(null);
    
    // Validate file type
    if (!validateFileType(file)) {
      setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      return;
    }

    // Validate file size
    if (!validateFileSize(file)) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    
    try {
      const processedData = await processFile(file);
      
      // Simulate upload delay for better UX
      setTimeout(() => {
        setUploading(false);
        onSuccess(processedData);
      }, 1500);
    } catch (error) {
      setUploading(false);
      setError(error.message);
    }
  };

  const resetUpload = () => {
    setDragActive(false);
    setUploading(false);
    setError(null);
  };

  return {
    dragActive,
    uploading,
    error,
    handleDrag,
    handleDrop,
    handleFileInput,
    resetUpload
  };
};