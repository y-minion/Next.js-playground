import { notFound } from "next/navigation";
import style from "./page.module.css";

//미리 빌드 시점에 존재할 url파라미터를 넥스트 서버에 전달해준다. 이렇게 되면 빌드 시점에 미리 전달한 url파라미터에 대한 페이지들이 만들어 진다.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!res.ok) {
    if (res.status === 404) {
      //네비게이션의 notFound함수를 호출시 가장 가까운 not-Found 컴포넌트를 렌더링 해준다.
      notFound();
    }
    return <div>오류 발생....</div>;
  }
  const book = await res.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

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
