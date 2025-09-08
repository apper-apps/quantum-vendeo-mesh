import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "@/services/api/productService";
import { userService } from "@/services/api/userService";
import { formatDistance } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import ReferralCard from "@/components/molecules/ReferralCard";
import ProductCard from "@/components/molecules/ProductCard";
import SellerProfileCard from "@/components/molecules/SellerProfileCard";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { useTranslation } from "@/i18n/translations";

const ProductDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const loadProductData = async () => {
    try {
setLoading(true);
      setError("");
      
      // Load product details
      const productData = await productService.getById(parseInt(id));
      if (!productData) {
        throw new Error("Product not found");
      }
      setProduct(productData);

// Load seller info
      const sellerData = await userService.getById(productData.sellerId);
      setSeller(sellerData);

      // Load related products
      const allProducts = await productService.getAll();
      const related = allProducts
        .filter(p => p.Id !== productData.Id && p.category === productData.category)
        .slice(0, 4);
      setRelatedProducts(related);

} catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    loadProductData();
  }, [id]);

const handleImageChange = (direction) => {
    if (!product?.images) return;
    
    if (direction === "next") {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

const handleContactSeller = () => {
    navigate(`/chat/new?productId=${id}&sellerId=${product.sellerId}`);
  };

  const handleMakeOffer = () => {
    // In a real app, this would open an offer modal
    toast.info("Offer functionality coming soon!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    toast.success(isWatchlisted ? "Removed from watchlist" : "Added to watchlist");
  };

if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProductData} />;
  }

if (!product) {
    return <Error message="Product not found" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <Card className="mb-6 overflow-hidden" padding="none">
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageChange("prev")}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <ApperIcon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={() => handleImageChange("next")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <ApperIcon name="ChevronRight" size={20} />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isSponsored && (
                    <Badge variant="sponsored" size="sm">
                      Sponsored
                    </Badge>
                  )}
                  <Badge variant="primary" size="sm">
                    {product.condition}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button
                    onClick={handleLike}
                    className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all duration-200 hover:scale-110"
                  >
                    <ApperIcon 
                      name="Heart" 
                      size={20}
                      className={isLiked ? "fill-red-500 text-red-500" : ""}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all duration-200 hover:scale-110"
                  >
                    <ApperIcon name="Share2" size={20} />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex 
                            ? "border-primary" 
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Product Info */}
            <Card className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl font-bold text-primary">
                      ${product.price.toLocaleString()}
                    </div>
                    <Badge variant="secondary" size="md">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
<h3 className="font-medium text-gray-900 mb-2">{t("description")}</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="border-t pt-4">
<h3 className="font-medium text-gray-900 mb-3">{t("details")}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
<span className="text-gray-500">{t("condition")}</span>
                    <div className="font-medium text-gray-900">{product.condition}</div>
                  </div>
                  <div>
<span className="text-gray-500">{t("category")}</span>
                    <div className="font-medium text-gray-900">{product.category}</div>
                  </div>
                  <div>
<span className="text-gray-500">{t("listed")}</span>
                    <div className="font-medium text-gray-900">
                      {formatDistance(new Date(product.createdAt), new Date(), { addSuffix: true })}
                    </div>
                  </div>
                  <div>
<span className="text-gray-500">{t("location2")}</span>
                    <div className="font-medium text-gray-900">
                      {product.location.city}, {product.location.state}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Item ID:</span>
                    <div className="font-medium text-gray-900">#{product.Id}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6 mt-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    onClick={handleContactSeller}
                    className="flex-1"
                    icon="MessageCircle"
>
                    {t("messageSeller")}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleMakeOffer}
                    className="flex-1"
                    icon="DollarSign"
                  >
                    Make Offer
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWatchlist}
                    className="sm:w-auto px-4"
                  >
                    <ApperIcon 
                      name={isWatchlisted ? "BookmarkCheck" : "Bookmark"} 
                      size={20}
                      className={isWatchlisted ? "fill-current" : ""}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            {seller && (
              <SellerProfileCard seller={seller} />
            )}

            {/* Safety Tips */}
            <Card>
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
{t("safetyTips")}
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
<ApperIcon name="MapPin" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{t("meetInPublic")}</span>
                </div>
                <div className="flex items-start space-x-2">
<ApperIcon name="Users" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{t("bringFriend")}</span>
                </div>
                <div className="flex items-start space-x-2">
<ApperIcon name="Eye" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{t("inspectItem")}</span>
                </div>
                <div className="flex items-start space-x-2">
<ApperIcon name="AlertTriangle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{t("trustInstincts")}</span>
                </div>
              </div>
            </Card>

            {/* Report */}
            <Card>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
<ApperIcon name="Flag" size={16} />
                {t("reportListing")}
              </Button>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
<h2 className="font-display font-semibold text-xl text-gray-900">
                {t("similarItems")}
              </h2>
              <Button
                variant="ghost"
                onClick={() => navigate(`/search?category=${product.category}`)}
              >
{t("viewAll")}
                <ApperIcon name="ChevronRight" size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.Id} product={relatedProduct} />
              ))}
            </div>
</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;