import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import InstantSearch from './Search'

const Header = () => {
  return (
    <>   
    <header id="main-header">
    <div id="top-header">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-12">
            <p>
              <i className="fa fa-truck" aria-hidden="true" /> Free shipping
              within India | Free international shipping on orders over Rs.
              25,000 | Checkout in your home currency.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="mobile-logo">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-12" style={{ display: "none" }}>
            <img src="/images/logo.png" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
    <div id="mid-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="left-hd">
              <ul className="header-social-list">
                <li>
                  <a href="">
                    <i className="fa fa-twitter social" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa fa-instagram social" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa fa-facebook social" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right-hd">
              <ul className="cart-list">
                <li>
                  {/* <form id="pro-search" action="#">
                    <input type="search" placeholder="Seach..." />
                  </form> */}
                  <InstantSearch/>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="snd-head">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 header-menu">
            <nav className="navbar navbar-expand-lg navbar-light py-1">
              {" "}
              <a
                href="#"
                className="navbar-brand font-weight-bold d-block d-lg-none"
              />{" "}
              <button
                type="button"
                data-toggle="collapse"
                data-target="#navbarContent"
                aria-controls="navbars"
                aria-expanded="false"
                aria-label="Toggle navigation"
                className="navbar-toggler"
              >
                {" "}
                <span className="navbar-toggler-icon" />{" "}
              </button>
              <div id="navbarContent" className="collapse navbar-collapse">
              <Menu/>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
  
  </>
  )
}

export default Header