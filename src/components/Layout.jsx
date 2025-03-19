import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import PropTypes from "prop-types";

export const Layout = ({ children, onFilter }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar onFilter={onFilter} />
        {/* Main Content */}
        <main className="flex-1 bg-black p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onFilter: PropTypes.func.isRequired,
};
