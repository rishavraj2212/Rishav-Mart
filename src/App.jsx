import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 0) {
          clearInterval(timer);
          return 0;
        }

        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const products = [
    {
      name: "Smart Watch",
      price: 1999,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      name: "Wireless Headphones",
      price: 2499,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      name: "Gaming Mouse",
      price: 999,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },
    {
      name: "Men T-Shirt",
      price: 699,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      name: "Running Shoes",
      price: 1599,
      category: "Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      name: "Beauty Products",
      price: 899,
      category: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    },
    {
      name: "Coffee Maker",
      price: 2999,
      category: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
    {
      name: "Programming Book",
      price: 799,
      category: "Books",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    },
    {
      name: "Football",
      price: 599,
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    },
    {
      name: "Smartphone",
      price: 14999,
      category: "Mobiles",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const addToWishlist = (product) => {
    const alreadyAdded = wishlist.some(
      (item) => item.name === product.name
    );

    if (!alreadyAdded) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (index) => {
    setWishlist(wishlist.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price;
  }, 0);

  const discountAmount = Math.round(
    (totalPrice * discount) / 100
  );

  const finalPrice = totalPrice - discountAmount;

  const generateCoupon = () => {
    const discounts = [10, 15, 20, 25, 30];

    const randomDiscount =
      discounts[Math.floor(Math.random() * discounts.length)];

    setDiscount(randomDiscount);
    setCoupon("RISHAV" + randomDiscount);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setCheckout(true);
  };

  const placeOrder = () => {
    const pointsEarned = Math.floor(finalPrice / 100) * 10;

    setRewardPoints(rewardPoints + pointsEarned);

    setOrderPlaced(true);
    setCart([]);
    setCheckout(false);
    setCoupon("");
    setDiscount(0);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>

      {/* ================= NAVBAR ================= */}

      <nav>
        <div className="brand">
          <img
            src="/rishav-logo.png"
            alt="Rishav Mart Logo"
            className="logo"
          />

          <h2>Rishav Mart</h2>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>

          <a href="#products">
            Products
          </a>

          <a href="#cart">
            Cart ({cart.length})
          </a>

          <a href="#wishlist">
            Wishlist ❤️ ({wishlist.length})
          </a>

          <a href="#rewards">
            Rewards 🎁 ({rewardPoints})
          </a>

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </nav>


      {/* ================= HERO ================= */}

      <section className="hero" id="home">

        {/* LEFT PRODUCTS */}

        <div className="hero-product left-phone">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            alt="Latest Mobile"
          />

          <div className="product-label">
            📱 Latest Mobiles
          </div>
        </div>


        <div className="hero-product left-headphone">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Premium Accessories"
          />

          <div className="product-label">
            🎧 Premium Accessories
          </div>
        </div>


        {/* CENTER HERO */}

        <div className="hero-center">

          <img
            src="/rishav-logo.png"
            alt="Rishav Mart"
            className="hero-logo"
          />

          <h1>
            Find It. <span>Love It.</span> Buy It. ❤️
          </h1>

          <p>
            Shop • Save • Earn Rewards 🚀
          </p>

          <a href="#products">
            <button className="hero-button">
              Explore Rishav Mart 🛍️
              <span>→</span>
            </button>
          </a>

        </div>


        {/* RIGHT PRODUCTS */}

        <div className="hero-product right-watch">

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Smart Devices"
          />

          <div className="product-label">
            ⌚ Smart Devices
          </div>

        </div>


        <div className="hero-product right-shoes">

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Trendy Fashion"
          />

          <div className="product-label">
            👕 Trendy Fashion
          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="feature">

          <div className="feature-icon">
            🚚
          </div>

          <div>
            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your orders quickly
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            🛡️
          </div>

          <div>
            <h3>
              Secure Payments
            </h3>

            <p>
              100% safe & trusted
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            🏷️
          </div>

          <div>
            <h3>
              Best Deals
            </h3>

            <p>
              Save more every day
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            🎧
          </div>

          <div>
            <h3>
              24/7 Support
            </h3>

            <p>
              We're here for you
            </p>
          </div>

        </div>

      </section>


      {/* ================= DEAL OF THE DAY ================= */}

      <section className="deal-section">

        <div className="deal-box">

          <p className="deal-label">
            ⚡ DEAL OF THE DAY
          </p>

          <h2>
            Smart Watch
          </h2>

          <p className="deal-description">
            Special limited-time offer!
          </p>

          <div className="deal-price">

            <span className="old-price">
              ₹1999
            </span>

            <span className="new-price">
              ₹1499
            </span>

          </div>

          <p className="deal-time">
            ⏰ Offer ends in
          </p>

          <div className="countdown">

            <div>
              <strong>
                {String(hours).padStart(2, "0")}
              </strong>

              <span>
                Hours
              </span>
            </div>

            <div>
              <strong>
                {String(minutes).padStart(2, "0")}
              </strong>

              <span>
                Minutes
              </span>
            </div>

            <div>
              <strong>
                {String(seconds).padStart(2, "0")}
              </strong>

              <span>
                Seconds
              </span>
            </div>

          </div>

          <button
            className="deal-button"
            onClick={() =>
              addToCart({
                name: "Smart Watch - Deal",
                price: 1499,
                category: "Electronics",
                image:
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
              })
            }
          >
            Grab Deal 🛒
          </button>

        </div>

      </section>


      {/* ================= COUPON ================= */}

      <section className="coupon-section">

        <div className="coupon-box">

          <h2>
            🎁 Surprise Coupon
          </h2>

          <p>
            Get a random discount for your next order!
          </p>

          <button
            className="coupon-button"
            onClick={generateCoupon}
          >
            Get My Coupon 🎉
          </button>

          {coupon && (

            <div className="coupon-result">

              <h3>
                🎊 Congratulations!
              </h3>

              <p>
                You got{" "}
                <strong>
                  {discount}% OFF
                </strong>
              </p>

              <div className="coupon-code">
                {coupon}
              </div>

              <small>
                Coupon automatically applied to your cart.
              </small>

            </div>

          )}

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section
        className="products"
        id="products"
      >

        <h2>
          Our Products
        </h2>

        <div className="product-controls">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Accessories">
              Accessories
            </option>

            <option value="Gaming">
              Gaming
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Shoes">
              Shoes
            </option>

            <option value="Beauty">
              Beauty
            </option>

            <option value="Home & Kitchen">
              Home & Kitchen
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Mobiles">
              Mobiles
            </option>

          </select>

        </div>


        <div className="product-list">

          {filteredProducts.length > 0 ? (

            filteredProducts.map(
              (product, index) => (

                <div
                  className="product-card"
                  key={index}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <h3>
                    {product.name}
                  </h3>

                  <small>
                    {product.category}
                  </small>

                  <p>
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                  <button
                    className="wishlist-btn"
                    onClick={() =>
                      addToWishlist(product)
                    }
                  >
                    ❤️ Wishlist
                  </button>

                </div>

              )
            )

          ) : (

            <p>
              No products found.
            </p>

          )}

        </div>

      </section>


      {/* ================= CART ================= */}

      <section
        className="cart"
        id="cart"
      >

        <h2>
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (

          <p>
            Your cart is empty.
          </p>

        ) : (

          <div>

            {cart.map(
              (product, index) => (

                <div
                  className="cart-item"
                  key={index}
                >

                  <p>
                    {product.name} - ₹
                    {product.price}
                  </p>

                  <button
                    onClick={() =>
                      removeFromCart(index)
                    }
                  >
                    Remove
                  </button>

                </div>

              )
            )}

            <div className="price-box">

              <p>
                Subtotal: ₹{totalPrice}
              </p>

              {discount > 0 && (

                <p className="discount-text">
                  Discount ({discount}%): -₹
                  {discountAmount}
                </p>

              )}

              <h3>
                Final Price: ₹{finalPrice}
              </h3>

            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>

          </div>

        )}

      </section>


      {/* ================= WISHLIST ================= */}

      <section
        className="cart"
        id="wishlist"
      >

        <h2>
          ❤️ Your Wishlist
        </h2>

        {wishlist.length === 0 ? (

          <p>
            Your wishlist is empty.
          </p>

        ) : (

          <div>

            {wishlist.map(
              (product, index) => (

                <div
                  className="cart-item"
                  key={index}
                >

                  <p>
                    {product.name} - ₹
                    {product.price}
                  </p>

                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      removeFromWishlist(index)
                    }
                  >
                    Remove
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* ================= RISHAV REWARDS ================= */}

      <section
        className="rewards-section"
        id="rewards"
      >

        <div className="rewards-box">

          <h2>
            🎁 Rishav Rewards
          </h2>

          <p>
            Shop more, earn more!
          </p>

          <div className="points">
            {rewardPoints}
          </div>

          <p>
            Rishav Points
          </p>

          <small>
            Earn 10 points for every ₹100 you spend.
          </small>

        </div>

      </section>


      {/* ================= CHECKOUT ================= */}

      {checkout && (

        <section className="order-summary">

          <h2>
            📦 Order Summary
          </h2>

          <p>
            Total Items: {cart.length}
          </p>

          <p>
            Subtotal: ₹{totalPrice}
          </p>

          {discount > 0 && (

            <p className="discount-text">
              Coupon Discount: -₹
              {discountAmount}
            </p>

          )}

          <h3>
            Payable Amount: ₹{finalPrice}
          </h3>

          <button
            onClick={placeOrder}
          >
            Place Order
          </button>

        </section>

      )}


      {/* ================= ORDER SUCCESS ================= */}

      {orderPlaced && (

        <section className="order-success">

          <h2>
            🎉 Order Placed Successfully!
          </h2>

          <p>
            Thank you for shopping with Rishav Mart.
          </p>

        </section>

      )}


      {/* ================= LOGIN ================= */}

      {showLogin && (

        <div className="login-section">

          <div className="login-box">

            <button
              className="close-btn"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ×
            </button>

            <h2>
              Login
            </h2>

            <input
              type="email"
              placeholder="Enter Email"
            />

            <input
              type="password"
              placeholder="Enter Password"
            />

            <button className="login-submit">
              Login
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;