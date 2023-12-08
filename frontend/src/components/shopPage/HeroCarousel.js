import React from "react";
import "./HeroCarousel.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import wallConnector from "../../assets/images/wall_connector.avif";
import chillBanner from "../../assets/images/chill_banner.avif";
import floorMats from "../../assets/images/floormats.avif";
import ClothesTryOn from "../../assets/images/ClothesTryOn.avif";
import VirtualTryOn from "../../assets/images/VirtualTryOn.avif";
import { ShopNowButton } from "../Styled";

export default function HeroCarousel() {
  return (
    <div className="hero-carousel">
      <Carousel
      
        autoPlay
        infiniteLoop
        emulateTouch
        interval="5000"
        showThumbs={false}
      >
        <div className="carousel-image-container">
          <img src={ClothesTryOn} alt="" />
          <div className="carousel-text">
            <h1>Tesla Clothes Virtual Try On</h1>
            <h2>Beta</h2>
            <button style={{
              backgroundColor: "#F5F5F5",
              border: "5px solid #F5F5F5",
              borderRadius: "25px",
              cursor: "pointer",
              padding: "8px",
              marginTop: "16px",
              width: "21em",
              position: "relative",
              transition: "all ease-in-out 0.2s",
            }} onClick={()=>{
              window.open("https://dressingroom.revery.ai/?dressing_room_address=47c4dc58deaf60c8fc944d419107b6b4327ed6f0d1caa75341a5fa3263c71116")
            }}>TRY NOW</button>
          </div>
        </div>
        <div className="carousel-image-container">
          <img src={VirtualTryOn} alt="" />
          <div className="carousel-text">
            <h1 style={{
              color: "black",
            }}>Tesla Accessories Virtual Try On by DeepAR</h1>
            <h2 style={{
              color: "black"
            }}>Beta</h2>
            <button style={{
              backgroundColor: "#F5F5F5",
              border: "5px solid #F5F5F5",
              borderRadius: "25px",
              cursor: "pointer",
              padding: "8px",
              marginTop: "16px",
              width: "21em",
              position: "relative",
              transition: "all ease-in-out 0.2s",
            }} onClick={()=>{
              window.open("http://localhost:8888/")
            }}>TRY NOW</button>
          </div>
        </div>
        <div className="carousel-image-container">
          <img src={wallConnector} alt="" />
          <div className="carousel-text">
            <h1>Wall Connector</h1>
            <h2>The most convenient way to charge at home</h2>
            <ShopNowButton>SHOP NOW</ShopNowButton>
          </div>
        </div>
        <div className="carousel-image-container">
          <img src={chillBanner} alt="" />
          <div className="carousel-text">
            <h1>Chill Collection</h1>
            <h2>Premium comfort for any season</h2>
            <ShopNowButton>SHOP NOW</ShopNowButton>
          </div>
        </div>
        <div className="carousel-image-container">
          <img src={floorMats} alt="" />
          <div className="carousel-text">
            <h1>Model Y All-Weather Interior Liners</h1>
            <h2>For maximum protection and durability</h2>
            <ShopNowButton>SHOP NOW</ShopNowButton>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
