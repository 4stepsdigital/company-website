import React, { useState, useEffect } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BackToTop = () => {
  // BackToTop.js
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scroll down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="z-[999] relative">
      {isVisible && (
        <button
          className="backtotopanimate"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "10px",
            padding: "10px 15px",
            backgroundColor: "#0d417b",
            color: "#ffffff",
            border: "none",
            borderRadius: "100px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <FontAwesomeIcon icon={faAngleUp} className=" text-base" />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
