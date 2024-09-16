import React, { useState } from "react";

function UserStateDemo() {
  const [userInfo, setUserInfo] = useState({
    // userName: "",
    // email: "",
    // password: "",
    // co the khong can dung cai nay, trong cac o input no da duoc khai bao
  });
  const [userList, setUserList] = useState([]); // State để lưu trữ danh sách người dùng
  console.log("userInfo: ", userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm người dùng vào danh sách
    setUserList([...userList, userInfo]);
    // Làm trống form sau khi thêm người dùng
    setUserInfo({
      // userName: "",
      // email: "",
      // password: "",
    });
    console.log("Submit", userInfo);
  };

  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;

    // cap nhat state userInfo
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="userName"
          onChange={handleChange}
          value={userInfo.userName}
          type="text"
          placeholder="enter name"
        />
        <input
          name="email"
          onChange={handleChange}
          value={userInfo.email}
          type="text"
          placeholder="Enter email"
        />
        <input
          name="password"
          onChange={handleChange}
          value={userInfo.password}
          type="password"
          placeholder="Enter password"
        />
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
      <h2>list user</h2>
      <ul>
        {userList.map((user, index) => (
          <li key={index}>
            <strong>Name:</strong> {user.userName} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Password:</strong> {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserStateDemo;
