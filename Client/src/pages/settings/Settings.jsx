

import "./settings.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../ReduxToolkit/action";
import { deleteUser, uploadImage } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../ReduxToolkit/userSlice";
import UserPost from '../../components/userPost/UserPost'

export default function Settings() {
  const { user, isFetching, Error } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({
    username: user?.tokenObject?.username,
    email: user?.tokenObject?.email,
    password: "",
    file: null,
  });

  const [userPost , setUserPost]= useState(true);
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const userId = user?.tokenObject?.id;
  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const PF = "https://second-server-eosin.vercel.app/images/";

  const error = useSelector((state) => state.user.error);

  console.log(error, "error");

  const cancelOperation = () => {
    setShowConfirmation(false);
  };

  const conformDeleteAccount = async () => {
    try {
      setShowConfirmation(false);

      const res = await deleteUser(
        userId,
        user?.tokenObject?.username,
        user?.token
      );
      localStorage.clear();

      if (res.id === userId) {
        dispatch(logout());
        Navigate("/");
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  console.log(
    user?.tokenObject?.auth === "google Auth",
    "Auth"
  );
  console.log(
    user?.tokenObject?.profilePic?.startsWith(
      "https://lh3.googleusercontent.com/"
    ),
    "starts with link"
  );
  console.log(user?.tokenObject?.profilePic, "link form settings");

  function handleClicks() {
    setShowConfirmation(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, file } = userDetails;

    const updatedUser = {
      userId: user.tokenObject?.id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      uploadImage(data, user?.token);
    }

    try {
      console.log(user.tokenObject?.id, "user id ");
      dispatch(userUpdate(updatedUser, user.tokenObject?.id, user?.token));
    } catch (error) {
      console.log("user cannot be updated", error);
    }

    console.log(file, "file");
  };

  return (
    <div>
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle" onClick={handleSubmit}>
            Update Your Account
          </span>
          <span
            className="settingsDeleteTitle"
            onClick={(e) => handleClicks()}
          >
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <div>
              {user?.tokenObject?.auth &&
              user?.tokenObject?.profilePic?.startsWith(
                "https://lh3.googleusercontent.com/"
              ) ? (
                <img
                  className="user"
                  src={
                    !open
                      ? user?.tokenObject?.profilePic === ""
                        ? `/images/user.png`
                        : user?.tokenObject?.profilePic
                      : !userDetails?.file
                      ? user?.tokenObject?.profilePic
                      : URL.createObjectURL(userDetails?.file)
                  }
                  alt=""
                />
              ) : (
                <img
                  className="user"
                  src={
                    !open
                      ? user?.tokenObject?.profilePic === ""
                        ? `/images/user.png`
                        : PF + user?.tokenObject?.profilePic
                      : !userDetails?.file
                      ? PF + user?.tokenObject?.profilePic
                      : URL.createObjectURL(userDetails?.file)
                  }
                  alt=""
                />
              )}
            </div>
            <label htmlFor="fileInput">
              <i
                className="settingsPPIcon far fa-user-circle"
                onClick={(e) => setOpen(true)}
              ></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) =>
                setUserDetails({ ...userDetails, file: e.target.files[0] })
              }
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user?.username}
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {showConfirmation && (
            <div className="conformContainer">
              <div className="subContainer">
                <span className="rightCross" onClick={cancelOperation}>
                  ❌
                </span>
                <p className="popUp">
                  Are you sure you want to Delete Your Account
                </p>
                <button onClick={conformDeleteAccount}>Yes</button>
                <button
                  onClick={cancelOperation}
                  style={{ marginLeft: "15px" }}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
<div className="user-post">
  <UserPost  />
</div>
 </div>
  );
}
