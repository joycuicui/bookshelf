import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { useAddBook } from "../query/useAddBook";
import { app } from "../firebase";

const AddBook = ({ onCloseModal }) => {
  const { isCreating, addBook } = useAddBook();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

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
          setFormData({ ...formData, bookCover: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddNewBook = async (e) => {
    e.preventDefault();
    await addBook(formData);
    onCloseModal();
  };

  return (
    <form
      onSubmit={handleAddNewBook}
      className="overflow-hidden w-[650px] flex flex-col p-6 gap-4 text-sm"
    >
      <div className="text-gray-800 grid grid-cols-4 items-center px-3 py-4 border-b border-gray-100">
        <label>Book Title *</label>
        <input
          onChange={handleFormData}
          type="text"
          id="title"
          required
          className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-2"
        />
      </div>
      <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
        <label>Author *</label>
        <input
          onChange={handleFormData}
          type="text"
          id="author"
          required
          className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-2"
        />
      </div>
      <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
        <label>Total Pages *</label>
        <input
          onChange={handleFormData}
          type="text"
          id="totalPages"
          required
          className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-2"
        />
      </div>
      <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
        <label>Description</label>
        <textarea
          onChange={handleFormData}
          type="text"
          id="description"
          className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-2"
        />
      </div>
      <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
        <label>Publisher</label>
        <input
          onChange={handleFormData}
          type="text"
          id="publisher"
          className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-2"
        />
      </div>
      <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
        <label>Published Year</label>
        <input
          onChange={handleFormData}
          type="text"
          id="publishedYear"
          className="px-2 border border-gray-300 rounded-md p-1 shadow-sm col-span-2"
        />
      </div>
      <div className="text-gray-800 grid grid-cols-4 items-center px-3 pb-4 border-b border-gray-100">
        <label>Book Cover</label>
        <input
          onChange={handleImageChange}
          type="file"
          accept="image/*"
          id="bookCover"
          className="col-span-2 block border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:bg-gray-100 file:px-3 file:py-1 file:mr-3 file:text-gray-700 file:[border-inline-end-width:1px]"
        />
      </div>
      <div className="flex justify-between">
        <button className="text-sm underline text-emerald-600">
          <Link to="search">Search online</Link>
        </button>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCloseModal}
            type="reset"
            className="text-sm px-4 py-1 text-gray-600 bg-white border rounded-lg shadow-sm border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm px-4 py-1 text-gray-600 bg-emerald-300 border rounded-lg shadow-sm border-gray-200 hover:bg-emerald-400"
          >
            Add New Book
          </button>
        </div>
      </div>
    </form>
  );
};
export default AddBook;
