import { notFound } from "next/navigation";
import style from "./page.module.css";

//미리 빌드 시점에 존재할 url파라미터를 넥스트 서버에 전달해준다. 이렇게 되면 빌드 시점에 미리 전달한 url파라미터에 대한 페이지들이 만들어 진다.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
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
    <section>
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
    </section>
  );
}

function ReviewEditor() {
  async function createReviewAction(formData: FormData) {
    "use server"; //서버에서만 실행이 되도록 만들어주는 지시자를 사용한다.
    console.log("server action called");

    //이때 formData의 타입으로 string이나 파일타입이 올 수 있다.
    //하지만 우리는 현재 string만 사용할 것이기 때문에 값이 존재하면 문자열로 변환한다.
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    console.log(content, author);
  }

  return (
    <section>
      {/* 폼이 제출될때 서버에서 실행되는 함수를 action을 통해 전달한다 */}
      <form action={createReviewAction}>
        <input name="content" placeholder="리뷰 내용" />
        <input name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor />
    </div>
  );
}
