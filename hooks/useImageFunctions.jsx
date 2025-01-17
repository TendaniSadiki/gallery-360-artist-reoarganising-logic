import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { STORAGE } from "../firebase/firebase.config"; // Ensure STORAGE is imported from your config
import { showToast } from "./useToast";

export const useImageFunctions = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [document, setDocument] = useState(null);
  const [documentUrl, setDocumentUrl] = useState("");
  const [progress, setProgress] = useState(0);
// SIYQ8sTli$$Er4Q
  async function uploadImage(uri, folder) {
    try {
      // showToast('about to init image')
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(STORAGE, `${folder}/` + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob);
      // showToast('about to upload image')
      // return
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + uploadProgress + "% done");
          setProgress(uploadProgress.toFixed());
        },
        (error) => {
          console.error("Upload Error: ", error);
          showToast("Upload Error: " + error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            if (folder === "Artworks") {
              const newImageUrl = { imgUrl: downloadURL, default: imagesUrls.length === 0 };
              setImagesUrls((prevUrls) => [...prevUrls, newImageUrl]);
              setImageUrl(downloadURL);
            } else if (folder === "Profile") {
              setVideoUrl(downloadURL);
            }
          });
        }
      );
    } catch (error) {
      console.log(error);
      showToast(JSON.stringify(error))
    }
  }

  async function pickMultipleImages() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      setImages((prevImages) => [...prevImages, source]);
      await uploadImage(result.assets[0].uri, "Artworks");
    }
  }

  async function pickOneImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const source = result.assets[0].uri;
      setImage(source);
      // showToast(source)
      // return
      await uploadImage(result.assets[0].uri, "Artworks");
    }
  }

  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "Profile");
    }
  }
  async function uploadFile(uri, folder) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(STORAGE, `${folder}/` + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + uploadProgress + "% done");
        setProgress(uploadProgress.toFixed());
      },
      (error) => {
        console.error("Upload Error: ", error);
        alert("Upload Error: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          if (folder === "Documents") {
            setDocumentUrl(downloadURL);
          } else if (folder === "Artworks") {
            setImageUrl(downloadURL);
          } else if (folder === "Profile") {
            setVideoUrl(downloadURL);
          }
        });
      }
    );
  }

  async function pickDocument() {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept all file types
        copyToCacheDirectory: true,
      });

      if (result.type !== "cancel") {
        const { uri, name, size } = result;
        console.log("Document selected:", { uri, name, size });
        setDocument({ uri, name, size });
        await uploadFile(uri, "Documents");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      alert("Error picking document. Please try again.");
    }
  }

  return {
    pickOneImage,
    pickMultipleImages,
    pickVideo,
    pickDocument,
    video,
    videoUrl,
    image,
    imagesUrls,
    images,
    imageUrl,
    document,
    documentUrl,                                    
    progress,
  };
};
