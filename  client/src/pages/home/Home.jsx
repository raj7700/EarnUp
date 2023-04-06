import React from 'react'
import Featured from '../../component/featured/Featured';
import TrustedBy from '../../component/trustedBy/TrustedBy';
import Slide from '../../component/slides/Slides';
import { cards } from '../../data';
import CatCard from '../../component/catCard/CatCard';
import ProjectCard from '../../component/ProjectCard/ProjectCard';
import { projects } from "../../data";
import "./Home.scss"

 const Home = () => {
  
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A Whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every Budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every Budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every Budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every Budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>

          <div className="item">
            <video
              src="https://www.youtube.com/results?search_query=freelance+intro"
              alt=""
              controls
            ></video>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>EarnUp Business</h1>
            <h1>A business solution designed for teams</h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Fiverr Business</button>
          </div>

          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
              controls
            />
          </div>
        </div>
      </div>
      <Slide slidesToShow={3} arrowsScroll={3}>
        {projects.map((card) => (
          <ProjectCard item={card} />
        ))}
      </Slide>
    </div>
  );
}
 export default Home;