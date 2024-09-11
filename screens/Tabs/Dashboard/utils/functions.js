import auth from "../../../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../../../firebase/firebase.config.js";
import ProfilePic from "../../../../components/ProfilePic.js";
import ProfileCard from "../../../../components/ProfileCard.js";
import loader2 from "../../../../assets/images/loader2.gif";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData } from "../../../../features/loginDetails.js";

const getProfileDoc = () => {
  getDoc(doc(FIRESTORE_DB, "artists", user.uid), {})
    .then((docData) => {
      // Success callback
      console.log("data ", docData.data());
      if (docData.exists()) {
        let data = docData.data();
        dispatch(setData(data));
        setUserData(data);
        setName(data.fullname);
        setImage({ uri: data.imageUrl });
      } else console.log("NO SUCH DATA");
    })
    .catch((error) => {
      // Error callback
      console.log("firestore error : ", error.message);
      alert("Your database is offline at the moment!");
      // alert(`Something went wrong while fetching the document:\n${error}`);
      console.log("error ", error);
    });
};

export { getProfileDoc };
