import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) {
  return (
    <div>
      <Link href={"/parallel"}>parallel</Link>
      &nbsp;
      <Link href={"/parallel/setting"}>parallel/setting</Link>
      {sidebar}
      {feed}
      {children}
    </div>
  );
}
