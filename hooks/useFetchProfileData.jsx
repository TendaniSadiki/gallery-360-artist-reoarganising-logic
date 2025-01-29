import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebase/firebase.config";

export const useFetchProfileData = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [signature, setSignature] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
    localArea: "",
    type: "",
    zone: "",
    country: "",
  });
  const [contactNumber, setContactNumber] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const userDocRef = doc(FIRESTORE_DB, "artists", user.uid);
          const paymentDocRef = doc(FIRESTORE_DB, "paymentDetails", user.uid);

          const userDoc = await getDoc(userDocRef);
          const paymentDoc = await getDoc(paymentDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("User Data:", data);

            setUserData(data);
            setName(data?.fullname || "");
            setImage(data?.imageUrl ? { uri: data.imageUrl } : null);
            setDateOfBirth(data?.dateofbirth || "");
            setBio(data?.biography || "");
            setSignature(data?.signature ? { uri: data.signature } : "");
            setAddress({
              street: data?.address?.street || "",
              city: data?.address?.city || "",
              province: data?.address?.province || "",
              postalCode: data?.address?.postalCode || "",
              localArea: data?.address?.localArea || "",
              type: data?.address?.type || "",
              zone: data?.address?.zone || "",
              country: data?.address?.country || "",
            });
            setContactNumber(data?.contactnumber || "");
            setFacebook(data?.facebook || "");
            setInstagram(data?.instagram || "");
            setWebsiteUrl(data?.websiteurl || "");
            setVideoUrl(data?.videoUrl || "");
          } else {
            console.log("No user profile found!");
          }

          if (paymentDoc.exists()) {
            const paymentData = paymentDoc.data();
            console.log("Payment Data:", paymentData);

            setAccountHolder(paymentData?.accountHolder || "");
            setAccountNumber(paymentData?.accountNumber || "");
            setBankName(paymentData?.bankName || "");
            setBranchCode(paymentData?.branchCode || "");
            setDocumentUrl(paymentData?.documentUrl || "");
          } else {
            console.log("No payment details found!");
          }
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    userData,
    name,
    image,
    dateOfBirth,
    bio,
    signature,
    accountHolder,
    accountNumber,
    bankName,
    branchCode,
    documentUrl,
    address,
    contactNumber,
    facebook,
    instagram,
    websiteUrl,
    videoUrl,
  };
};
