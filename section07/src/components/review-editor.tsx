"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import createReviewAction from "@/actions/create-review.action";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  //useActionState가 반환하는 상태를 통해 서버 액션 함수에서 에러가 발생하면 에러 메세지를 띄울 수 있도록 한다.
  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <section>
      {/* 폼이 제출될때 서버에서 실행되는 함수를 action을 통해 전달한다 */}
      <form className={style.form_container} action={formAction}>
        {/* Input의 모든 항목을 입력해야 제출 할 수 있도록 한다 */}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          required
          disabled={isPending}
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            required
            disabled={isPending}
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
