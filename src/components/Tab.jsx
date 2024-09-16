import React, { useState } from "react";

export default function Tab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {
      id: 0,
      title: "trang chu",
    },
    {
      id: 1,
      title: "lo trinh",
    },
    {
      id: 2,
      title: "bai viet",
    },
  ];

  // KHI CLICK VAO NUT BUTTON SE LAY DUOC INDEX CUA BUTTON DAY VA CAP
  const handleActive = (index) => {
    // console.log(index);
    setActiveIndex(index);
  };
  return (
    <div>
      <ul>
        {tabs.map((tab) => {
          return (
            <div key={tab.id} className="container">
              <button
                onClick={() => handleActive(tab.id)}
                className={`${activeIndex === tab.id ? "active" : ""}`}
              >
                {tab.title}
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
