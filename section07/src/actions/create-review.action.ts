"use server";
import { revalidateTag } from "next/cache";
import delay from "util/delay";

//서버에서만 실행이 되도록 만들어주는 지시자를 사용한다.
//useActionState 훅을 사용하면 해당 훅이 반환하는 상태 값(첫번째 변수)이 첫번째 매개변수로 전달이 된다. 하지만 현재 서버액션 함수에서는 사용하지 않으므로 언더바 처리한다.
export default async function createReviewAction(_: any, formData: FormData) {
  console.log("server action called");

  //이때 formData의 타입으로 string이나 파일타입이 올 수 있다.
  //하지만 우리는 현재 string만 사용할 것이기 때문에 값이 존재하면 문자열로 변환한다.
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  //서버측에서 클라이언트에 비어있는 항목이 있으면 올바르지 않은 요청으로 판단하여 종료한다
  if (!bookId || !content || !author)
    return { status: false, error: "리뷰내용과 작성자를 입력해 주세요" };
  try {
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    if (!response.ok) throw new Error(response.statusText);
    //패치가 성공적으로 이루어 지면 해당 페이지를 새롭게 만들어서 클라이언트에 보내준다
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return { status: false, error: `리뷰 저장에 실패했습니다:${err}` };
  }
}
