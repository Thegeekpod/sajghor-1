"use client"
import Link from 'next/link'
import { useState, useEffect } from "react";
import axios from "axios";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState({ thirtyOff: [], fiftyOff: [] });

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/frontend/product-category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getoffer = async () => {
    try {
      const response = await axios.get('/api/frontend/product/offer');
      const products = response.data;
      const thirtyOff = products.filter(product => product.offer === '30_off');
      const fiftyOff = products.filter(product => product.offer === '50_off');
      setOffers({ thirtyOff, fiftyOff });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    getoffer();
  }, []);
  return (
    <ul className="navbar-nav ml-auto mr-auto">
    <li className="nav-item m-menu">
      <Link
        href="/"
        className="nav-link font-weight-bold text-uppercase mu-item"
      >
        Home
      </Link>
    </li>
    <li className="nav-item m-menu dropdown megamenu">
      <a
        id="megamneu"
        href=""
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        className="nav-link dropdown-toggle font-weight-bold text-uppercase mu-item"
      >
        Collections
      </a>
      <div
        aria-labelledby="megamneu"
        className="dropdown-menu border-0 p-0 m-0"
      >
        <div className="container">
          <div className="row bg-white rounded-0 m-0 shadow-sm">
            <div
              className="col-lg-3 col-xl-3 px-0 d-none d-lg-block menu-bg"
              style={{
                background:
                  "center center url(/images/menu-img1.jpg)no-repeat",
                backgroundSize: "cover"
              }}
            />
            <div className="col-lg-8 col-xl-8">
              <div className="pl-4">
                <div className="row">
               
  <div className="row">
    {categories.map((category, index) => (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" key={index}>
        <Link href={`/${category.slug}`} className="nav-link text-small p-1">
          {category.category_name}
        </Link>
      </div>
    ))}
  </div>


                
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className="nav-item m-menu desk-logo">
      <a href="index.html" className="nav-link">
        <img
          src="/images/logo.png"
          className="img-fluid desktop-logo"
        />
      </a>
    </li>
    <li className="nav-item m-menu dropdown megamenu">
      <a
        id="megamneu"
        href=""
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        className="nav-link dropdown-toggle font-weight-bold text-uppercase mu-item"
      >
        Offer Zone
      </a>
      <div
      aria-labelledby="megamneu"
      className="dropdown-menu border-0 p-0 m-0"
    >
      <div className="container">
        <div className="row bg-white rounded-0 m-0 shadow-sm">
          <div
            className="col-lg-3 col-xl-3 px-0 d-none d-lg-block menu-bg"
            style={{
              background:
                "center center url(/images/menu-img2.jpg) no-repeat",
              backgroundSize: "cover"
            }}
          />
          <div className="col-lg-8 col-xl-8">
            <div className="pl-4">
              <div className="row">
                <div className="col-lg-6 my-4">
                  <h6 className="font-weight-bold text-uppercase menu-head">
                    Flat 30% Off
                  </h6>
                  <ul className="list-unstyled">
                    {offers.thirtyOff.map(product => (
                      <li key={product.id} className="nav-item">
                        <Link href={`/${product.category.slug}/${product.slug}`} className="nav-link text-small pb-0">
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6 my-4">
                  <h6 className="font-weight-bold text-uppercase menu-head">
                    Get Upto 50% Off
                  </h6>
                  <ul className="list-unstyled">
                    {offers.fiftyOff.map(product => (
                      <li key={product.id} className="nav-item">
                        <Link href={`/${product.category.slug}/${product.slug}`} className="nav-link text-small pb-0">
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </li>
    <li className="nav-item m-menu">
      <Link
        href="/new-collection"
        className="nav-link font-weight-bold text-uppercase mu-item"
      >
        <sup className="blink_me">New</sup>New Collection
      </Link>
    </li>
  </ul>
  )
}

export default Menu