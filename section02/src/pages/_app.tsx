import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);

  const onClickBtn = () => {
    //router객체의 push 함수는 문자열로 입력한 경로로 이동시켜 준다. 이때 클라이언트 사이드 렌더링으로 이동시키기에 a태그보다 성능이 좋다.
    router.push("/search");
  };
  return (
    <>
      <Link href={"/"}>Home</Link>
      &nbsp;
      <Link href={"/search"}>search</Link>
      &nbsp;
      <div>
        <button onClick={onClickBtn}>search페이지로 이동하는 버튼</button>
      </div>
      <header>이것은 헤더입니다.</header>
      <Component {...pageProps} />
    </>
  );
}
