import "./css/styles.css";
import { Route, Routes } from "react-router-dom";
import CreateAccount from "./Components/CreateAccount";
import Index from "./Components/Index";
import Verification from "./Components/Verification";
import Verification2 from "./Components/Verification2";

import { createContext, useState } from "react";
import CreatePassword from "./Components/CreatePassword";
import ProfileSetup from "./Components/ProfileSetup";
import LoginPassword from "./Components/LoginPassword";
import ProfileSetup2 from "./Components/ProfileSetup2";
import VerificationSuccess from "./Components/VerificationSuccess";
import Dashboard from "./Components/Dashboard";
import PasswordSet2 from "./Components/PasswordSet2";
import Login from "./Components/Login";
import Recovery from "./Components/Recovery";
import TopBarInc from "./Bars/TopBarInc";
import Notifications from "./Components/Notifications";
import Unions from "./Components/Unions";
import UnionDetails from "./Components/UnionDetails";
import UnionBranches3 from "./Components/UnionBranches3";
import Settings from "./Components/Settings";
import Disputes from "./Components/Disputes";
import Disputes2 from "./Components/Disputes2";
import { Toaster } from "react-hot-toast";
import DisputesDetails from "./Components/DisputesDetails";
import Documents from "./Components/Documents";
import Documents2 from "./Components/Documents2";
import HelpSupport from "./Components/HelpSupport";
import Discussions from "./Components/Discussions";
import Reports from "./Components/Reports";
import Users from "./Components/Users";
import Branches from "./Components/Branches";
import SubBranch from "./Components/SubBranch";

export const AppContext = createContext();

const App = () => {
  const [verifyEmail, setVerifyEmail] = useState({
    email: "",
    code: "",
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState({
    email: "",
    password: "",
    auth_code: "",
  });
  const [passwordField, setPasswordField] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [profile, setProfile] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    display_picture: "",
    union: "",
    union_branch: "",
    organization: "",
  });
  const [recovery, setRecovery] = useState({
    email: "",
    phone: "",
  });
  const [unions, setUnions] = useState({
    name: "",
    acronym: "",
    industry: "",
    headquarters: "",
    phone: "",
    about: "",
    founded_in: "",
    logo: "",
  });
  const [disputes, setDisputes] = useState({
    title: "",
    type: "",
    summary: "",
    background_info: "",
    relief_sought: "",
    specific_claims: "",
    negotiation_terms: "",
    accused_party: "",
    initiating_party: "",
  });

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          profile,
          setProfile,
          verifyEmail,
          setVerifyEmail,
          passwordField,
          setPasswordField,
          recovery,
          setRecovery,
          unions,
          setUnions,
          twoFactorAuth,
          setTwoFactorAuth,
          disputes,
          setDisputes,
        }}
      >
        <Toaster />
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/CreatePassword" element={<CreatePassword />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/Verification2" element={<Verification2 />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="/" element={<Login />} />
          <Route path="/Recovery" element={<Recovery />} />
          <Route path="/ProfileSetup2" element={<ProfileSetup2 />} />
          <Route path="/PasswordSet2" element={<PasswordSet2 />} />
          <Route path="/LoginPassword" element={<LoginPassword />} />
          <Route
            path="/VerificationSuccess"
            element={<VerificationSuccess />}
          />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/TopBarInc" element={<TopBarInc />} />
          <Route path="/Unions" element={<Unions />} />
          <Route path="/UnionDetails" element={<UnionDetails />} />
          <Route path="/UnionDetails/:id" element={<UnionDetails />} />
          <Route path="/UnionBranches3" element={<UnionBranches3 />} />
          <Route path="/Disputes" element={<Disputes />} />
          <Route path="/Disputes2" element={<Disputes2 />} />
          <Route path="/Disputes2/:id" element={<Disputes2 />} />
          <Route path="/DisputesDetails" element={<DisputesDetails />} />
          <Route path="/DisputesDetails/:id" element={<DisputesDetails />} />
          <Route path="/Documents" element={<Documents />} />
          <Route path="/Documents2" element={<Documents2 />} />
          <Route path="/HelpSupport" element={<HelpSupport />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/Discussions" element={<Discussions />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Branches" element={<Branches />} />
          <Route path="/Branches/:id" element={<Branches />} />
          <Route path="/SubBranch/:id" element={<SubBranch />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
