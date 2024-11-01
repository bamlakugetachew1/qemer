import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function StudentList() {
  const [users, setUsers] = useState([]);
  const [rowsLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalLength = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/length"
        );
        setTotalPage(Math.ceil(response.data.length / rowsLimit));
      } catch (error) {
        console.error("Error fetching total length:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users", {
          params: { limit: rowsLimit, page: currentPage },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTotalLength();
    fetchUsers();
  }, [currentPage, rowsLimit]);

  const nextPage = () => {
    if (currentPage < totalPage) setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  const customPagination = useMemo(() => {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }, [totalPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (user) => {
    navigate("/register", { state: { studentData: user, isUpdate: true } });
  };

  return (
    <div className="min-h-screen h-full bg-white flex items-center justify-center pt-10 pb-14">
      <div className="w-full max-w-4xl px-2">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <Link to="/register" className="nav-link">
            Add
          </Link>
        </button>
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-4">
          <table className="table-auto w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-3 text-gray-800 font-bold whitespace-nowrap">
                  Name
                </th>
                <th className="py-3 px-3 text-gray-800 font-bold whitespace-nowrap">
                  Age
                </th>
                <th className="py-3 px-3 text-gray-800 font-bold whitespace-nowrap">
                  Course
                </th>
                <th className="py-3 px-3 text-gray-800 font-bold whitespace-nowrap">
                  Phone Number
                </th>
                <th className="py-3 px-3 text-gray-800 font-bold whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="py-2 px-3 text-gray-700">{user.name}</td>
                  <td className="py-2 px-3 text-gray-700">{user.age}</td>
                  <td className="py-2 px-3 text-gray-700">{user.course}</td>
                  <td className="py-2 px-3 text-gray-700">
                    {user.phonenumber}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => handleUpdate(user)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 ml-3"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {customPagination.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => changePage(pageNumber)}
                  className={`px-4 py-2 rounded ${
                    pageNumber === currentPage
                      ? "bg-blue-500 text-white font-semibold"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
