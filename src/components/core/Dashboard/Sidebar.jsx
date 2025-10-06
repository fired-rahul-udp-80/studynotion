import { useState } from "react"
import { VscSignOut, VscMenu, VscChromeClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // responsive toggle

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      {/*  Menu Icon for small screens */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="fixed top-16 left-4 z-[2000] rounded-md bg-richblack-800 p-2 text-richblack-100 lg:hidden"
      >
        {isSidebarOpen ? (
          <VscChromeClose className="text-2xl" />
        ) : (
          <VscMenu className="text-2xl" />
        )}
      </button>

       
      <div
        className={`fixed lg:static top-0 left-0 z-[1500] h-full min-w-[220px] flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink 
              onClick={() => setIsSidebarOpen(false)}
              key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        <div className="flex flex-col">
          <SidebarLink
           onClick={() => setIsSidebarOpen(false)}
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      {/* ✅ Overlay on small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-[1000] bg-black opacity-40 lg:hidden"
        ></div>
      )}
    </>
  )
}
