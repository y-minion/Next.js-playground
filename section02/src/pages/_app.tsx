import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component?: NextPageWithLayout;
}) {
  //공통 레이아웃 렌더링을 원하는 컴포넌트에는 getLayout이라는 프로퍼티를 추가한 상태임. 해당 로직에서 공통 레이아웃 속성을 렌더링한다.
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
