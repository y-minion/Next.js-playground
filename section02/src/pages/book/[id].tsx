//URL변수도 쿼리파람과 마찬가지로 객체를 불러온다.
import { useRouter } from "next/router";
import books from "@/mock/books.json";
import style from "./[Id].module.css";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null;
  }
  const { title, subTitle, coverImgUrl, description, author, publisher } =
    books[Number(id) - 1];
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
