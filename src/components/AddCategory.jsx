import React, { useState } from "react";
import { categorySercice } from "../api";
import toast from "react-hot-toast";

const AddCategory = ({stateChane}) => {
    const [categoryData, setCategoryData] = useState({
        name:"",
        category:""
    })
    const handelCreate = async (e)=>{
        e.preventDefault()
        try {
            const res = await categorySercice.createCategory(categoryData)
            toast.success(res.message)
            stateChane(false)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="absolute top-0 left-0 z-50 h-full w-full bg-black/25 flex items-center justify-center">
      <form onSubmit={handelCreate} className="bg-white w-xl p-10 rounded-2xl space-y-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            onChange={(e)=>setCategoryData((prev)=> ({...prev, name: e.target.value}))}
            type="text"
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image
          </label>
          <input
           onChange={(e)=>setCategoryData((prev)=> ({...prev, category: e.target.files[0]}))}
            type="file"
            className="input-field"
            name="category"
            required
          />
        </div>
        <button type="submit" className="btn-primary inline-flex items-center">Caeate</button>
      </form>
    </div>
  );
};

export default AddCategory;
