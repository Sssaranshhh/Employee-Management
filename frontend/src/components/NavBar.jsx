import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete window.axios?.defaults?.headers?.common["Authorization"]; // if you attach axios globally
    navigate("/login");
  };

  const activeClass = "underline font-semibold";

  return (
    <nav className="bg-gray-900 text-gray-100 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-6">
        <div className="text-lg font-bold">EmployeeApp</div>
        <div className="flex gap-4 flex-wrap">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? activeClass : "hover:underline"
            }
          >
            Employees
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? activeClass : "hover:underline"
            }
          >
            Add Employee
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeClass : "hover:underline"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? activeClass : "hover:underline"
              }
            >
              Signup
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
