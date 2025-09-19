import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page(props: any) {
  return (
    <div>
      인터셉트 성공!
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
