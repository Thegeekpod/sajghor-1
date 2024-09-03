import React from 'react'
import Script from "next/script";
export const AdminScript = () => {
  return (
    <>
    
    <Script strategy="afterInteractive"  src="/assets/js/core/jquery.3.2.1.min.js"></Script>
<Script strategy="afterInteractive"  src="/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"></Script>
<Script strategy="afterInteractive"  src="/assets/js/core/popper.min.js"></Script>
<Script strategy="afterInteractive"  src="/assets/js/core/bootstrap.min.js"></Script>
{/* <Script strategy="afterInteractive"  src="/assets/js/plugin/chartist/chartist.min.js"></Script> */}
{/* <Script strategy="afterInteractive"  src="/assets/js/plugin/chartist/plugin/chartist-plugin-tooltip.min.js"></Script> */}
<Script strategy="afterInteractive"  src="/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js"></Script>
<Script strategy="afterInteractive"  src="/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js"></Script>
<Script strategy="afterInteractive"  src="/assets/js/plugin/jquery-mapael/jquery.mapael.min.js"></Script>
{/* <Script strategy="afterInteractive"  src="/assets/js/plugin/jquery-mapael/maps/world_countries.min.js"></Script> */}
{/* <Script strategy="afterInteractive"  src="/assets/js/plugin/chart-circle/circles.min.js"></Script> */}
<Script strategy="afterInteractive"  src="/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"></Script>
<Script strategy="afterInteractive"  src="/assets/js/ready.min.js"></Script>
{/* <Script strategy="afterInteractive"  src="/assets/js/demo.js"></Script> */}
    </>
  )
}
