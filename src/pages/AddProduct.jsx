import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { productServices } from "../api";

const AddProduct = () => {
  let [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    mainImg: "",
    images: [],
    varients: [],
  });
  const [variants, setVariants] = useState([
    {
      name: "",
      options: [
        { additionalPrice: 0 }, // e.g. { colorname: 'Red', additionalPrice: 0 }
      ],
    },
  ]);
  const handleVariantNameChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index].name = value;
    setVariants(newVariants);
  };

  const handleOptionChange = (variantIndex, optionIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options[optionIndex][field] =
      field === "additionalPrice" ? +value : value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", options: [{ additionalPrice: 0 }] }]);
  };

  const addOption = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.push({ additionalPrice: 0 });
    setVariants(newVariants);
  };
  const navigate = useNavigate();
  const categoriesData = useSelector((state) => state.categorySlice.categories);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // const imageUrls = files.map((file) => file);
    console.log(files);
    
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // console.log(variants);
    formData.varients = variants;

    // console.log(formData);

    const res = await productServices.createProduct(formData)
    console.log(res);
    
    // Simulate API call
    toast.success("Product added successfully!");
    // navigate("/products");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/products")}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="text-gray-600">Create a new product for your store</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter product title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field"
                    placeholder="Enter product description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select category</option>
                      {categoriesData.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Product Images
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {formData.mainImg ? (
                      <img src={URL.createObjectURL(formData.mainImg)} />
                    ) : (
                      <>
                        <label htmlFor="mainimge">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload main image
                          </p>
                        </label>
                        <input
                          id="mainimge"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          name="mainImg"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFormData((prev) => ({
                                ...prev,
                                mainImg: file,
                              }));
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <label htmlFor="subimg">

                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload additional images
                    </p>
                    </label>
                    <input
                    id="subimg"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      name="images"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Product ${index + 1}`}
                            className="w-full h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Product Variants
            </h3>
            {/* <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    onChange={(e) => setVariableOption(e.target.value)}
                    className="input-field"
                    name=""
                    id=""
                  >
                    <option hidden>Select Type</option>
                    <option value="color">Color</option>
                    <option value="size">Size</option>
                  </select>
                </div>
                {variableOption === "color" ? (
                  <div className="">
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type code and press Enter or ,"
                      className="input-field mt-6 w-full"
                    />
                    <div className="flex flex-wrap gap-2">
                      {colorname.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-slate-300 w-fit p-1 rounded-2xl flex gap-2"
                        >
                          <p>{tag}</p>
                          <p onClick={() => removeTag(index)}>&times;</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size
                        </label>

                        <select
                          onChange={(e) =>
                            setSizeData((pre) => ({
                              ...pre,
                              size: e.target.value,
                            }))
                          }
                          className="input-field"
                          name=""
                          id=""
                        >
                          <option hidden>Select Size</option>
                          <option value="s">S</option>
                          <option value="m">M</option>
                          <option value="l">L</option>
                          <option value="xl">XL</option>
                          <option value="xxl">XXL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Price
                        </label>
                        <input
                          type="number"
                          onChange={(e) =>
                            setSizeData((prev) => ({
                              ...prev,
                              additionalPrice: e.target.value,
                            }))
                          }
                          className="input-field"
                          placeholder="e.g., 100"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handelAddSizeData}
                      type="button"
                      className="btn-secondary inline-flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Variant
                    </button>
                    {sizeOptions.length > 0 &&
                      sizeOptions.map((item) => (
                        <div
                          className="flex items-center gap-3"
                          key={item.size}
                        >
                          <div className="bg-slate-200 flex items-center gap-2">
                            <p>Size</p> <p>{item.size}</p>
                          </div>
                          <div className="bg-slate-200 flex items-center gap-2">
                            <p>Additional Price</p>{" "}
                            <p>{item.additionalPrice}</p>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div> */}
            <hr />

            {/* =================================================== */}
            {variants.map((variant, vIndex) => (
              <div key={vIndex} className="shadow p-2">
                <h3>Variant #{vIndex + 1}</h3>
                <select
                  type="text"
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantNameChange(vIndex, e.target.value)
                  }
                  className="input-field"
                  required
                >
                  <option hidden>Variant type</option>
                  <option value="color">Color</option>
                  <option value="size">Size</option>
                </select>

                {variant.options.map((option, oIndex) => (
                  <div key={oIndex} style={{ marginTop: "10px" }}>
                    <input
                      className="input-field"
                      type="text"
                      placeholder={`Option name (e.g., ${
                        variant.name === "color" ? "Red" : "S"
                      })`}
                      value={option[variant.name] || ""}
                      onChange={(e) =>
                        handleOptionChange(
                          vIndex,
                          oIndex,
                          variant.name,
                          e.target.value
                        )
                      }
                      required
                    />
                    {variant.name === "size" && (
                      <input
                        className="input-field"
                        type="number"
                        placeholder="Additional Price"
                        value={option.additionalPrice}
                        onChange={(e) =>
                          handleOptionChange(
                            vIndex,
                            oIndex,
                            "additionalPrice",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addOption(vIndex)}
                  style={{ marginTop: "10px" }}
                  className="bg-slate-200 rounded-2xl px-2"
                >
                  + Add Option
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="bg-slate-600 text-white mt-4 rounded-2xl px-2"
            >
              + Add Variant
            </button>
            <br />
            <br />
            {/* =================================================== */}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary inline-flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
