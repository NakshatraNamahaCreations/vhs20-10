import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Paymentsreports from "./components/Paymentsreports";
import Vendor from "./components/Vendor";
import UserManagement from "./components/UserManagement";
import Product from "./components/Product";
import Service from "./components/Service";
import Voucher from "./components/Voucher";
import Review from "./components/Review";
// import Content from "./components/Content";
import Wallets from "./components/Wallets";
import Settings from "./components/Settings";
import ServiceBooking from "./components/ServiceBooking";
import Sidenav from "./components/Sidenav";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateSubcategory from "./components/CreateSubcategory";
// import SSubcategory from "./components/SSubCategory";
import Createcategory from "./components/Createcategory";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Subcategory from "./components/Subcategory";
import Servicedetails from "./components/Servicedetails";
import Vendordetails from "./components/Vendordetails";
import Offerbanner from "./components/Offerbanner";
import Spotlight from "./components/Spotlight";
import Homepagebanner from "./components/Homepagebanner";
import Homepagetitle from "./components/Homepagetiltle";
import Slots from "./components/Slots";
import FEQ from "./components/FEQ";
import ServiceAddOns from "./components/ServiceAddOns";
import WhatsappAndPhone from "./components/WhatsappAndPhone";
import WebsiteBanner from "./components/WebsiteBanner"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/CreateSubcategory" element={<CreateSubcategory />} />
        {/* <Route path="/SSubcategory" element={<SSubcategory />} /> */}
        <Route path="/Createcategory" element={<Createcategory />} />
        <Route path="/Paymentsreports" element={<Paymentsreports />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/service-add-ons" element={<ServiceAddOns />} />
        <Route path="/whatsappandphonenumber" element={<WhatsappAndPhone />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/Wallets" element={<Wallets />} />
        <Route path="/product" element={<Product />} />
        <Route path="/ServiceBooking" element={<ServiceBooking />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/review" element={<Review />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/offerbanner" element={<Offerbanner />} />
        <Route path="/spotlight" element={<Spotlight />} />
        <Route path="/homepagetitle" element={<Homepagetitle />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/homepagebanner" element={<Homepagebanner />} />
        <Route path="/websitebanner" element={<WebsiteBanner />} />


        <Route path="/servicedetails/:id" element={<Servicedetails />} />
        <Route path="/vendordetails/:id" element={<Vendordetails />} />
        <Route path="/feq" element={<FEQ />} />

        {/* <Route path="/Content" element={<Content />} /> */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/Sidenav" element={<Sidenav />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
      {/* </Sidebar> */}
    </BrowserRouter>
  );
}
export default App;
