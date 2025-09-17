import ReviewItemDeleteButton from "./review-item-delete-button";
import style from "./review-item.module.css";
import { ReviewData } from "@/types";

export default function ReviewItem({
  id,
  content,
  author,
  createAt,
  bookId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createAt).toLocaleString()}</div>
        <div className={style.delete_btn}>
          {<ReviewItemDeleteButton bookId={bookId} reviewId={id} />}
        </div>
      </div>
    </div>
  );
}
