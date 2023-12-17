import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const About = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            About Us
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="text-lg mb-12">
          Skoolio, a brand under the esteemed umbrella of Gyan Sindhu, was
          launched in 2023 as a comprehensive solution catering to all
          school-related needs. Rooted in a legacy dating back to the
          establishment of Gyan Sindhu in 1996 by Mr. Saurabh Kapoor, Skoolio
          proudly stands as a one-stop platform dedicated to simplifying school
          management and enriching the educational experience.
        </div>
        <div className="text-2xl font-extrabold mt-5">Our Vision</div>
        <div className="text-base mt-5">
          Empowering Education Through Comprehensive Solutions
        </div>
        <div className="text-2xl font-extrabold mt-5">Our Mission</div>
        <div className="text-base mt-5">
          At Gyan Sindhu, we are dedicated to being the trusted partner of
          schools and educational institutions. Our commitment involves
          delivering a diverse range of high- quality educational materials and
          services. Through our offerings, we aim to support the success of
          schools and the students they nurture, contributing to a brighter
          future for our society.
        </div>
        <ol className="px-5 mt-5">
          <li>
            1. <b>Diverse Book Supply:</b> We provide schools with an extensive
            selection of books from various publishers, ensuring access to the
            best resources for students in ICSE, CBSE, NCERT, & IGCSE
            curriculums.
          </li>
          <li>
            2. <b>Customised School Supplies:</b> Our services include
            personalized school notebook printing, almanac creation, e-brochure
            and magazine design, enabling schools to enhance their identity and
            brand value.
          </li>
          <li>
            3. <b>Efficient Exam Support:</b> Offering reliable and secure exam
            paper and answer-sheet printing services to assist schools in
            conducting exams seamlessly.
          </li>
          <li>
            4. <b>Recognising Achievements:</b> We specialize in manufacturing
            trophies, mementos, and medals, facilitating schools in celebrating
            and motivating students, fostering a culture of achievement.
          </li>
          <li>
            5. <b>School Stationery Supplies:</b> We provide a comprehensive
            range of stationary items to both school management and students.
          </li>
        </ol>
        <div className="text-base my-12">
          Skoolio is committed to supporting schools in their pursuit of
          excellence, simplifying administrative tasks, and enhancing the
          overall educational experience.
        </div>
      </Wrapper>
    </Layout>
  );
};

export default About;
