import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

const MyProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  // const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  // const [updateUserError, setUpdateUserError] = useState(null);

  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  // upload image to firebase storage
  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        toast.error("Could not upload image. Please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          toast.success("Image uploaded successfully!");
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setUpdateUserError(null);
    // setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      toast.error("Please update your profile first!");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(updateSuccess(data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      dispatch(updateFailure(err.message));
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-gray-600 font-semibold text-xl">My Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto mt-1 pb-2 overflow-hidden w-[650px] flex flex-col p-6 gap-4 text-sm"
        >
          <div
            onClick={() => fileRef.current.click()}
            className="w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          >
            <img
              src={imageFileUrl || currentUser.avatar}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover border-8 border-emerald-50"
            />
          </div>

          <div className="text-gray-800 grid grid-cols-4 items-center px-3 py-4 border-b border-gray-100">
            <label className="font-semibold text-gray-600">Avatar</label>
            <input
              onChange={handleImageChange}
              ref={fileRef}
              type="file"
              accept="image/*"
              id="avatar"
              className="col-span-3 block border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:bg-gray-200 file:px-3 file:py-1 file:mr-3 file:text-gray-700 file:[border-inline-end-width:1px]"
            />
          </div>
          <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
            <label className="font-semibold text-gray-600">Email</label>
            <input
              type="email"
              disabled
              value={currentUser.email}
              className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-3 cursor-not-allowed bg-gray-200"
            />
          </div>
          <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
            <label className="font-semibold text-gray-600">Name</label>
            <input
              onChange={handleFormData}
              id="name"
              type="text"
              defaultValue={currentUser.name}
              className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-3"
            />
          </div>
          <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
            <label className="font-semibold text-gray-600">Password</label>
            <input
              onChange={handleFormData}
              id="password"
              type="password"
              placeholder="Enter new password..."
              className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-3"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm underline text-red-600">Delete Account</div>
            <button
              type="submit"
              className="text-sm px-4 py-1 text-gray-600 bg-emerald-300 border rounded-lg shadow-sm border-gray-200 hover:bg-emerald-400"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
