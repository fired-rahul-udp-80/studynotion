import React, { useState } from "react"
import { HiArrowNarrowRight } from "react-icons/hi"
import { HomePageExplore } from "../../../data/homepage-explore"
import CourseCard from "./CourseCard"
import HighlightText from "./HighlightText"

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
]

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  )

  const setMyCards = (value) => {
    setCurrentTab(value)
    const result = HomePageExplore.find((course) => course.tag === value)
    setCourses(result.courses)
    setCurrentCard(result.courses[0].heading)
  }

  const selectedCourse = courses.find(
    (course) => course.heading === currentCard
  )

  return (
    <section className="explore-more">
      {/* Explore more section */}
      <div className="explore-more__intro">
        <p className="explore-more__eyebrow">A guided library</p>
        <div className="text-center text-4xl font-semibold">
          Unlock the <HighlightText text={"Power of Code"} />
          <p className="mt-3 text-center text-lg font-semibold text-richblack-300">
            Learn to build anything you can imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="explore-more__tabs" role="tablist" aria-label="Course paths">
        {tabsName.map((tab, index) => (
          <button
            className={`explore-more__tab ${currentTab === tab ? "is-active" : ""}`}
            key={tab}
            type="button"
            role="tab"
            aria-selected={currentTab === tab}
            onClick={() => setMyCards(tab)}
          >
            <span className="explore-more__tab-number">0{index + 1}</span>
            {tab}
          </button>
        ))}
      </div>

      <div className="explore-more__selection">
        <span>Currently exploring</span>
        <strong>{currentTab}</strong>
        <span className="explore-more__selection-line" />
        <span>{courses.length} lessons to begin</span>
      </div>

      {/* Cards Group */}
      <div className="explore-more__cards">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={`${currentTab}-${ele.heading}`}
              cardData={ele}
              index={index}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>

      {selectedCourse && (
        <div className="explore-more__detail">
          <span className="explore-more__detail-kicker">Selected course</span>
          <strong>{selectedCourse.heading}</strong>
          <span>{selectedCourse.description}</span>
          <HiArrowNarrowRight aria-hidden="true" />
        </div>
      )}
    </section>
  );
};

export default ExploreMore;
