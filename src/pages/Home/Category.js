import { HomeCarousel } from "../../components/Carousel";
import React from "react";
import styles from "./home.module.scss";

const Category = () => {
  return (
    <div className={styles.categoryWrapper}>
      <h2>🔥 개봉 예정 🔥</h2>
      <HomeCarousel />
      <h2>👀 오늘 이거 볼래? 👀</h2>
      <HomeCarousel />
    </div>
  );
};

export default Category;
