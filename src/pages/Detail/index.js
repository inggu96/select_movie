import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";
import DetailInfo from "./DetailInfo";
import Dropdown from "../../components/Common/Dropdown";
import { getMoviesRelated } from "../../api/Movies";
import RelatedCard from "./RelatedCard";
import { getReviewsMovie } from "../../api/Reviews";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atom";
import useMe from "../../hooks/useMe";
import Accordion from "./Accordion";
import ReviewInput from "../../components/Comment/ReviewInput";

import { motion } from "framer-motion";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isLogin = useRecoilValue(isLoginAtom);
  const me = useMe();
  const [relatedMovies, setRelatedMovies] = useState();
  const [reviews, setReviews] = useState([]); // review 객체가 들어있는 배열

  const fetchRelatedMovies = async () => {
    const response = await getMoviesRelated(id);
    setRelatedMovies(response.data);
  };

  const fetchReviews = async () => {
    const response = await getReviewsMovie(id);
    setReviews(response.data);
  };

  useEffect(() => {
    fetchRelatedMovies();
    fetchReviews();
  }, [id, reviews]);

  useEffect(() => {
    console.log({ pathname });
    window.scrollTo(0, 0);
  }, [pathname, relatedMovies]);

  return (
    <>
        <motion.div
          initial={{y : -200}}
          animate={{y : 0}}
          transition={{ duration: 1, type: "spring" }}
  >
      <DetailInfo id={id} />
      <section className={styles.sectionWrap}>
        <main className={styles.mainWrap}>
          <ReviewInput
            id={id}
            disabled={!isLogin}
            placeholder={
              isLogin
                ? "10자 이상 입력 시 등록 가능합니다."
                : "로그인 후 작성하실 수 있습니다."
            }
            fetchReviews={fetchReviews}
            userName={
              me && isLogin ? (
                me.nickname ?? me.name
              ) : (
                <Link to="/auth/login">로그인 후 작성가능</Link>
              )
            }
          />
          <header>
            <h1>Reviews</h1>
            <Dropdown
              items={["별점높은순", "별점낮은순", "공감많은순"]}
              className={styles.dropdown}
            />
          </header>

          <article className={styles.reviewsWrap}>
            {reviews.length !== 0 || (
              <div className={styles.empty}>
                <p>텅</p>
                <p>첫 리뷰를 남겨보세요✨</p>
              </div>
            )}
            {reviews &&
              reviews.map((review) => {
                return (
                  <Accordion review={review} key={review.id} movieId={id} />
                );
              })}
          </article>
        </main>
        <aside className={styles.relatedWrap}>
          <h3>영화가 마음에 드셨다면 👀</h3>

          {relatedMovies &&
            relatedMovies.map((movie) => {
              return (
                <RelatedCard
                  key={movie.id}
                  title={movie.title}
                  id={movie.id}
                  postImage={movie.postImage}
                  onClick={() => {
                    navigate(`/detail/${movie.id}`, {
                      replace: true,
                    });
                  }}
                />
              );
            })}
        </aside>
      </section>
      </motion.div>
    </>
  );
};

export default Detail;
