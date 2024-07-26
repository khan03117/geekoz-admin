// import React from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import CreateBanner from './pages/banner/CreateBanner'
import CreateTestimonial from './pages/testimonial/CreateTestimonial'
import ContactDetails from './pages/contact_details'
import CreatePolicy from './pages/policy/CreatePolicy'
import Login from './pages/Login'
import PromoCodes from './pages/PromoCode'
import SubCategory from './pages/SubCategory'
import Offer from './pages/Offer'
import CreateFaq from './pages/faq/CreateFaq'
import ViewFaq from './pages/faq/ViewFaq'
import Country from './pages/Country'
import ViewCountry from './pages/Country/ViewCountry'
import Activity from './pages/activity'
import ViewPackages from './pages/Package/ViewPackages'
import PackageCreate from './pages/Package/PackageCreate'
import Region from './pages/Region'
import Enquire from './pages/enquire'
import EditPackage from './pages/Package/EditPackage'
import Itinerary from './pages/Package/Itinerary'



function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public route */}
        <Route path='/login' element={<Login />} />

        {/* Protected routes with Layout */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/countries' element={<Country />} />
          <Route path='/countries/:url' element={<Country />} />

          <Route path='/banner' element={<CreateBanner />} />
          <Route path='/testimonial' element={<CreateTestimonial />} />
          <Route path='/contact-details' element={<ContactDetails />} />
          <Route path='/policy' element={<CreatePolicy />} />
          <Route path='/promo-code' element={<PromoCodes />} />
          <Route path='/subcategory' element={<SubCategory />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/activity' element={<Activity />} />
          <Route path='/faq/create' element={<CreateFaq />} />
          <Route path='/faq' element={<ViewFaq />} />
          <Route path='/destinations-view' element={<ViewCountry />} />
          <Route path='/packages' element={<ViewPackages />} />
          <Route path='/packages/create' element={<PackageCreate />} />
          <Route path='/packages/edit/:url' element={<EditPackage />} />
          <Route path='/packages/itinerary/:url' element={<Itinerary />} />
          <Route path='/region' element={<Region />} />
          <Route path='/enquire' element={<Enquire />} />
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
