import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { STORAGE } from "../firebase/firebase.config"; // Ensure STORAGE is imported from your config

export const useImageFunctions = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);

  async function uploadImage(uri, folder) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(STORAGE, `${folder}/` + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      const source = { uri: result.assets[0].uri };
      setImage(source);
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

  return {
    pickOneImage,
    pickMultipleImages,
    pickVideo,
    video,
    videoUrl,
    image,
    imagesUrls,
    images,
    imageUrl,
    progress,
  };
};
