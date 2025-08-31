import React from 'react';
import { Upload } from 'lucide-react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { SAMPLE_DATA, REQUIRED_COLUMNS } from '../../utils/constants';
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * Upload page component for file uploads
 * @param {Object} props 
 * @returns {JSX.Element}
 */
const UploadPage = ({ onUpload }) => {
  const {
    dragActive,
    uploading,
    error,
    handleDrag,
    handleDrop,
    handleFileInput,
    resetUpload
  } = useFileUpload();

  const generateSampleData = () => {
    resetUpload();
    // Simulate upload delay
    setTimeout(() => {
      onUpload(SAMPLE_DATA);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Upload className="mx-auto h-16 w-16 text-indigo-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Upload Your Data</h2>
            <p className="text-gray-600 mt-2">
              Upload a CSV or Excel file containing your product data
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, onUpload)}
          >
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFileInput(e, onUpload)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            
            {uploading ? (
              <LoadingSpinner 
                size="md"
                color="indigo"
                text="Processing file..."
              />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-gray-500 mt-1">
                    Supports CSV and Excel files
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">
              Required columns: {REQUIRED_COLUMNS.join(', ')}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={generateSampleData}
                disabled={uploading}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Use Sample Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;