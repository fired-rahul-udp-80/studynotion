
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 mb-16 py-12 md:flex-row md:gap-y-0 md:gap-x-12  ">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
          <div className="absolute  -bottom-14 left-0 text-richblack-5 bg-richblack-700 px-4 py-2 rounded-md overflow-x-scroll  ">
            <h1 className="text-md">Demo Email Id For Login</h1>
            <div className="text-richblack-100 text-sm">
              <span className="text-richblack-100">Email:</span> rohan@gmail.com (student){" "} 
              <span className="text-richblack-100">Password:</span>{" "}123456
            </div>
            <div className="text-richblack-100 text-sm">
              <span className="text-richblack-100">Email:</span> govind@gmail.com (Instructor){" "} 
              <span className="text-richblack-100">Password:</span>{" "}123456
            </div>  
          </div>

        </div>

        

      )}
    </div>
  )
}

export default Template
