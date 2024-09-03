// components/Sidebar.js
import Link from 'next/link';

export default function Sidebar() {
  return (
<div className="sidebar">
  <div className="scrollbar-inner sidebar-wrapper">
    <div className="user">
      <div className="photo">
        <img src="/assets/img/profile.jpg" />
      </div>
      <div className="info">
        <a
          className=""
          data-toggle="collapse"
          href="#collapseExample"
          aria-expanded="true"
        >
          <span>
            Hizrian
            <span className="user-level">Administrator</span>
            <span className="caret" />
          </span>
        </a>
        <div className="clearfix" />
        <div
          className="collapse in"
          id="collapseExample"
          aria-expanded="true"
          style={{}}
        >
          <ul className="nav">
            <li>
              <a href="#profile">
                <span className="link-collapse">My Profile</span>
              </a>
            </li>
            <li>
              <a href="#edit">
                <span className="link-collapse">Edit Profile</span>
              </a>
            </li>
            <li>
              <a href="#settings">
                <span className="link-collapse">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul className="nav">
      <li className="nav-item active">
        <a href="index.html">
          <i className="la la-dashboard" />
          <p>Dashboard</p>
          <span className="badge badge-count">5</span>
        </a>
      </li>
      <li className="nav-item">
        <Link href="/admin/dashboard/product">
          <i className="la la-table" />
          <p>Product</p>
          {/* <span className="badge badge-count">14</span> */}
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/admin/dashboard/category">
          <i className="la la-th" />
          <p>Categories</p>
          {/* <span className="badge badge-count">6</span> */}
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/admin/dashboard/newcollection">
          <i className="la la-th" />
          <p>New Collection</p>
          {/* <span className="badge badge-count">6</span> */}
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/admin/dashboard/product-enquiry">
          <i className="la la-th" />
          <p>Product Enquiry</p>
          {/* <span className="badge badge-count">6</span> */}
        </Link>
      </li>
    </ul>
  </div>
</div>

  );
}
