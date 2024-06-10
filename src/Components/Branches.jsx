import React, { useState } from "react";
import MainNavbarInc from "../Bars/MainNavbarInc";
import TopBarInc from "../Bars/TopBarInc";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Branches = () => {
  const { id } = useParams();
  const user_avatar = "/images/unilag.svg";
  const [avatarImage, setAvatarImage] = useState(user_avatar);
  const [unions, setunions] = useState([]);
  const [branches, setbranches] = useState([]);
  const [branch, setBranch] = useState({
    union: id,
    name: "",
    acronym: "",
    industry: "",
    about: "",
    founded_in: "",
    logo: "",
  });

  useEffect(() => {
    fetchdata(id);
    fetchBranches(id);
  }, []);
  console.log(unions);

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

  const fetchBranches = async (id) => {
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
      setbranches(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const onHandleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
    console.log(branch);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const image = URL.createObjectURL(file);
    setAvatarImage(image);

    setBranch((prevFormData) => ({ ...prevFormData, logo: file }));
    console.log(formData, image, file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // Create FormData object

      // Append each field from the unions state to the FormData object
      Object.entries(branch).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const baseUrl = "https://phpstack-1245936-4460801.cloudwaysapps.com/dev";
      const response = await fetch(baseUrl + "/api/union/branch/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData, // Pass FormData object as the body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Branch has been created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div class="main-admin-container bg-light dark-mode-active">
        <div class="d-flex flex-column flex-lg-row h-lg-100">
          {/* <?php include "./components/main-navbar.inc.php"; ?> */}
          <MainNavbarInc />
          <div class="flex-lg-fill bg-white overflow-auto vstack vh-lg-100 position-relative">
            {/* <?php include "./components/top-bar.inc.php"; ?> */}
            <TopBarInc />
            <main class="admin-content">
              <div class="header-box py-5">
                <div class="container">
                  <h2>Branches</h2>
                </div>
              </div>

              <div class="content-main">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="margin-top-negative">
                        <ul
                          class="nav custom-tab nav-underline mb-3"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link active"
                              id="pills-folder-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-folder"
                              type="button"
                              role="tab"
                              aria-controls="pills-folder"
                              aria-selected="true"
                            >
                              Create
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link"
                              id="pills-document-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-document"
                              type="button"
                              role="tab"
                              aria-controls="pills-document"
                              aria-selected="false"
                            >
                              My Branches
                            </button>
                          </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                          <div
                            class="tab-pane fade show active"
                            id="pills-folder"
                            role="tabpanel"
                            aria-labelledby="pills-folder-tab"
                            tabindex="0"
                          >
                            <div class="row my-4">
                              <div class="col-lg-3">
                                <div
                                  class="nav flex-column tab-item nav-pills gap-10"
                                  id="v-pills-tab"
                                  role="tablist"
                                  aria-orientation="vertical"
                                >
                                  <button
                                    class="nav-link tab-v text-start active"
                                    id="v-pills-bulk-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-bulk"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-bulk"
                                    aria-selected="true"
                                  >
                                    Bulk Branch upload
                                  </button>

                                  <button
                                    class="nav-link tab-v text-start"
                                    id="v-pills-single-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-single"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-single"
                                    aria-selected="false"
                                  >
                                    Single Branch upload
                                  </button>
                                </div>
                              </div>

                              <div class="col-lg-9">
                                <div
                                  class="tab-content"
                                  id="v-pills-tabContent"
                                >
                                  <div
                                    class="tab-pane fade show active"
                                    id="v-pills-bulk"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-bulk-tab"
                                    tabindex="0"
                                  >
                                    <div class="card mb-4">
                                      <div class="card-header p-4 heading-card bg-white d-flex align-items-center justify-content-between flex-wrap">
                                        <h3 class="mb-lg-0 mb-3">
                                          Bulk Invites
                                        </h3>
                                      </div>
                                      <div class="card-body p-4">
                                        <div class="row mb-4">
                                          <div class="col-lg-5 mb-lg-0 mb-3">
                                            <h6 class="step-text">Step 1.</h6>
                                            <p class="text-muted-3">
                                              Download the CSV template for any
                                              user type or settlement bodies
                                            </p>
                                          </div>
                                          <div class="col-lg-5 offset-lg-2">
                                            <button class="btn btn-main-outline-primary btn-size">
                                              Download CSV template
                                            </button>
                                          </div>
                                        </div>

                                        <div class="row mb-4">
                                          <div class="col-lg-5 mb-lg-0 mb-3">
                                            <h6 class="step-text">Step 2.</h6>
                                            <p class="text-muted-3">
                                              Fill in the users details into the
                                              CSV file
                                            </p>
                                          </div>
                                          <div class="col-lg-5 offset-lg-2">
                                            <img
                                              src="/images/csv.png"
                                              class="img-fluid"
                                            />
                                          </div>
                                        </div>

                                        <div class="row mb-4">
                                          <div class="col-lg-5 mb-lg-0 mb-3">
                                            <h6 class="step-text">Step 3.</h6>
                                            <p class="text-muted-3">
                                              Upload the filled CSV file
                                            </p>
                                          </div>
                                          <div class="col-lg-5 offset-lg-2">
                                            <div class="upload-box text-center px-3 py-4">
                                              <div class="text-center mb-2">
                                                <img
                                                  src="/images/file_upload_states.svg"
                                                  class="img-fluid"
                                                />
                                              </div>
                                              <p class="text-muted-3 mb-1">
                                                Drag and drop to upload
                                              </p>
                                              <p class="font-sm text-muted">
                                                CSV (max. 50mb)
                                              </p>

                                              <img
                                                src="/images/or-line.svg"
                                                class="img-fluid"
                                              />

                                              <div class="mt-3">
                                                <button class="btn btn-main-primary btn-size mx-auto">
                                                  <i class="bi bi-upload me-2"></i>{" "}
                                                  Upload filled CSV
                                                </button>
                                              </div>
                                            </div>
                                            <div class="upload-box upload-box-success text-center px-3 py-4">
                                              <div class="text-center mb-2">
                                                <img
                                                  src="/images/uploaded.svg"
                                                  class="img-fluid"
                                                />
                                              </div>
                                              <p class="text-dark text-medium mb-1">
                                                Ministry Admins
                                              </p>
                                              <p class="font-sm text-muted">
                                                CSV 2.63mb
                                              </p>

                                              <p class="text-medium">
                                                <a
                                                  href="#"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#previewModal"
                                                  class="text-decoration-none text-main-primary"
                                                >
                                                  <img
                                                    src="/images/eyes.svg"
                                                    class="img-fluid"
                                                  />{" "}
                                                  Preview Sent Invites
                                                </a>
                                              </p>

                                              <p class="text-medium">
                                                <a
                                                  href="#"
                                                  class="text-decoration-none text-muted-3"
                                                >
                                                  <img
                                                    src="/images/trash-bin.svg"
                                                    class="img-fluid"
                                                  />{" "}
                                                  Clear Upload
                                                </a>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="tab-pane fade"
                                    id="v-pills-single"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-single-tab"
                                    tabindex="0"
                                  >
                                    <div class="card mb-4">
                                      <div class="card-header p-4 heading-card bg-white d-flex align-items-center justify-content-between flex-wrap">
                                        <h3 class="mb-lg-0 mb-3">
                                          Single Branch upload
                                        </h3>

                                        <a
                                          href=""
                                          class="btn btn-size btn-main-primary"
                                          onClick={handleSubmit}
                                        >
                                          Save
                                        </a>
                                      </div>
                                      <div class="card-body p-4">
                                        <form>
                                          <div class="row mt-4">
                                            <div class="col-lg-12">
                                              <div class="mb-4">
                                                <label class="form-label">
                                                  Union name
                                                </label>
                                                <input
                                                  type="text"
                                                  class="form-control form-control-height"
                                                  name="union"
                                                  key={unions._id}
                                                  value={unions.name}
                                                  disabled
                                                />
                                              </div>
                                              <div class="mb-4">
                                                <label class="form-label">
                                                  Branch name
                                                </label>
                                                <input
                                                  type="text"
                                                  class="form-control form-control-height"
                                                  placeholder="Enter branch name"
                                                  name="name"
                                                  onChange={onHandleChange}
                                                />
                                              </div>
                                              <div class="mb-4">
                                                <label class="form-label d-block">
                                                  Branch display picture
                                                </label>
                                                <label
                                                  for="profile"
                                                  class="position-relative"
                                                >
                                                  <input
                                                    type="file"
                                                    id="profile"
                                                    style={{ display: "none" }}
                                                    onChange={
                                                      handleAvatarChange
                                                    }
                                                    name="logo"
                                                  />

                                                  <div class="main-avatar mx-auto">
                                                    <img
                                                      src={avatarImage}
                                                      class="img-fluid object-fit-cover object-position-center w-100 h-100"
                                                    />
                                                  </div>

                                                  <img
                                                    src="/images/close-x.svg"
                                                    class="img-fluid remove-profile cursor-pointer"
                                                  />
                                                </label>
                                              </div>
                                              <div class="mb-4">
                                                <label class="form-label">
                                                  Union Acronym (if applicable)
                                                </label>
                                                <input
                                                  type="text"
                                                  class="form-control form-control-height"
                                                  placeholder="Enter branch location"
                                                  name="acronym"
                                                  onChange={onHandleChange}
                                                />
                                              </div>

                                              <div class="mb-4">
                                                <label class="form-label">
                                                  Founded in
                                                </label>
                                                <input
                                                  type="text"
                                                  class="form-control form-control-height"
                                                  placeholder="Enter branch phone numbers"
                                                  name="founded_in"
                                                  onChange={onHandleChange}
                                                />
                                              </div>

                                              <div class="mb-4">
                                                <label class="form-label">
                                                  Industry
                                                </label>
                                                <input
                                                  type="text"
                                                  class="form-control form-control-height"
                                                  placeholder=""
                                                  name="industry"
                                                  y
                                                  onChange={onHandleChange}
                                                />
                                              </div>

                                              <div className="mb-4">
                                                <label className="form-label">
                                                  Headquarters
                                                </label>
                                                <input
                                                  type="text"
                                                  className="form-control form-control-height"
                                                  placeholder=""
                                                  name="headquarters"
                                                  onChange={onHandleChange}
                                                />
                                              </div>

                                              <div className="mb-4">
                                                <label className="form-label">
                                                  Phone
                                                </label>
                                                <input
                                                  type="text"
                                                  className="form-control form-control-height"
                                                  placeholder=""
                                                  name="phone"
                                                  onChange={onHandleChange}
                                                />
                                              </div>

                                              <div class="mb-4">
                                                <label class="form-label">
                                                  About
                                                </label>
                                                <textarea
                                                  class="form-control"
                                                  rows="4"
                                                  name="about"
                                                  onChange={onHandleChange}
                                                ></textarea>
                                              </div>

                                              <div class="mb-4">
                                                <div class="d-flex justify-content-between align-items-center">
                                                  <label class="form-label">
                                                    Unions Admins
                                                  </label>
                                                  <a
                                                    href="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#inviteModal"
                                                    class="text-main-primary text-medium text-decoration-none"
                                                  >
                                                    Add Admin{" "}
                                                    <i class="bi bi-plus"></i>
                                                  </a>
                                                </div>

                                                <table class="table table-list">
                                                  <thead class="table-light">
                                                    <tr>
                                                      <th scope="col">Name</th>
                                                      <th scope="col">
                                                        Joined
                                                      </th>
                                                      <th scope="col">Role</th>
                                                      <th scope="col"></th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td scope="row">
                                                        <div class="d-flex avatar-holder">
                                                          <div class="position-relative">
                                                            <div class="avatar-sm flex-shrink-0">
                                                              <img
                                                                src="/images/avatar-2.svg"
                                                                class="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                                alt="Avatar"
                                                              />
                                                            </div>
                                                          </div>
                                                          <div class="ms-2 flex-grow-1">
                                                            <h5 class="mb-0">
                                                              Salim Mustapha
                                                            </h5>
                                                            <p class="mb-0 text-muted-3">
                                                              salimmusty@gmail.com
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td>Feb 4 2023</td>
                                                      <td>
                                                        <img
                                                          src="/images/claimant.svg"
                                                          class="img-fluid"
                                                          alt="claimant"
                                                        />
                                                      </td>

                                                      <td>
                                                        <button
                                                          class="btn btn-size btn-outline-light text-medium no-caret"
                                                          type="button"
                                                          data-bs-toggle="modal"
                                                          data-bs-target="#removeModal"
                                                        >
                                                          <img
                                                            src="/images/bin_2.svg"
                                                            class="img-fluid"
                                                            alt="dot-v"
                                                          />
                                                        </button>
                                                      </td>
                                                    </tr>

                                                    <tr>
                                                      <td scope="row">
                                                        <div class="d-flex avatar-holder">
                                                          <div class="position-relative">
                                                            <div class="avatar-sm flex-shrink-0">
                                                              <img
                                                                src="/images/avatar-2.svg"
                                                                class="img-fluid object-position-center object-fit-cover w-100 h-100"
                                                                alt="Avatar"
                                                              />
                                                            </div>
                                                          </div>
                                                          <div class="ms-2 flex-grow-1">
                                                            <h5 class="mb-0">
                                                              Salim Mustapha
                                                            </h5>
                                                            <p class="mb-0 text-muted-3">
                                                              salimmusty@gmail.com
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td>Feb 4 2023</td>
                                                      <td>
                                                        <img
                                                          src="/images/claimant.svg"
                                                          class="img-fluid"
                                                          alt="claimant"
                                                        />
                                                      </td>

                                                      <td>
                                                        <button
                                                          class="btn btn-size btn-outline-light text-medium no-caret"
                                                          type="button"
                                                          data-bs-toggle="modal"
                                                          data-bs-target="#removeModal"
                                                        >
                                                          <img
                                                            src="/images/bin_2.svg"
                                                            class="img-fluid"
                                                            alt="dot-v"
                                                          />
                                                        </button>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="tab-pane fade"
                            id="pills-document"
                            role="tabpanel"
                            aria-labelledby="pills-document-tab"
                            tabindex="0"
                          >
                            <div class="row my-4">
                              <div class="col-lg-5">
                                <div class="input-group">
                                  <span class="input-group-text bg-transparent">
                                    <img
                                      src="/images/search.svg"
                                      class="img-fluid"
                                      alt="search"
                                    />
                                  </span>
                                  <input
                                    type="search"
                                    class="form-control border-start-0 form-control-height"
                                    placeholder="Search here..."
                                  />
                                </div>
                              </div>

                              <div class="col-lg-7">
                                <div class="d-flex align-items-center justify-content-between gap-15">
                                  <div class="d-flex">
                                    <a class="btn btn-size btn-outline-light text-medium px-3 me-lg-3">
                                      <img
                                        src="/images/filter.svg"
                                        class="img-fluid"
                                      />{" "}
                                      A-Z
                                    </a>

                                    <button class="btn btn-size btn-main-outline-primary px-3">
                                      <i class="bi bi-cloud-download me-2"></i>{" "}
                                      Export CSV
                                    </button>
                                  </div>

                                  <p class="text-end mb-0 file-count">
                                    Unions: 64
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="row">
                              <div class="col-lg-12">
                                <table class="table table-list">
                                  <thead class="table-light">
                                    <tr>
                                      <th scope="col">
                                        <div>
                                          <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="checkboxNoLabel"
                                            value=""
                                            aria-label="..."
                                          />
                                        </div>
                                      </th>
                                      <th scope="col">Unions</th>
                                      <th scope="col">Assigned Admin</th>
                                      <th scope="col">Industry</th>
                                      <th scope="col">Date added</th>
                                      <th scope="col">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {branches.map((item) => (
                                      <tr>
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
                                            key={item._id}
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
                                                    {item.name}
                                                    <span className="text-muted-3">
                                                      ({item.acronym})
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

                                        <td>{item.industry}</td>
                                        <td>{item.date_added}</td>

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
                                              // onClick={onUniones3}
                                            >
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href=""
                                                >
                                                  View Details
                                                </a>
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
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <footer>
              <div class="container">
                <div class="row">
                  <div class="col-lg-12"></div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="inviteModal"
        tabindex="-1"
        aria-labelledby="inviteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content p-lg-4 border-0">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Send invites</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row my-4">
                <div class="col-lg-7">
                  <div class="input-group">
                    <span class="input-group-text bg-transparent">
                      <img
                        src="/images/search.svg"
                        class="img-fluid"
                        alt="search"
                      />
                    </span>
                    <input
                      type="search"
                      class="form-control border-start-0 form-control-height"
                      placeholder="Type an email to send an invite"
                    />
                  </div>
                </div>

                <div class="col-lg-5">
                  <div class="d-flex align-items-center justify-content-between gap-15">
                    <select class="form-control form-control-height w-50">
                      <option selected hidden>
                        Select role
                      </option>
                      <option>Claimants</option>
                      <option>Respondents</option>
                      <option>Minsitry Admin</option>
                      <option>National Union Admin</option>
                      <option>Union Branch Admin</option>
                      <option>Employers (Companies & Organizations) </option>
                      <option>Staff (Union Members) </option>
                      <option>Conciliators & Arbitrators</option>
                      <option>Mediators</option>
                      <option>Industrial Arbitration Panel (Tribunal)</option>
                      <option>Board of Enquiry</option>
                      <option>National Industrial Courts</option>
                    </select>

                    <a href="#" class="btn btn-size btn-main-primary" disabled>
                      Send Invite
                    </a>
                  </div>
                </div>
              </div>

              <p class="text-medium">Union Admins</p>

              <div class="row">
                <div class="col-lg-12">
                  <table class="table table-list">
                    <thead class="table-light">
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
                          <div class="d-flex avatar-holder">
                            <div class="position-relative">
                              <div class="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  class="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div class="ms-2 flex-grow-1">
                              <h5 class="mb-0">Salim Mustapha</h5>
                              <p class="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            class="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                class="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul class="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a class="dropdown-item" href="disputesDetails">
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td scope="row">
                          <div class="d-flex avatar-holder">
                            <div class="position-relative">
                              <div class="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  class="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div class="ms-2 flex-grow-1">
                              <h5 class="mb-0">Salim Mustapha</h5>
                              <p class="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            class="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                class="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul class="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a class="dropdown-item" href="disputesDetails">
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td scope="row">
                          <div class="d-flex avatar-holder">
                            <div class="position-relative">
                              <div class="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  class="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div class="ms-2 flex-grow-1">
                              <h5 class="mb-0">Salim Mustapha</h5>
                              <p class="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            class="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                class="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul class="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a class="dropdown-item" href="disputesDetails">
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td scope="row">
                          <div class="d-flex avatar-holder">
                            <div class="position-relative">
                              <div class="avatar-sm flex-shrink-0">
                                <img
                                  src="/images/avatar-2.svg"
                                  class="img-fluid object-position-center object-fit-cover w-100 h-100"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div class="ms-2 flex-grow-1">
                              <h5 class="mb-0">Salim Mustapha</h5>
                              <p class="mb-0 text-muted-3">
                                salimmusty@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Feb 4 2023</td>
                        <td>
                          <img
                            src="/images/claimant.svg"
                            class="img-fluid"
                            alt="claimant"
                          />
                        </td>

                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-size btn-outline-light text-medium dropdown-toggle no-caret"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src="/images/bin.svg"
                                class="img-fluid"
                                alt="bin"
                              />
                            </button>
                            <ul class="dropdown-menu border-radius action-menu-2">
                              <li>
                                <a class="dropdown-item" href="disputesDetails">
                                  View details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table table-list">
                    <thead class="table-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date added</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                  </table>
                  <div class="card no-admin-card rounded-0">
                    <div class="card-body d-flex align-items-center justify-content-center">
                      <div class="text-center">
                        <h4 class="">No admins found</h4>

                        <p class="text-muted-3">
                          Enter an admins email and role to send invite
                        </p>

                        <div class="text-center">
                          <img src="/images/no-found.svg" class="img-fluid" />
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

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="removeModal"
        tabindex="-1"
        aria-labelledby="removeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 p-lg-4 p-3">
            <div class="text-end">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="text-center">
                <img
                  src="/images/delete-icon.svg"
                  class="img-fluid mb-3"
                  alt="delete an account"
                />
              </div>
              <h1 class="heading modal-heading text-center mb-3">
                Are you sure you want send an invite to
              </h1>
              <p class="mb-4 modal-text text-center">
                jamesomogiafo@gmail.com{" "}
                <span class="text-bold text-darken">
                  as Union Branch Admin for
                </span>{" "}
                University of Lagos{" "}
              </p>

              <button class="btn btn-size btn-main-danger w-100">
                Yes, Remove Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="previewModal"
        tabindex="-1"
        aria-labelledby="previewModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content p-lg-4 border-0">
            <div class="modal-header">
              <div>
                <h1 class="modal-title mb-1 fs-5">Preview Uploaded Unions</h1>
                <p class="text-muted-3">Unions: 43</p>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table class="table table-list">
                <thead class="table-light">
                  <tr>
                    <th scope="col">
                      <div>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value=""
                          aria-label="..."
                        />
                      </div>
                    </th>
                    <th scope="col">Unions</th>
                    <th scope="col">Industry</th>
                    <th scope="col">Date added</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value=""
                          aria-label="..."
                        />
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center avatar-holder">
                        <div class="position-relative">
                          <div class="avatar-sm flex-shrink-0">
                            <img
                              src="/images/ipman.svg"
                              class="img-fluid object-position-center object-fit-cover w-100 h-100"
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div class="ms-2 text-muted-3">
                          <p class="text-darken mb-0">
                            Nigeria Union of Petroleum and Natural Gas Workers
                          </p>
                          <span class="text-muted-3">(NUPENG)</span>
                        </div>
                      </div>
                    </td>
                    <td>Oil & Gas</td>
                    <td>Feb 4 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer d-flex justify-content-between align-items-center">
              <p class="mb-0 text-muted">Page 1 of 30</p>

              <nav aria-label="...">
                <ul class="pagination pager mb-0">
                  <li class="page-item active" aria-current="page">
                    <span class="page-link">1</span>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                </ul>
              </nav>

              <div class="d-flex align-items-center gap-10">
                <button class="btn btn-outline-light text-medium">
                  <img src="/images/prev.svg" class="img-fluid" /> Previous
                </button>
                <button class="btn btn-outline-light text-medium">
                  Next <img src="/images/next.svg" class="img-fluid" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Branches;
