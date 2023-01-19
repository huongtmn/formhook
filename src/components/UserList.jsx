import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const [keyword, setKeyword] = useState({
    keyword: "",
  });
  const [type, setType] = useState({
    type: "",
  });

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  const renderContent = () => {
    const filteredData = userState.userList.filter((ele) => {
      return (
        (ele.fullName.toLowerCase().indexOf(keyword.keyword.toLocaleLowerCase()) !== -1) &&
        (ele.type.toLowerCase().includes(type.type.toLocaleLowerCase()))
      );
    });

    return filteredData.map((element, idx) => {
      return (
        <tr key={element.id} className={idx % 2 === 0 ? "bg-light" : undefined}>
          <td>{idx + 1}</td>
          <td>{element.username}</td>
          <td>{element.fullName}</td>
          <td>{element.email}</td>
          <td>{element.phoneNumber}</td>
          <td>{element.type}</td>
          <td>
            <button
              onClick={() => setSelectedUser(element)}
              className="btn btn-info mr-2"
            >
              EDIT
            </button>
            <button
              onClick={() => deleteUser(element)}
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };

  const deleteUser = (user) => {
    dispatch({
      type: "DELETE_USER",
      payload: user,
    });
  };

  const setSelectedUser = (user) => {
    dispatch({
      type: "SET_SELECTED_USER",
      payload: user,
    });
  };

  return (
    <div className="w-75 mx-auto mt-5">
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold">USER MANAGEMENT</div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                type="text"
                placeholder="Search by full name..."
                className="form-control"
                onChange={(event) =>
                  setKeyword({ keyword: event.target.value })
                }
              />
            </div>
          </div>
          <div className="col-3 ml-auto">
            <div className="form-group mb-0">
              <select
                className="form-control"
                onChange={(event) =>
                  setType({ type: event.target.value })
                }
              >
                <option value="">All</option>
                <option value="Client">Client</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderContent()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
