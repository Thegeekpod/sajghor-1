'use client';
import { usePathname } from "next/navigation";
import { AdminScript } from "../../component/admin/AdminScript";
import Header from "../../component/admin/Header";

import Sidebar from "../../component/admin/Sidebar";
import "./globals.css";
import { SessionProvider } from "next-auth/react"



export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const url="/admin/login"
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <div className={`${pathname !== url ? "wrapper" : ''}`}>
          {pathname !== url &&  <Header />}
          
            
            <div className={`${pathname !== url ? "main-panel" : ''}`}>
              <div className="content">
                {children}

              </div>
              <footer className={`${pathname !== url ? 'footer' : 'd-none'}`}>
                <div className="container-fluid">
                  <nav className="pull-left">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link" href="http://www.themekita.com">
                          ThemeKita
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Help
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="https://themewagon.com/license/#free-item"
                        >
                          Licenses
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <div className="copyright ml-auto">
                    2018, made with <i className="la la-heart heart text-danger" /> by{" "}
                    <a href="http://www.themekita.com">ThemeKita</a>
                  </div>
                </div>
              </footer>

            </div>

          </div>
     
        </body>
        <AdminScript/>
      </SessionProvider>
    </html>
  )
}
