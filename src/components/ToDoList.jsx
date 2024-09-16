import React, { useState, useEffect } from "react";
import "./ToDoList.css"; // Nhập tệp CSS nếu cần
function ToDoList() {
  const [listJob, setListJob] = useState(() => {
    // Lấy danh sách công việc từ localStorage và chuyển đổi từ JSON
    const jobLocal = JSON.parse(localStorage.getItem("jobs")) || [];
    return jobLocal;
  });
  // State để lưu tên công việc mới
  const [jobName, setJobName] = useState("");
  // State để hiển thị thông báo lỗi
  const [isShowError, setShowError] = useState(false);
  // State để theo dõi công việc đang được chỉnh sửa
  const [editJob, setEditJob] = useState(null);

  // console.log(listJob);

  // Hook useEffect để lưu trữ danh sách công việc vào localStorage mỗi khi listJob thay đổi
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(listJob));
  }, [listJob]);

  /**
   * lay gia tri tu ham input
   * @param {*} e thong tin tu su kien
   * Auth : nguyen vien(2024/9/12)
   */

  const handleChange = (e) => {
    const { value } = e.target; //Dùng destructuring để lấy thuộc tính value từ đối tượng e.target.
    // const value = e.target là phần tử DOM
    // console.log(value);
    // cap nhat lai gia tri cho stace
    setJobName(value);
    validateDate(value);
  };
  /**
   * validation du lieu dau vao
   * @param {*} value du lieu can kiem tra
   * @returns True : khi khong co loi, false : khi co loi
   * Auth : nguyen vien(2024/9/12)
   */

  const validateDate = (value) => {
    let isValid = true;
    if (!value) {
      setShowError(true);
      isValid = false;
    } else {
      setShowError(false);
    }
    return isValid;
  };

  const handleAddJob = () => {
    // validate du lieu dau vao
    const isValid = validateDate(jobName);
    if (isValid) {
      //submit form
      // create a new job
      const jobInfo = {
        id: Math.ceil(Math.random() * 1000000),
        name: jobName,
        status: false,
      };
      setListJob((prevListJob) => [...prevListJob, jobInfo]);
      // clear gia tri trong o input
      setJobName("");
      setEditJob(null); // Đặt lại trạng thái chỉnh sửa khi thêm công việc mới
    }
  };

  //delete a job from

  const handleDeleteJob = (id) => {
    const updatedList = listJob.filter((job) => job.id !== id);
    setListJob(updatedList);
  };

  // Hàm bắt đầu chỉnh sửa công việc
  const handleEditJob = (job) => {
    setJobName(job.name);
    setEditJob(job);
  };

  //update a job
  const handleUpdateJob = () => {
    const isValid = validateDate(jobName);
    if (isValid && editJob) {
      const updatedList = listJob.map((job) =>
        job.id === editJob.id ? { ...job, name: jobName } : job
      );
      setListJob(updatedList);
      setJobName("");
      setEditJob(null); // Đặt lại trạng thái chỉnh sửa khi cập nhật xong
    }
  };
  const handleUpdateStatus = (id) => {
    const updatedList = listJob.map((job) =>
      job.id === id ? { ...job, status: !job.status } : job
    );
    setListJob(updatedList);
  };
  return (
    <div className="todo-list-container">
      <div className="input-container">
        <input
          name="jobName"
          value={jobName}
          onChange={handleChange}
          type="text"
        />
        <button
          type="button"
          onClick={editJob ? handleUpdateJob : handleAddJob}
          disabled={!jobName.trim()}
          className="btn"
        >
          {editJob ? "更新" : "付け加える"}
        </button>
      </div>
      {isShowError && (
        <p className="error-message">空欄に内容を入力してください。</p>
      )}
      <ul className="job-list">
        {listJob.map((item) => (
          <li
            key={item.id}
            className={`job-item ${item.status ? "completed" : ""}`}
          >
            <label class="checkbox-btn">
              <label for="checkbox"></label>
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => handleUpdateStatus(item.id)}
              />
              <span class="checkmark"></span>
            </label>
            <div className="content">
              <div className="text">{item.name}</div>
              <div className="button">
                <button
                  className="btn style"
                  type="button"
                  onClick={() => handleEditJob(item)}
                >
                  <i class="bx bxs-edit"></i>
                </button>
                <button
                  className="btn style"
                  type="button"
                  onClick={() => handleDeleteJob(item.id)}
                >
                  <i class="bx bx-trash"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
