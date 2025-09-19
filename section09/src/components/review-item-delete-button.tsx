"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({
  bookId,
  reviewId,
}: {
  bookId: number;
  reviewId: number;
}) {
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state?.error) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="bookId" value={bookId} hidden readOnly />
      <input name="reviewId" value={reviewId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
