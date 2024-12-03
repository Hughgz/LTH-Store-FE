import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../assets/icons/icons';
import { useParams } from 'react-router-dom';
import { useCart } from "../utils/hooks/useCart";
import { useProduct } from '../utils/hooks/useProduct';
import { useWishlist } from '../utils/hooks/useWishlist';
import { formatPrice } from '../utils/hooks/useUtil';
import { selectCurrentUser } from '../store/reducers/userSlice';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';  // Import react-helmet

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products, fetchProducts } = useProduct();
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);

  const currentUser = useSelector(selectCurrentUser);

  // Find product based on productID from URL
  const product = products.find((product) => product?.productID === Number(id));
  const itemExists = wishlistItems.find((item) => item?.productID === product?.productID);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (product && !selectedSize) {
      setSelectedSize(product.productSizes[0]);
    }
  }, [product]);

  // Facebook share URL generator
  const generateFacebookShareUrl = () => {
    const productUrl = window.location.href; // Assuming this URL includes product details
    const productTitle = `${product.brand} ${product.name}`;
    const productDescription = product.description;
    const productImage = product.imageURL;

    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(`${productTitle} - ${productDescription}`)}&picture=${encodeURIComponent(productImage)}`;
  };

  const handleShareToFacebook = () => {
    const shareUrl = generateFacebookShareUrl();
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <>
      {product && (
        <>
          <Helmet>
            <meta property="og:type" content="product" />
            <meta property="og:title" content={`${product.brand} ${product.name}`} />
            <meta property="og:description" content={product.description} />
            <meta property="og:image" content={product.imageURL} />
            <meta property="og:url" content={window.location.href} />
          </Helmet>

          <div className='flex container'>
            <div className='product-detail-img flex-2'>
              <img src={product.imageURL} alt="" />
            </div>
            <div className='product-detail-about flex-1'>
              <h2>{product.brand}</h2>
              <h1>{product.brand} {product.name}</h1>
              <p>
                {selectedSize ? `${formatPrice(selectedSize?.price)}` : '...'}
              </p>
              <div>
                <label htmlFor="size-select">Available sizes</label>
                <select
                  id="size-select"
                  value={selectedSize ? JSON.stringify(selectedSize) : JSON.stringify(product.productSizes[0])}
                  onChange={(e) => setSelectedSize(JSON.parse(e.target.value))}
                >
                  {[...product?.productSizes]
                    ?.sort((a, b) => a.size - b.size)
                    .map((size, index) => (
                      <option key={index} value={JSON.stringify(size)}>
                        EU {size?.size} - {formatPrice(size?.price)}{" "}
                        {size.quantity <= 3 ? `(only ${size.quantity} left)` : ""}
                      </option>
                    ))}
                </select>
              </div>
              <div className='divider'>
                <button
                  onClick={() =>
                    addToCart({
                      product: product,
                      productPrice: selectedSize.price,
                      productSizeID: selectedSize.productSizeID,
                      productSize: selectedSize.size,
                      quantity: 1,
                    })
                  }
                >
                  ADD TO BASKET
                </button>
                <button
                  className='second-button'
                  onClick={() => toggleWishlistItem(product)}
                >
                  <span>WISHLIST</span>
                  <FontAwesomeIcon icon={itemExists ? icons.heartFull : icons.heart} />
                </button>
                {/* New Facebook Share Button */}
                <button
                  className='share-facebook-button'
                  onClick={handleShareToFacebook}
                >
                  Share on Facebook
                </button>
              </div>
              <p>{product.description}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetail;
