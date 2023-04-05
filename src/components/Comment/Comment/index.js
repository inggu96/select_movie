import styles from './comment.module.scss';
import cx from 'classnames';
import { HeaderLeft, HeaderRightButtons } from '../_shared';
import useMe from '../../../hooks/useMe';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../../atom';
import { useEffect, useState } from 'react';
import { ModifyIcon, TrashIcon } from '../../../assets/icon';
import Modal from '../../Common/Modal';
import { deleteReviewComment, patchReviewComment } from '../../../api/Reviews';

const Comment = ({
  comment,
  userName,
  date,
  className,
  commentId,
  written,
  fetchReviews,
  ...props
}) => {
  const me = useMe();

  const isLogin = useRecoilValue(isLoginAtom);
  const [isUserMe, setIsUserMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [canModify, setCanModify] = useState(false);
  const [modifiedComment, setModifiedComment] = useState(comment);

  useEffect(() => {
    isUserMeToggle();
  }, [isLogin, me]);

  const isUserMeToggle = () => {
    if (isLogin && me && me.id === written) {
      setIsUserMe(true);
    }
  };

  const onClickDelete = () => {
    setModalOpen(true);
  };

  const onClickDeleteComment = () => {
    deleteReviewComment(commentId);
    fetchReviews();
    setModalOpen(false);
  };

  const onPatchComment = async () => {
    await patchReviewComment(commentId, { content: modifiedComment });
    await fetchReviews();
    setCanModify(false);
  };

  const onChangeModifiedComment = (e) => {
    setModifiedComment(e.currentTarget.value);
  };

  const onClickModify = () => {
    setCanModify(true);
  };

  return (
    <section className={cx(styles.wrap, { [styles.myComment]: isUserMe })}>
      <header>
        <HeaderLeft type="comment" userName={userName} date={date} />

        <article className={styles.right}>
          <HeaderRightButtons type="comment" commentId={commentId} />

          {isUserMe || (
            <button type="button" name="report">
              신고하기
            </button>
          )}
          {isUserMe && (
            <div className={styles.myButtons}>
              <button type="button" name="modify" onClick={onClickModify}>
                <ModifyIcon />
              </button>
              <button type="button" name="delete" onClick={onClickDelete}>
                <TrashIcon />
              </button>
              <Modal
                className={styles.modal}
                modalOpen1={modalOpen}
                setModalOpen={setModalOpen}
                buttonChildren="삭제"
                onClick={onClickDeleteComment}
              >
                댓글을 삭제하시겠습니까?
              </Modal>
            </div>
          )}
        </article>
      </header>

      {canModify || <main>{comment}</main>}

      {canModify && (
        <main className={styles.modifyMain}>
          <textarea
            value={modifiedComment}
            onChange={onChangeModifiedComment}
          />
          <button onClick={onPatchComment}>수정</button>
        </main>
      )}
    </section>
  );
};

export default Comment;