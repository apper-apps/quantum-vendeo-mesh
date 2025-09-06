import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { productService } from "@/services/api/productService"
import { toast } from "react-toastify"

const SellPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    images: [],
    location: {
      city: "San Francisco",
      state: "CA"
    }
  })
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Details, 2: Images, 3: Review

  const categories = [
    "Electronics", "Fashion", "Home", "Sports", "Books", "Automotive", "Beauty", "Toys"
  ]

  const conditions = [
    { value: "New", label: "New", description: "Brand new, never used" },
    { value: "Like New", label: "Like New", description: "Used once or twice, excellent condition" },
    { value: "Good", label: "Good", description: "Used with minor signs of wear" },
    { value: "Fair", label: "Fair", description: "Well used, noticeable wear" },
    { value: "Poor", label: "Poor", description: "Heavily used, significant wear" }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    if (files.length + formData.images.length > 8) {
      toast.error("Maximum 8 images allowed")
      return
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]
    URL.revokeObjectURL(newImages[index].preview)
    newImages.splice(index, 1)
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      // Validate form
      if (!formData.title || !formData.description || !formData.price || 
          !formData.category || !formData.condition) {
        toast.error("Please fill in all required fields")
        return
      }

      if (formData.images.length === 0) {
        toast.error("Please add at least one image")
        return
      }

      // Create product object
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        images: formData.images.map(img => img.preview), // In real app, would upload to server
        sellerId: "current-user", // Would come from auth
        sellerName: "Current User", // Would come from auth
        sellerRating: 4.8,
        sellerReviews: 25,
        isSponsored: false,
        createdAt: new Date().toISOString()
      }

      await productService.create(productData)
      
      toast.success("Product listed successfully!")
      navigate("/profile")
      
    } catch (error) {
      toast.error("Failed to create listing")
      console.error("Error creating listing:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Title */}
            <Input
              label="Product Title*"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="What are you selling?"
              className="text-lg"
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description*
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Describe your item in detail..."
              />
            </div>

            {/* Price */}
            <Input
              label="Price*"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="0.00"
              icon="DollarSign"
              iconPosition="left"
            />

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category*
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={formData.category === category ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange("category", category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition*
              </label>
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <div
                    key={condition.value}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                      formData.condition === condition.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleInputChange("condition", condition.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">
                          {condition.label}
                        </span>
                        <p className="text-sm text-gray-600">
                          {condition.description}
                        </p>
                      </div>
                      {formData.condition === condition.value && (
                        <ApperIcon name="Check" size={20} className="text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images* (Max 8)
              </label>
              
              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <ApperIcon name="Upload" size={32} className="text-gray-400 mb-2" />
                  <span className="text-lg font-medium text-gray-900 mb-1">
                    Upload Photos
                  </span>
                  <span className="text-sm text-gray-500">
                    Drag and drop or click to select images
                  </span>
                </label>
              </div>

              {/* Image Preview Grid */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ApperIcon name="X" size={12} />
                      </button>
                      {index === 0 && (
                        <Badge
                          variant="primary"
                          size="xs"
                          className="absolute bottom-1 left-1"
                        >
                          Main
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="text-sm text-gray-500 mt-2">
                • First image will be used as the main photo
                • Use high-quality images for better results
                • {formData.images.length}/8 images uploaded
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                Review Your Listing
              </h3>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-4">
                  {formData.images[0] && (
                    <img
                      src={formData.images[0].preview}
                      alt="Product preview"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {formData.title}
                    </h4>
                    <div className="text-xl font-bold text-primary mb-2">
                      ${parseFloat(formData.price || 0).toFixed(2)}
                    </div>
                    <div className="flex space-x-2 mb-2">
                      <Badge variant="secondary" size="sm">
                        {formData.category}
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        {formData.condition}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {formData.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Listing Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 font-medium">{formData.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Condition:</span>
                    <span className="ml-2 font-medium">{formData.condition}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <span className="ml-2 font-medium">
                      {formData.location.city}, {formData.location.state}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Images:</span>
                    <span className="ml-2 font-medium">{formData.images.length} photos</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Fees Breakdown */}
            <Card>
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                Fees & Earnings
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listing Price:</span>
                  <span className="font-medium">${parseFloat(formData.price || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vendeo Fee (0%):</span>
                  <span className="font-medium text-success">$0.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Your Earnings:</span>
                  <span className="text-primary">${parseFloat(formData.price || 0).toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
            Sell Your Item
          </h1>
          <p className="text-gray-600">
            Create a listing to start selling in your local community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            {[
              { step: 1, label: "Details" },
              { step: 2, label: "Photos" },
              { step: 3, label: "Review" }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= item.step
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > item.step ? (
                    <ApperIcon name="Check" size={16} />
                  ) : (
                    item.step
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= item.step ? "text-gray-900" : "text-gray-500"
                }`}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > item.step ? "bg-primary" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-6">
          {renderStepContent()}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1)
              } else {
                navigate(-1)
              }
            }}
          >
            <ApperIcon name="ChevronLeft" size={16} />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                (currentStep === 1 && (!formData.title || !formData.description || !formData.price || !formData.category || !formData.condition)) ||
                (currentStep === 2 && formData.images.length === 0)
              }
            >
              Continue
              <ApperIcon name="ChevronRight" size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              {loading ? "Creating..." : "Publish Listing"}
              <ApperIcon name="Check" size={16} />
            </Button>
          )}
        </div>

        {/* Subscription Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ApperIcon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">
                Pro Seller Benefits
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                Upgrade to Pro Seller for just $1/month to unlock unlimited listings, 
                priority support, and enhanced visibility.
              </p>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellPage