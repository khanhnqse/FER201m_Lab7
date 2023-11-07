import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwtDecode(response.credential);
    setUser(decoded);
    document.getElementById("buttonDiv").hidden = true;
    navigate("/home?name=" + encodeURIComponent(decoded.name)); // Chuyển hướng đồng thời truyền tên người dùng qua URL
  };

  const handleLogOut = (e) => {
    setUser({});
    document.getElementById("buttonDiv").hidden = false;
  };

  useEffect(() => {
    // Khởi tạo Google One Tap trong useEffect
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1067055439775-6ik9bjg9a9lc6inia4sde1ddvv8v34sh.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();

    // Xóa khởi tạo khi component bị unmount để tránh lỗi
    return () => {
      google.accounts.id.cancel();
    };
  }, []);

  return (
    <div className="login-page">
      <>
        <h1 className="login-title">Login</h1>
        <p className="login-para">
          Click the button below to login with your Google account
        </p>
        <div id="buttonDiv"></div>
        {Object.keys(user).length !== 0 && (
          <button onClick={handleLogOut}>logout</button>
        )}
        {user && (
          <div>
            <h5>{user.name}</h5>
          </div>
        )}
      </>
    </div>
  );
}
