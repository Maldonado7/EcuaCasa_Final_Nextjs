'use client'

import { UploadDropzone } from "../lib/uploadthing"

export default function TestUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test UploadThing</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Profile Image Upload Test</h2>
          <UploadDropzone
            endpoint="providerProfileImage"
            onClientUploadComplete={(res) => {
              console.log("Files uploaded:", res);
              alert("Upload completed! Check console for details.");
            }}
            onUploadError={(error: Error) => {
              console.error("Upload error:", error);
              alert(`Upload error: ${error.message}`);
            }}
            onUploadBegin={() => {
              console.log("Upload starting...");
            }}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
          <h2 className="text-xl font-semibold mb-4">Gallery Upload Test</h2>
          <UploadDropzone
            endpoint="providerGallery"
            onClientUploadComplete={(res) => {
              console.log("Gallery files uploaded:", res);
              alert("Gallery upload completed! Check console for details.");
            }}
            onUploadError={(error: Error) => {
              console.error("Gallery upload error:", error);
              alert(`Gallery upload error: ${error.message}`);
            }}
            onUploadBegin={() => {
              console.log("Gallery upload starting...");
            }}
          />
        </div>
      </div>
    </div>
  )
}