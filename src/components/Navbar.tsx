import React, { useRef } from "react";
import { navItems } from "../data";
import { Route, Routes, Link } from "react-router-dom";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import useNavbarStore from "../app/navbarStore";
import Messages from "./Conversations/Messages";
import { Logo } from "./Logo";
import BotDetailView from "./Bot/Botview";
import CreateAndEditFlow from "./Bot/Flow/CreateandEditFlow";
import BotWithStyles from "./Bot/Bot";
const Home = () => <div className="p-6">Home Dashboard</div>;
function Sidebar() {
  const navRef = useRef(null);
  const { activeTab, isExpanded, setActiveTab, toggleNavbar } = useNavbarStore();
  return (
    <div 
    ref={navRef}
    className={`h-screen bg-gray-50 flex flex-col border-r bg-gradient-to-r from-lightBlue-400 to-blue-800 shadow-md transition-all duration-300 ease-in-out fixed top-0 left-0 ${isExpanded ? "w-64" : "w-20"} z-20 border-blue-300 border-r-2`}>
      {/* Toggle Button */}
      <button
        onClick={toggleNavbar}
        className="absolute -right-3 top-20 transform bg-white rounded-full p-1 border border-gray-300 z-20 shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        {isExpanded ? (
          <ChevronLeft size={20} strokeWidth={1.5} className="text-gray-600" />
        ) : (
          <ChevronRight size={20} strokeWidth={1.5} className="text-gray-600" />
        )}
      </button>
      {/* Logo */}
      <div
        className={`flex-shrink-0 flex items-center justify-center h-16 border-b border-gray-200`}
      >
        <div
          className={`h-10 transition-all duration-200 ease-in-out flex items-center justify-start ${isExpanded ? "w-full px-4" : "w-10"}`}
        >
          <div
            className={`flex items-center ${isExpanded ? "w-full" : "justify-center w-10"}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10">
                <Logo />
              </div>
              {isExpanded && (
                <span className="text-base font-medium text-gray-900">
                  BotStudio
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <nav className={`flex flex-col items-center space-y-1`}>
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {index === 3 || index === 6 || index === 9 ? (
                <div
                  className={`my-2 h-px bg-gray-300 ${isExpanded ? "w-52" : "w-10"}`}
                ></div>
              ) : null}
              {item.path ? (
                <Link
                  to={item.path}
                  className={`relative flex items-center hover:bg-gray-100 transition-colors duration-200 rounded-md
                    ${isExpanded ? "w-52 justify-start px-4" : "w-14 justify-center"}
                    ${activeTab === item.label ? "text-blue-600" : "text-gray-600"}
                    py-3`}
                  onClick={() => setActiveTab(item.label)}
                >
                  <item.icon
                    size={20}
                    strokeWidth={1.5}
                    className={
                      activeTab === item.label
                        ? "text-blue-600"
                        : "text-gray-500"
                    }
                  />
                  {item.badge && (
                    <span className={`absolute ${isExpanded? "top-50% right-0" : "top-0 right-0" } bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>
                      {item.badge}
                    </span>
                  )}
                  {isExpanded && (
                    <span
                      className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden`}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              ) : (
                <div
                  className={`relative flex items-center hover:bg-gray-100 transition-colors duration-200 rounded-md
                    ${isExpanded ? "w-52 justify-start px-4" : "w-14 justify-center"}
                    ${activeTab === item.label ? "bg-blue-100 text-blue-600" : "text-gray-600"}
                    py-3`}
                  onClick={() => setActiveTab(item.label)}
                >
                  <item.icon
                    size={20}
                    strokeWidth={1.5}
                    className={
                      activeTab === item.label
                        ? "text-blue-600"
                        : "text-gray-500"
                    }
                  />
                  {item.badge && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {isExpanded && (
                    <span
                      className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
function Navbar() {
  const { isExpanded } = useNavbarStore();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content (Dashboard) */}
      <ScrollArea
        className={`flex-1 overflow-y-hidden transition-all duration-300 ${isExpanded ? "ml-64" : "ml-20"}`}
      >
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bot" element={<BotWithStyles />} />
            <Route path='/bot/:id' element={<BotDetailView /> }/>
          </Routes>
        </main>
      </ScrollArea>
    </div>
  );
}
export default Navbar;