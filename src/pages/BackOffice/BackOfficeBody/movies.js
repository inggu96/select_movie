// import { React, useState, useEffect } from 'react';
// import { getMovies, getMoviesCount } from '../../../api/Movies';
// import styles from './backOfficeBody.module.scss';
// import cx from 'classnames';
// import { Button, Input, SearchInput } from '../../../components';
// import { CheckIcon, SearchIcon, TrashIcon } from '../../../assets/icon';
// import BOmovieModal from './BOmodal/BOmovieModal';
// import BOpageNation from './BOpageNation/BOpageNation';

// const title = ['영화제목', '개봉일', '평균평점', '수정'];
// const LIMIT = 10;

// const BackOfficeMovies = () => {
//   const [pageNumber, setPageNumber] = useState(1);  //페이지 넘버
//   const [modalOpen, setModalOpen] = useState(false); // 모달 온오픈
//   const [movieData, setMovieData] = useState(); // 영화 데이터
//   const [Count, setCount] = useState(); // 전체 갯수
//   const [form, setForm] = useState(); // 검색창
//   const [pageNationNumber, setPageNationNumber] = useState(); //페이지네이션
//   const [selectedIDs, setSelectedIDs] = useState([]); //체크박스
//   const [selectIndex, setSelectIndex] = useState(); //

//   const onSetData = (data, total) => {
//     const totalPage = Math.ceil(total / LIMIT);
//     setMovieData(data);
//     setCount(total);
//     setPageNationNumber(totalPage);
//   };

//   const responseData = async () => {
//     const response1 = await getMovies(pageNumber, LIMIT);
//     //const responseCount = await getMoviesCount();
//     onSetData(response1.data.data, response1.data.paging.total);
//   };

//   const onSearch = async (e) => {
//     e.preventDefault();
//     if (form.length < 2) {
//       return alert('두 글자 이상을 검색해 주세요');
//     }
//     setPageNumber(1);
//     const response2 = await getMovies(1, LIMIT, form);
//     onSetData(response2.data.data, response2.data.paging.total);
//   };
//   const onSearchPageChange = async () => {
//     const response2 = await getMovies(pageNumber, LIMIT, form);
//     onSetData(response2.data.data, response2.data.paging.total);
//   };

//   const showModal = (item, index) => {
//     return () => {
//       setSelectedIDs([item.id]);
//       setSelectIndex(index);
//       setModalOpen(true);
//     };
//   };
//   const closeModal = () => {
//     setSelectedIDs([]);
//     setModalOpen(false);
//     responseData();
//   };
//   const onChange = (e) => {
//     const { value } = e.currentTarget;

//     //NOTE: 검색어가 있다가 사라지면 다시 데이터를 불러오는 로직
//     if (value.length === 0) {
//       responseData();
//     }
//     setForm(value);
//   };
//   const onClickCheckBox = (id) => {
//     return (e) => {
//       const { checked } = e.currentTarget;
//       if (checked) {
//         setSelectedIDs([...selectedIDs, id]);
//       } else {
//         setSelectedIDs(selectedIDs.filter((x) => x !== id));
//       }
//     };
//   };

//   useEffect(() => {
//     if (!form) {
//       responseData();
//     } else {
//       onSearchPageChange();
//     }
//   }, [pageNumber, modalOpen]);

//   return (
//     <>
//       <header className={styles.header}>
//         <h3 className={styles.mainTitle}> 영화관리 </h3>
//         <form
//           id="searchForm"
//           className={cx(styles.searchInput, styles['iconLocation'])}
//         >
//           <Input
//             onChange={onChange}
//             name="title"
//             value={form}
//             placeholder="영화 제목을 두 글자 이상 검색해주세요"
//             className={styles.inputWrapper}
//           />
//           <button
//             type="submit"
//             form="searchForm"
//             onClick={onSearch}
//             className={cx(styles.button)}
//           >
//             <SearchIcon />
//           </button>
//         </form>
//         <div className={styles.buttonPosition}></div>
//       </header>

//       {/* 표머리 */}
//       <ul className={styles.title}>
//         <li>선택</li>
//         {title.map((item, index) => {
//           return <li key={index}>{item}</li>;
//         })}
//       </ul>
//       {/* 표 몸통 */}
//       {!!movieData &&
//         movieData.map((item, index) => {
//           return (
//             <ul className={styles.tableRow}>
//               <li className={styles.checkbox}>
//                 <label className={styles.checkBox}>
//                   <input
//                     type="checkbox"
//                     readOnly
//                     hidden
//                     checked={selectedIDs.includes(item.id)}
//                     onClick={onClickCheckBox(item.id)}
//                   />
//                   <CheckIcon />
//                 </label>
//               </li>

//               <li> {movieData[index].title} </li>
//               <li> {movieData[index].releasedAt} </li>
//               <li>
//                 {' '}
//                 {!!movieData[index].averageScore &&
//                   movieData[index].averageScore.toFixed(1)}
//               </li>
//               <li>
//                 <Button
//                   children="수정"
//                   onClick={showModal(item, index)}
//                   id={index}
//                 />
//               </li>
//             </ul>
//           );
//         })}
//       {selectIndex !== undefined && (
//         <BOmovieModal
//           className={styles.modal}
//           modalOpen={modalOpen}
//           setModalOpen={setModalOpen}
//           closeModal={closeModal}
//           buttonChildren="수정"
//           ID={selectedIDs[0]}
//           setMovieData={setMovieData}
//           selectedData={movieData[selectIndex]}
//           setSelectedIDs={setSelectedIDs}
//         />
//       )}

//       {/* 페이지네이션 */}
//       <BOpageNation
//         pageNationNumber={pageNationNumber}
//         pageNumber={pageNumber}
//         setPageNumber={setPageNumber}
//       />
//     </>
//   );
// };

// export default BackOfficeMovies;
