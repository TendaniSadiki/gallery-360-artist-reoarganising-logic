import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebase/firebase.config";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB limit for Firestore

export const useDocumentFunctions = () => {
  const [document, setDocument] = useState(null); // Selected document details
  const [documentUrl, setDocumentUrl] = useState(""); // Uploaded document URL
  const [progress, setProgress] = useState(0); // Upload progress
  const [loading, setLoading] = useState(false); // Loading state for progress feedback

  // Function to handle document upload as Base64
  const uploadDocument = async (uri, name) => {
    try {
      // Start loading state
      setLoading(true);

      // Get the file size and check if it exceeds the maximum size
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.size > MAX_FILE_SIZE) {
        alert("File size exceeds 1MB. Please upload a smaller document.");
        setLoading(false);
        return;
      }

      // Convert the document file to Base64 string
      const base64String = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("Document Base64 String:", base64String);

      // Save the Base64 string to Firestore
      await setDoc(doc(FIRESTORE_DB, "paymentDetails", FIREBASE_AUTH.currentUser.uid), {
        accountHolder: "Account Holder Name", // Example data
        bankName: "Bank Name", // Example data
        accountNumber: "Account Number", // Example data
        branchCode: "Branch Code", // Example data
        documentName: name, // Document name
        documentBase64: base64String, // Base64 string of the document
      });

      console.log("Document uploaded successfully.");
      setDocumentUrl(base64String); // Store the Base64 string for reference
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("An error occurred during upload. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after upload
    }
  };

  // Function to pick a document
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept all file types
        copyToCacheDirectory: true,
      });
  
      console.log("Document Picker Result:", result);
  
      if (result.type !== "cancel") {
        // Access the first asset from the result (since it's an array)
        const { uri, name, size } = result.assets[0]; 
        console.log("Selected Document:", { uri, name, size });
  
        // Set document details and proceed with upload
        setDocument({ uri, name, size });
        await uploadDocument(uri, name); // Upload document as Base64
      }
    } catch (error) {
      console.error("Error picking document:", error);
      alert("Error selecting document. Please try again.");
    }
  };
  
  

  return {
    pickDocument,
    document,
    documentUrl,
    progress,
    loading, // Return loading state for UI feedback
  };
};
