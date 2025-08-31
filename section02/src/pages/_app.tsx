import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);

  const onClickBtn = () => {
    //router객체의 push 함수는 문자열로 입력한 경로로 이동시켜 준다. 이때 클라이언트 사이드 렌더링으로 이동시키기에 a태그보다 성능이 좋다.
    router.push("/test");
  };

  useEffect(() => {
    //Link컴포넌트 이외의 다른 페이지로 네비게이트 시켜주는 함수에 대해서는 프리패치가 이뤄지지 않는다. 이때는 router객체의 메서드인 prefetch를 이용하면 된다.
    router.prefetch("/test");
  }, []);
  return (
    <>
      <Link href={"/"}>Home</Link>
      &nbsp;
      <Link href={"/search"}>search</Link>
      &nbsp;
      {/* 다음과 같이 Link컴포넌트의 prop중 prefetch속성을 false로 전달하면 프리패치를 하지 않는다. */}
      <Link href={"/book"} prefetch={false}>
        book
      </Link>
      &nbsp;
      <Link href={"/player"}>player</Link>
      <div>
        <button onClick={onClickBtn}>Test페이지로 이동하는 버튼</button>
      </div>
      <header>이것은 헤더입니다.</header>
      <Component {...pageProps} />
    </>
  );
}
