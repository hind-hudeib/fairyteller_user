import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const buttonStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#283244",
    border: "2px solid #fff",
    color: "#fff",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    opacity: "0",
    transition: "opacity 0.3s ease-in-out",
    zIndex: "999",
  };

  const visibleButtonStyles = {
    opacity: "1",
  };
  return (
    <div
      className={`back-to-top-button ${isVisible ? "visible" : ""}`}
      style={{ ...buttonStyles, ...(isVisible ? visibleButtonStyles : {}) }}
      onClick={scrollToTop}
    >
      &uarr;
    </div>
  );
};

export default BackToTopButton;
