import React, { useEffect, useState } from "react";
import MainNavbarInc from "../Bars/MainNavbarInc";
import TopBarInc from "../Bars/TopBarInc";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UnionDetails = () => {
  const { id } = useParams();
  const user_avatar = "/images/unilag.svg";
  const [avatarImage, setAvatarImage] = useState(user_avatar);
  const [roles, setRoles] = useState([]);
  const [unions, setunions] = useState({
    name: "",
    acronym: "",
    industry: "",
    headquarters: "",
    phone: "",
    about: "",
    founded_in: "",
    logo: "",
  });
  const [users, setUsers] = useState({
    email: "",
    role: "",
  });
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchdata(id);
    fetchBranches(id);
    fetchroles();
  }, []);

  const fetchdata = async (id) => {
    try {
      const baseUrl = "https://phpstack-1245936-4460801.cloudwaysapps.com/dev";
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not logged in."); // Handle case where user is not logged in
      }

      const res = await fetch(baseUrl + `/api/union/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data."); // Handle failed request
      }

      const data = await res.json();
      setunions(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchroles = async () => {
    try {
      const baseUrl = "https://phpstack-1245936-4460801.cloudwaysapps.com/dev";

      const res = await fetch(baseUrl + "/api/users/get-roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data."); // Handle failed request
      }

      const data = await res.json();
      setRoles(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  console.log(unions);

  const fetchBranches = async (id, unions) => {
    try {
      const baseUrl = "https://phpstack-1245936-4460801.cloudwaysapps.com/dev";
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not logged in."); // Handle case where user is not logged in
      }

      const res = await fetch(baseUrl + `/api/get-union-branches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data."); // Handle failed request
      }

      const data = await res.json();
      setBranches(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  console.log(branches);
  console.log(users);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const image = URL.createObjectURL(file);
    setAvatarImage(image);

    setunions((prevFormData) => ({ ...prevFormData, logo: file }));
    console.log(unions, image, file);
  };

  const onHandleChange = (e) => {
    setunions({ ...unions, [e.target.name]: e.target.value });
    console.log(unions);
  };

  const updateUnion = async (id, unions) => {
    try {
      const formData = new FormData();
      Object.entries(unions).forEach(([key, value]) => {
        // Check if the key is 'display_picture' and if the value is a file
        if (key === "logo" && value instanceof File) {
          formData.append(key, value);
        } else if (key !== "logo") {
          formData.append(key, value);
        }
      });
      const baseUrl = "https://phpstack-1245936-4460801.cloudwaysapps.com/dev";
      const res = await fetch(baseUrl + `/api/union/edit/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data."); // Handle failed request
      }

      const data = await res.json();
      setunions(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const onHandleChangeUser = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    console.log(users);
  };

  const handleSendInvite = async (e, id, unions, setunions) => {
    e.preventDefault();
    try {
      const baseUrl = "https://phpstack-1245936-4460801.cloudwaysapps.com/dev";
      const res = await fetch(baseUrl + `/api/union/send-invite/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(users),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data."); // Handle failed request
      }

      const data = await res.json();
      // setGetDisputes(data.data);
      toast("union invite has been sent!");
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <>
      <div className="main-admin-container bg-light dark-mode-active">
        <div className="d-flex flex-column flex-lg-row h-lg-100">
          {/* <?php include "./components/main-navbar.inc.php"; ?> */}
          <MainNavbarInc />
          <div className="flex-lg-fill bg-white overflow-auto vstack vh-lg-100 position-relative">
            {/* <?php include "./components/top-bar.inc.php"; ?> */}
            <TopBarInc />
            <main className="admin-content">
              <div className="header-box py-5">
                <div className="container">
                  <h2>Branches</h2>
                </div>
              </div>

              <div className="content-main">
                <div className="container">
                  <div className="row py-4">
                    <div className="col-lg-10">
                      <div className="d-flex gap-15">
                        <div>
                          <a
                            href="#"
                            className="text-muted-4 text-decoration-none"
                          >
                            <i className="bi bi-arrow-left"></i> Go back
                          </a>
                        </div>

                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a
                                href="#"
                                className="text-main-primary text-decoration-none"
                              >
                                All Unions
                              </a>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {unions.name}
                            </li>
                          </ol>
                        </nav>
                      </div>

                      <div className="d-flex justify-content-between align-items-center avatar-icon w-100 my-5">
                        <div className="d-flex avatar-holder">
                          <div className="position-relative">
                            <div className="avatar-md flex-shrink-0">
                              <img
                                src={unions.logo}
                                className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div className="ms-2 flex-grow-1">
                            <h3 className="mb-2 bold-text">{unions.name}</h3>
                            <p className="mb-0 text-muted-3">
                              {unions.acronym || ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-15 mb-5">
                        <Link
                          to={`/branches/${id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <button
                            className="btn btn-size btn-main-primary"
                            type="button"
                          >
                            Create Branch
                          </button>
                        </Link>
                      </div>

                      <div
                        className="accordion accordion-expand"
                        id="accordionUnion"
                      >
                        <div className="accordion-item mb-3">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button heading-4 text-grey"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              {unions.acronym || unions.name} Branches
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionUnion"
                          >
                            <div className="accordion-body">
                              <div className="row my-4">
                                <div className="col-lg-5">
                                  <div className="input-group">
                                    <span className="input-group-text bg-transparent">
                                      <img
                                        src="/images/search.svg"
                                        className="img-fluid"
                                        alt="search"
                                      />
                                    </span>
                                    <input
                                      type="search"
                                      className="form-control border-start-0 form-control-height"
                                      placeholder="Search here..."
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-7">
                                  <div className="d-flex align-items-center justify-content-between gap-15">
                                    <div className="d-flex">
                                      <a className="btn btn-size btn-outline-light text-medium px-3 me-lg-3">
                                        <img
                                          src="/images/filter.svg"
                                          className="img-fluid"
                                        />{" "}
                                        A-Z
                                      </a>

                                      <button className="btn btn-size btn-main-outline-primary px-3">
                                        <i className="bi bi-cloud-download me-2"></i>{" "}
                                        Export CSV
                                      </button>
                                    </div>

                                    <p className="text-end mb-0 file-count">
                                      Branches: {branches.length}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-lg-12">
                                  <table className="table table-list">
                                    <thead className="table-light">
                                      <tr>
                                        <th scope="col">
                                          <div>
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="checkboxNoLabel"
                                              value=""
                                              aria-label="..."
                                            />
                                          </div>
                                        </th>
                                        <th scope="col">Unions</th>
                                        <th scope="col">Assigned Admin</th>
                                        <th scope="col">No of branches</th>
                                        <th scope="col">Date added</th>
                                        <th scope="col"></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {branches.map((branch) => (
                                        <tr key={branch._id}>
                                          <td>
                                            <div>
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="checkboxNoLabel"
                                                value=""
                                                aria-label="..."
                                              />
                                            </div>
                                          </td>

                                          <td>
                                            <div
                                              className="d-flex align-items-center avatar-holder"
                                              key={branch.id}
                                            >
                                              <div className="position-relative">
                                                <div className="avatar-sm flex-shrink-0">
                                                  <img
                                                    src="/images/nnpc.svg"
                                                    className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                    alt="Avatar"
                                                  />
                                                </div>
                                              </div>
                                              <div className="ms-2 flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                  <div className="mb-0 d-flex align-items-center">
                                                    <div className="heading-text">
                                                      {branch.name}
                                                      <span className="text-muted-3">
                                                        ({branch.acronym})
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </td>

                                          <td>
                                            <div className="avatars">
                                              <div className="dropdown">
                                                <a
                                                  href="#"
                                                  className="avatars__item dropdown-toggle"
                                                  type="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <img
                                                    className="avatar img-fluid object-fit-cover object-position-center w-100 h-100"
                                                    src="https://randomuser.me/api/portraits/women/65.jpg"
                                                    alt=""
                                                  />
                                                </a>
                                                <ul className="dropdown-menu action-menu border-radius">
                                                  <img
                                                    src="/images/pointer.svg"
                                                    className="img-fluid pointer"
                                                  />
                                                  <div className="d-flex avatar-holder border-bottom py-4">
                                                    <div className="position-relative">
                                                      <img
                                                        src="/images/Avatar-online-indicator.svg"
                                                        className="img-fluid indicator-avatar"
                                                        alt="indicator"
                                                      />
                                                      <div className="avatar-sm flex-shrink-0">
                                                        <img
                                                          src="https://randomuser.me/api/portraits/women/65.jpg"
                                                          className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                          alt="Avatar"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="ms-2 flex-grow-1">
                                                      <h5 className="mb-0">
                                                        Stephen Ejiro
                                                      </h5>
                                                      <p className="mb-0 text-main-primary">
                                                        View profile
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/users.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Role in dispute
                                                      </p>
                                                      <img
                                                        src="/images/claim.svg"
                                                        className="img-fluid"
                                                        alt="claimant"
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/user.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Name & Organization
                                                      </p>
                                                      <p className="mb-0">
                                                        Stephen Ejiro (Shafa
                                                        Abuja)
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/mail.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Email
                                                      </p>
                                                      <p className="mb-0">
                                                        stepheneji@nnpc.com
                                                      </p>
                                                    </div>

                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/call.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Phone Number
                                                      </p>
                                                      <p className="mb-0">
                                                        08168141116
                                                      </p>
                                                    </div>
                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>
                                                </ul>
                                              </div>
                                              <div className="dropdown">
                                                <a
                                                  href="#"
                                                  className="avatars__item dropdown-toggle"
                                                  type="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <img
                                                    className="avatar img-fluid object-fit-cover object-position-center w-100 h-100"
                                                    src="https://randomuser.me/api/portraits/women/66.jpg"
                                                    alt=""
                                                  />
                                                </a>
                                                <ul className="dropdown-menu action-menu border-radius">
                                                  <img
                                                    src="/images/pointer.svg"
                                                    className="img-fluid pointer"
                                                  />
                                                  <div className="d-flex avatar-holder border-bottom py-4">
                                                    <div className="position-relative">
                                                      <img
                                                        src="/images/Avatar-online-indicator.svg"
                                                        className="img-fluid indicator-avatar"
                                                        alt="indicator"
                                                      />
                                                      <div className="avatar-sm flex-shrink-0">
                                                        <img
                                                          src="https://randomuser.me/api/portraits/women/66.jpg"
                                                          className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                          alt="Avatar"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="ms-2 flex-grow-1">
                                                      <h5 className="mb-0">
                                                        Stephen Ejiro
                                                      </h5>
                                                      <p className="mb-0 text-main-primary">
                                                        View profile
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/users.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Role in dispute
                                                      </p>
                                                      <img
                                                        src="/images/claim.svg"
                                                        className="img-fluid"
                                                        alt="claimant"
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/user.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Name & Organization
                                                      </p>
                                                      <p className="mb-0">
                                                        Stephen Ejiro (Shafa
                                                        Abuja)
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/mail.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Email
                                                      </p>
                                                      <p className="mb-0">
                                                        stepheneji@nnpc.com
                                                      </p>
                                                    </div>

                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/call.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Phone Number
                                                      </p>
                                                      <p className="mb-0">
                                                        08168141116
                                                      </p>
                                                    </div>
                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>
                                                </ul>
                                              </div>
                                              <div className="dropdown">
                                                <a
                                                  href="#"
                                                  className="avatars__item dropdown-toggle"
                                                  type="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <img
                                                    className="avatar img-fluid object-fit-cover object-position-center w-100 h-100"
                                                    src="https://randomuser.me/api/portraits/women/67.jpg"
                                                    alt=""
                                                  />
                                                </a>
                                                <ul className="dropdown-menu action-menu border-radius">
                                                  <img
                                                    src="/images/pointer.svg"
                                                    className="img-fluid pointer"
                                                  />
                                                  <div className="d-flex avatar-holder border-bottom py-4">
                                                    <div className="position-relative">
                                                      <img
                                                        src="/images/Avatar-online-indicator.svg"
                                                        className="img-fluid indicator-avatar"
                                                        alt="indicator"
                                                      />
                                                      <div className="avatar-sm flex-shrink-0">
                                                        <img
                                                          src="https://randomuser.me/api/portraits/women/67.jpg"
                                                          className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                          alt="Avatar"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="ms-2 flex-grow-1">
                                                      <h5 className="mb-0">
                                                        Stephen Ejiro
                                                      </h5>
                                                      <p className="mb-0 text-main-primary">
                                                        View profile
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/users.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Role in dispute
                                                      </p>
                                                      <img
                                                        src="/images/claim.svg"
                                                        className="img-fluid"
                                                        alt="claimant"
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/user.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Name & Organization
                                                      </p>
                                                      <p className="mb-0">
                                                        Stephen Ejiro (Shafa
                                                        Abuja)
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/mail.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Email
                                                      </p>
                                                      <p className="mb-0">
                                                        stepheneji@nnpc.com
                                                      </p>
                                                    </div>

                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/call.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Phone Number
                                                      </p>
                                                      <p className="mb-0">
                                                        08168141116
                                                      </p>
                                                    </div>
                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>
                                                </ul>
                                              </div>
                                              <div className="dropdown">
                                                <a
                                                  href="#"
                                                  className="avatars__item dropdown-toggle"
                                                  type="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <img
                                                    className="avatar img-fluid object-fit-cover object-position-center w-100 h-100"
                                                    src="https://randomuser.me/api/portraits/women/68.jpg"
                                                    alt=""
                                                  />
                                                </a>
                                                <ul className="dropdown-menu action-menu border-radius">
                                                  <img
                                                    src="/images/pointer.svg"
                                                    className="img-fluid pointer"
                                                  />
                                                  <div className="d-flex avatar-holder border-bottom py-4">
                                                    <div className="position-relative">
                                                      <img
                                                        src="/images/Avatar-online-indicator.svg"
                                                        className="img-fluid indicator-avatar"
                                                        alt="indicator"
                                                      />
                                                      <div className="avatar-sm flex-shrink-0">
                                                        <img
                                                          src="https://randomuser.me/api/portraits/women/68.jpg"
                                                          className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                          alt="Avatar"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="ms-2 flex-grow-1">
                                                      <h5 className="mb-0">
                                                        Stephen Ejiro
                                                      </h5>
                                                      <p className="mb-0 text-main-primary">
                                                        View profile
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/users.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Role in dispute
                                                      </p>
                                                      <img
                                                        src="/images/claim.svg"
                                                        className="img-fluid"
                                                        alt="claimant"
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/user.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Name & Organization
                                                      </p>
                                                      <p className="mb-0">
                                                        Stephen Ejiro (Shafa
                                                        Abuja)
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/mail.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Email
                                                      </p>
                                                      <p className="mb-0">
                                                        stepheneji@nnpc.com
                                                      </p>
                                                    </div>

                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/call.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Phone Number
                                                      </p>
                                                      <p className="mb-0">
                                                        08168141116
                                                      </p>
                                                    </div>
                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>
                                                </ul>
                                              </div>
                                              <div className="dropdown">
                                                <a
                                                  href="#"
                                                  className="avatars__item dropdown-toggle"
                                                  type="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <img
                                                    className="avatar img-fluid object-fit-cover object-position-center w-100 h-100"
                                                    src="https://randomuser.me/api/portraits/women/69.jpg"
                                                    alt=""
                                                  />
                                                </a>
                                                <ul className="dropdown-menu action-menu border-radius">
                                                  <img
                                                    src="/images/pointer.svg"
                                                    className="img-fluid pointer"
                                                  />
                                                  <div className="d-flex avatar-holder border-bottom py-4">
                                                    <div className="position-relative">
                                                      <img
                                                        src="/images/Avatar-online-indicator.svg"
                                                        className="img-fluid indicator-avatar"
                                                        alt="indicator"
                                                      />
                                                      <div className="avatar-sm flex-shrink-0">
                                                        <img
                                                          src="https://randomuser.me/api/portraits/women/69.jpg"
                                                          className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                          alt="Avatar"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="ms-2 flex-grow-1">
                                                      <h5 className="mb-0">
                                                        Stephen Ejiro
                                                      </h5>
                                                      <p className="mb-0 text-main-primary">
                                                        View profile
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/users.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Role in dispute
                                                      </p>
                                                      <img
                                                        src="/images/claim.svg"
                                                        className="img-fluid"
                                                        alt="claimant"
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/user.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Name & Organization
                                                      </p>
                                                      <p className="mb-0">
                                                        Stephen Ejiro (Shafa
                                                        Abuja)
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/mail.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Email
                                                      </p>
                                                      <p className="mb-0">
                                                        stepheneji@nnpc.com
                                                      </p>
                                                    </div>

                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>

                                                  <div className="d-flex align-items-center py-2">
                                                    <img
                                                      src="/images/call.svg"
                                                      className="img-fluid"
                                                      alt="users"
                                                    />
                                                    <div className="ms-2 flex-grow-1">
                                                      <p className="mb-1 ft-sm">
                                                        Phone Number
                                                      </p>
                                                      <p className="mb-0">
                                                        08168141116
                                                      </p>
                                                    </div>
                                                    <img
                                                      src="/images/copy.svg"
                                                      className="img-fluid"
                                                      alt="copy"
                                                    />
                                                  </div>
                                                </ul>
                                              </div>
                                            </div>
                                          </td>

                                          <td>{branch.industry}</td>
                                          <td>{branch.date_added}</td>

                                          <td>
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <img
                                                  src="/images/dots-v.svg"
                                                  className="img-fluid"
                                                  alt="dot-v"
                                                />
                                              </button>
                                              <ul
                                                className="dropdown-menu border-radius action-menu-2"
                                                // onClick={onUnionBranches3}
                                              >
                                                <li>
                                                  <Link
                                                    to={`/SubBranch/${branch._id}`}
                                                    className="dropdown-item"
                                                  >
                                                    View details
                                                  </Link>
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item mb-3">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed heading-4 text-grey"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              {unions.acronym || unions.name} Profile
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionUnion"
                          >
                            <div className="accordion-body">
                              <div className="mb-3">
                                <a
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editModal2"
                                  className="btn btn-size btn-main-primary d-inline-flex"
                                >
                                  Edit Branch
                                </a>
                              </div>

                              <form>
                                <div className="row mt-4">
                                  <div className="col-lg-3 mb-lg-0 mb-4">
                                    <label className="form-label d-block">
                                      Logo
                                    </label>
                                    <label
                                      htmlFor="profile"
                                      className="position-relative"
                                    >
                                      <input
                                        type="file"
                                        id="profile"
                                        style={{ display: "none" }}
                                        name="logo"
                                      />

                                      <div className="main-avatar mx-auto">
                                        <img
                                          src={unions.logo}
                                          className="img-fluid object-fit-cover object-position-center w-100 h-100"
                                        />
                                      </div>
                                    </label>
                                  </div>

                                  <div className="col-lg-9">
                                    <div className="mb-4">
                                      <label className="form-label">
                                        Union Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control form-control-height"
                                        value={unions.name}
                                        name="name"
                                        disabled
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <label className="form-label">
                                        Union Acronym (if applicable)
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control form-control-height"
                                        value={unions.acronym}
                                        name="acronym"
                                        disabled
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <label className="form-label">
                                        Industry
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control form-control-height"
                                        disabled
                                        name="industry"
                                        value={unions.industry}
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <label className="form-label">
                                        Headquarters
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control form-control-height"
                                        disabled
                                        name="headquarters"
                                        value={unions.headquarters}
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <label className="form-label">
                                        Phone number
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control form-control-height"
                                        disabled
                                        name="phone"
                                        value={unions.phone}
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <label className="form-label">
                                        About
                                      </label>

                                      <textarea
                                        className="form-control"
                                        rows="4"
                                        disabled
                                        value={unions.about}
                                        name="about"
                                      ></textarea>
                                    </div>
                                    <div className="mb-4">
                                      <label className="form-label">
                                        Founded in
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control form-control-height"
                                        value={unions.founded_in}
                                        name="founded_in"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item mb-3">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed heading-4 text-grey"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              {unions.acronym || unions.name} Admins
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionUnion"
                          >
                            <div className="accordion-body">
                              <div className="mb-3">
                                <a
                                  href=""
                                  className="btn btn-size btn-main-primary d-inline-flex"
                                  data-bs-toggle="modal"
                                  data-bs-target="#inviteModal"
                                >
                                  Invite Admins
                                </a>
                              </div>

                              <table className="table table-list">
                                <thead className="table-light">
                                  <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date added</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td scope="row">
                                      <div className="d-flex avatar-holder">
                                        <div className="position-relative">
                                          <div className="avatar-sm flex-shrink-0">
                                            <img
                                              src="/images/avatar-2.svg"
                                              className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                              alt="Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="ms-2 flex-grow-1">
                                          <h5 className="mb-0">
                                            Salim Mustapha
                                          </h5>
                                          <p className="mb-0 text-muted-3">
                                            salimmusty@gmail.com
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>Feb 4 2023</td>
                                    <td>
                                      <img
                                        src="/images/claimant.svg"
                                        className="img-fluid"
                                        alt="claimant"
                                      />
                                    </td>

                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <img
                                            src="/images/dots-v.svg"
                                            className="img-fluid"
                                            alt="dot-v"
                                          />
                                        </button>
                                        <ul className="dropdown-menu border-radius action-menu-2">
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#removeModal"
                                            >
                                              Remove Admin
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td scope="row">
                                      <div className="d-flex avatar-holder">
                                        <div className="position-relative">
                                          <div className="avatar-sm flex-shrink-0">
                                            <img
                                              src="/images/avatar-2.svg"
                                              className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                              alt="Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="ms-2 flex-grow-1">
                                          <h5 className="mb-0">
                                            Salim Mustapha
                                          </h5>
                                          <p className="mb-0 text-muted-3">
                                            salimmusty@gmail.com
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>Feb 4 2023</td>
                                    <td>
                                      <img
                                        src="/images/claimant.svg"
                                        className="img-fluid"
                                        alt="claimant"
                                      />
                                    </td>

                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <img
                                            src="/images/dots-v.svg"
                                            className="img-fluid"
                                            alt="dot-v"
                                          />
                                        </button>
                                        <ul className="dropdown-menu border-radius action-menu-2">
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#removeModal"
                                            >
                                              Remove Admin
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td scope="row">
                                      <div className="d-flex avatar-holder">
                                        <div className="position-relative">
                                          <div className="avatar-sm flex-shrink-0">
                                            <img
                                              src="/images/avatar-2.svg"
                                              className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                              alt="Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="ms-2 flex-grow-1">
                                          <h5 className="mb-0">
                                            Salim Mustapha
                                          </h5>
                                          <p className="mb-0 text-muted-3">
                                            salimmusty@gmail.com
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>Feb 4 2023</td>
                                    <td>
                                      <img
                                        src="/images/claimant.svg"
                                        className="img-fluid"
                                        alt="claimant"
                                      />
                                    </td>

                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <img
                                            src="/images/dots-v.svg"
                                            className="img-fluid"
                                            alt="dot-v"
                                          />
                                        </button>
                                        <ul className="dropdown-menu border-radius action-menu-2">
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#removeModal"
                                            >
                                              Remove Admin
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td scope="row">
                                      <div className="d-flex avatar-holder">
                                        <div className="position-relative">
                                          <div className="avatar-sm flex-shrink-0">
                                            <img
                                              src="/images/avatar-2.svg"
                                              className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                              alt="Avatar"
                                            />
                                          </div>
                                        </div>
                                        <div className="ms-2 flex-grow-1">
                                          <h5 className="mb-0">
                                            Salim Mustapha
                                          </h5>
                                          <p className="mb-0 text-muted-3">
                                            salimmusty@gmail.com
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>Feb 4 2023</td>
                                    <td>
                                      <img
                                        src="/images/claimant.svg"
                                        className="img-fluid"
                                        alt="claimant"
                                      />
                                    </td>

                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <img
                                            src="/images/dots-v.svg"
                                            className="img-fluid"
                                            alt="dot-v"
                                          />
                                        </button>
                                        <ul className="dropdown-menu border-radius action-menu-2">
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#removeModal"
                                            >
                                              Remove Admin
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item mb-3">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed heading-4 text-grey"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              {unions.acronym || unions.name} Disputes
                            </button>
                          </h2>
                          <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionUnion"
                          >
                            <div className="accordion-body">
                              <div className="table-responsive">
                                <table className="table table-list">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Filing Date</th>
                                      <th scope="col">Case Number</th>
                                      <th scope="col">Involved Parties</th>
                                      <th
                                        scope="col"
                                        style={{ width: "200px" }}
                                      >
                                        Case Title
                                      </th>
                                      <th scope="col">Case Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Feb 4 2023</td>
                                      <td scope="row">DS139</td>
                                      <td>
                                        <div className="mb-2">
                                          <div className="d-flex align-items-center avatar-holder">
                                            <div className="position-relative">
                                              <div className="avatar-sm flex-shrink-0">
                                                <img
                                                  src="/images/nnpc.svg"
                                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                  alt="Avatar"
                                                />
                                              </div>
                                            </div>
                                            <div className="ms-2 d-flex flex-grow-1 text-muted-3">
                                              <p className="text-truncate mb-0 max-200">
                                                ASUU Awka Ibom{" "}
                                              </p>
                                              <span>(NNPC)</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-2">
                                          <div className="d-flex align-items-center avatar-holder">
                                            <div className="position-relative">
                                              <div className="avatar-sm flex-shrink-0">
                                                <img
                                                  src="/images/ipman.svg"
                                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                  alt="Avatar"
                                                />
                                              </div>
                                            </div>
                                            <div className="ms-2 d-flex flex-grow-1 text-muted-3">
                                              <p className="text-truncate mb-0 max-200">
                                                ASUU Ibadan
                                              </p>
                                              <span>(IPMAN)</span>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        Production Sharing Contracts (PSCs) 2024
                                      </td>
                                      <td>
                                        <img
                                          src="/images/Internally-resolved.svg"
                                          className="img-fluid"
                                          alt="internally resolved"
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Feb 4 2023</td>
                                      <td scope="row">DS139</td>
                                      <td>
                                        <div className="mb-2">
                                          <div className="d-flex align-items-center avatar-holder">
                                            <div className="position-relative">
                                              <div className="avatar-sm flex-shrink-0">
                                                <img
                                                  src="/images/nnpc.svg"
                                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                  alt="Avatar"
                                                />
                                              </div>
                                            </div>
                                            <div className="ms-2 d-flex flex-grow-1 text-muted-3">
                                              <p className="text-truncate mb-0 max-200">
                                                ASUU Awka Ibom{" "}
                                              </p>
                                              <span>(NNPC)</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-2">
                                          <div className="d-flex align-items-center avatar-holder">
                                            <div className="position-relative">
                                              <div className="avatar-sm flex-shrink-0">
                                                <img
                                                  src="/images/ipman.svg"
                                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                  alt="Avatar"
                                                />
                                              </div>
                                            </div>
                                            <div className="ms-2 d-flex flex-grow-1 text-muted-3">
                                              <p className="text-truncate mb-0 max-200">
                                                ASUU Ibadan
                                              </p>
                                              <span>(IPMAN)</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-2">
                                          <div className="d-flex align-items-center avatar-holder">
                                            <div className="position-relative">
                                              <div className="avatar-sm flex-shrink-0">
                                                <img
                                                  src="/images/nnpc.svg"
                                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                  alt="Avatar"
                                                />
                                              </div>
                                            </div>
                                            <div className="ms-2 d-flex flex-grow-1 text-muted-3">
                                              <p className="text-truncate mb-0 max-200">
                                                ASUU Awka Ibom{" "}
                                              </p>
                                              <span>(NNPC)</span>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        Production Sharing Contracts (PSCs) 2024
                                      </td>
                                      <td>
                                        <img
                                          src="/images/Internally-resolved.svg"
                                          className="img-fluid"
                                          alt="internally resolved"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <footer>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12"></div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="removeModal"
        tabIndex="-1"
        aria-labelledby="removeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 p-lg-4 p-3">
            <div className="text-end">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <img
                  src="/images/delete-icon.svg"
                  className="img-fluid mb-3"
                  alt="delete an account"
                />
              </div>
              <h1 className="heading modal-heading text-center mb-3">
                Are you sure you want to Remove
              </h1>
              <p className="mb-4 modal-text text-center">
                Dorothy Ogenekaro (Union Branch Admin){" "}
                <span className="text-bold text-darken">as Admin for</span> ASUU{" "}
              </p>

              <button className="btn btn-size btn-main-danger w-100">
                Yes, Remove Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="editModal2"
        tabIndex="-1"
        aria-labelledby="editModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 p-lg-4 p-3">
            <div className="pb-4 border-bottom heading-card bg-white d-flex align-items-center justify-content-between flex-wrap">
              <h3 className="mb-lg-0 mb-3">Edit Union</h3>
              <div className="d-flex align-items-center gap-15">
                <a
                  href="#"
                  className="btn btn-size btn-main-outline-primary"
                  onClick={() => updateUnion(id, unions)}
                >
                  Save Changes
                </a>
                <a href="#" className="btn btn-size btn-main-primary">
                  Discard Changes
                </a>
              </div>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mt-4">
                  <div className="col-lg-3 mb-lg-0 mb-4">
                    <label className="form-label d-block">Logo</label>
                    <label htmlFor="profile" className="position-relative">
                      <input
                        type="file"
                        id="profile"
                        style={{ display: "none" }}
                        name="logo"
                        onChange={handleAvatarChange}
                      />

                      <div className="main-avatar mx-auto">
                        <img
                          src={unions.logo}
                          className="img-fluid object-fit-cover object-position-center w-100 h-100"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="col-lg-9">
                    <div className="mb-4">
                      <label className="form-label">Union Name</label>
                      <input
                        type="text"
                        className="form-control form-control-height"
                        value={unions.name}
                        name="name"
                        onChange={onHandleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">
                        Union Acronym (if applicable)
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-height"
                        name="acronym"
                        value={unions.acronym}
                        onChange={onHandleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Industry</label>
                      <input
                        type="text"
                        className="form-control form-control-height"
                        value={unions.industry}
                        onChange={onHandleChange}
                        name="industry"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Headquarters</label>
                      <input
                        type="email"
                        className="form-control form-control-height"
                        value={unions.headquarters}
                        onChange={onHandleChange}
                        name="headquarters"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Phone number</label>
                      <input
                        type="text"
                        className="form-control form-control-height"
                        value={unions.phone}
                        onChange={onHandleChange}
                        name="phone"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">About </label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={unions.about}
                        onChange={onHandleChange}
                        name="about"
                      >
                        Nigeria Union of Journalists (NUJ) is a network of media
                        professionals established to advance the safety and
                        welfare of Nigerian journalists. It is an independent
                        trade organization with no political leaning or
                        ideological disposition. NUJ is founded in the
                        underlying belief that speaking with one voice
                      </textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Founded in</label>
                      <input
                        type="text"
                        className="form-control form-control-height"
                        value={unions.founded_in}
                        onChange={onHandleChange}
                        name="founded_in"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="inviteModal"
        tabIndex="-1"
        aria-labelledby="inviteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-lg-4 border-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Send invites</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row my-4">
                <div className="col-lg-7">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <img
                        src="/images/search.svg"
                        className="img-fluid"
                        alt="search"
                      />
                    </span>
                    <input
                      type="search"
                      className="form-control border-start-0 form-control-height"
                      placeholder="Type an email to send an invite"
                      name="email"
                      onChange={onHandleChangeUser}
                    />
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="d-flex align-items-center justify-content-between gap-15">
                    <select
                      className="form-control form-control-height w-50"
                      name="role"
                      onChange={onHandleChangeUser}
                      defaultValue=""
                    >
                      <option value="" hidden>
                        Select role
                      </option>
                      {roles.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                    </select>

                    <a
                      href=""
                      className="btn btn-size btn-main-primary"
                      onClick={(e) =>
                        handleSendInvite(
                          e,
                          id,

                          users,
                          setUsers
                        )
                      }
                    >
                      Send Invite
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-medium">Union Admins</p>

              <div className="row">
                <div className="col-lg-12">
                  <table className="table table-list">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date added</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">
                          <div className="d-flex avatar-holder">
                            <div className="position-relative">
                              <div className="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div className="ms-2 flex-grow-1">
                              <h5 className="mb-0">Salim Mustapha</h5>
                              <p className="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            className="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                className="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul className="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="disputes-details.php"
                                >
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td scope="row">
                          <div className="d-flex avatar-holder">
                            <div className="position-relative">
                              <div className="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div className="ms-2 flex-grow-1">
                              <h5 className="mb-0">Salim Mustapha</h5>
                              <p className="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            className="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                className="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul className="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="disputes-details.php"
                                >
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td scope="row">
                          <div className="d-flex avatar-holder">
                            <div className="position-relative">
                              <div className="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div className="ms-2 flex-grow-1">
                              <h5 className="mb-0">Salim Mustapha</h5>
                              <p className="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            className="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                className="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul className="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="disputes-details.php"
                                >
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td scope="row">
                          <div className="d-flex avatar-holder">
                            <div className="position-relative">
                              <div className="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  className="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div className="ms-2 flex-grow-1">
                              <h5 className="mb-0">Salim Mustapha</h5>
                              <p className="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            className="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                className="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul className="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="disputes-details.php"
                                >
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table table-list">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date added</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                  </table>
                  <div className="card no-admin-card rounded-0">
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <div className="text-center">
                        <h4 className="">No admins found</h4>

                        <p className="text-muted-3">
                          Enter an admins email and role to send invite
                        </p>

                        <div className="text-center">
                          <img
                            src="/images/no-found.svg"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <?php include "./components/javascript.inc.php"; ?> */}
    </>
  );
};

export default UnionDetails;
