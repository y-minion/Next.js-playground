import { ReactNode } from "react";
import Searchbar from "../../components/searchbar";

//넥스트에서 props의 children에 페이지 컴포넌트를 전달해준다. 이를 이용해 구조분해 할당으로 페이지 컴포넌트를 선택해서 레이아웃 하위에 렌더링 하도록 하면 된다.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
