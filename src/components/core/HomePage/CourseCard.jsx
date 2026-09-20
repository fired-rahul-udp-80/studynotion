import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard, index }) => {
  return (
    <div
      className={`explore-course-card ${
        currentCard === cardData?.heading
          ? "is-selected"
          : ""
      }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="explore-course-card__topline">
        <span>0{index + 1}</span>
        <span>{currentCard === cardData?.heading ? "In focus" : "Explore"}</span>
      </div>
      <div className="explore-course-card__body">
        <h3>{cardData?.heading}</h3>

        <p>{cardData?.description}</p>
      </div>

      <div className="explore-course-card__footer">
        {/* Level */}
        <div>
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div>
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
