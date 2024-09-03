// components/Header.js
"use client"
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const { data: session, status } = useSession();
    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //       router.push("/admin/login");
    //     }
    //   }, [status]);
    
      // if (status === "loading") {
      //   return <p>Loading...</p>;
      // }
    
      // if (!session) {
      //   return null;
      // }
  return (

    <> 
    <div className="main-header">
    <div className="logo-header">
      <a href="index.html" className="logo">
        Ready Dashboard
      </a>
      <button
        className="navbar-toggler sidenav-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="collapse"
        aria-controls="sidebar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <button className="topbar-toggler more">
        <i className="la la-ellipsis-v" />
      </button>
    </div>
    <nav className="navbar navbar-header navbar-expand-lg">
      <div className="container-fluid">
        <form className="navbar-left navbar-form nav-search mr-md-3" action="">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search ..."
              className="form-control"
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="la la-search search-icon" />
              </span>
            </div>
          </div>
        </form>
        <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
          
          <li className="nav-item dropdown hidden-caret">
           
            <ul
              className="dropdown-menu notif-box"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <div className="dropdown-title">You have 4 new notification</div>
              </li>
              <li>
                <div className="notif-center">
                  <a href="#">
                    <div className="notif-icon notif-primary">
                      {" "}
                      <i className="la la-user-plus" />
                    </div>
                    <div className="notif-content">
                      <span className="block">New user registered</span>
                      <span className="time">5 minutes ago</span>
                    </div>
                  </a>
                  <a href="#">
                    <div className="notif-icon notif-success">
                      {" "}
                      <i className="la la-comment" />{" "}
                    </div>
                    <div className="notif-content">
                      <span className="block">Rahmad commented on Admin</span>
                      <span className="time">12 minutes ago</span>
                    </div>
                  </a>
                  <a href="#">
                    <div className="notif-img">
                      <img src="/assets/img/profile2.jpg" alt="Img Profile" />
                    </div>
                    <div className="notif-content">
                      <span className="block">Reza send messages to you</span>
                      <span className="time">12 minutes ago</span>
                    </div>
                  </a>
                  <a href="#">
                    <div className="notif-icon notif-danger">
                      {" "}
                      <i className="la la-heart" />{" "}
                    </div>
                    <div className="notif-content">
                      <span className="block">Farrah liked Admin</span>
                      <span className="time">17 minutes ago</span>
                    </div>
                  </a>
                </div>
              </li>
              <li>
                <a className="see-all" href="javascript:void(0);">
                  {" "}
                  <strong>See all notifications</strong>{" "}
                  <i className="la la-angle-right" />{" "}
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a
              className="dropdown-toggle profile-pic"
              data-toggle="dropdown"
              href="#"
              aria-expanded="false"
            >
              {" "}
              <img
                src="/assets/img/profile.jpg"
                alt="user-img"
                width={36}
                className="img-circle"
              />
              <span>{session?.user?.name}</span>{" "}
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <div className="user-box">
                  <div className="u-img">
                    <img src="/assets/img/profile.jpg" alt="user" />
                  </div>
                  <div className="u-text">
                    <h4>{session?.user?.name}</h4>
                    <p className="text-muted">{session?.user?.email}</p>
                    <a
                      href="profile.html"
                      className="btn btn-rounded btn-danger btn-sm"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </li>
         
            
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                <i className="ti-settings" /> Account Setting
              </a>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => signOut()}>
                <i className="fa fa-power-off" /> Logout
              </div>
            </ul>
            {/* /.dropdown-user */}
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <Sidebar />
  </>
  );
}
