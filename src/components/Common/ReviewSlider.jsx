import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="review-slider text-white">
      <div className="review-slider__viewport">
        <Swiper
          slidesPerView={1.15}
          spaceBetween={16}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2.15, spaceBetween: 18 },
            1024: { slidesPerView: 3.15, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 22 },
          }}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i} className="review-slider__slide">
                <article className="review-card">
                  <div className="review-card__topline">
                    <span className="review-card__quote" aria-hidden="true">
                      “
                    </span>
                    <span className="review-card__index">0{i + 1}</span>
                  </div>
                  <div className="review-card__author">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                      className="review-card__avatar"
                    />
                    <div>
                      <h3 className="review-card__name">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h3>
                      <p className="review-card__course">
                        {review?.course?.courseName}
                      </p>
                    </div>
                  </div>
                  <p className="review-card__copy">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="review-card__rating">
                    <strong>
                      {review.rating.toFixed(1)}
                    </strong>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#FFD60A"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </article>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
