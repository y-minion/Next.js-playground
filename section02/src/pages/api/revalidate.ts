import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //해당 API경로로 요청이 오면 핸들러 함수가 실행되는데 이때 res객체의 revalidate 메서드가 '/'경로를 재생성한다
    await res.revalidate("/");
    //성공적으로 재생성이 되었다면 응답으로 성공했다는 응답을 보낸다.
    return res.json({ revalidate: true });
  } catch (err) {
    //실패할 경우 500번대 상태와, 에러 메세지를 보낸다.
    res.status(500).send("Revalidation Failed");
    console.error(err);
  }
}
