// import Link from "next/link";

// export const routes = {
//   main: "/",
//   login: "/login",
//   userboard: "/userboard",
//   userboard_detail: "/useboard/?id", // 'id'가 필요한 경로
//   donation: "/donation",
//   profile: "/profile", // 'id'가 필요한 경로
//   detailA: "/detailA", // 'id'가 필요한 경로
//   detailB: "/detailB",
// } as const;
// export type routeMap = {
//   main: undefined; // params가 필요없음
//   login: undefined; // params가 필요없음
//   userboard: undefined; // params가 필요없음
//   donation: undefined; // params가 필요없음
//   profile: { id: string }; // 'id'가 필요
//   detailA: { id: string }; // 'id'가 필요
//   detailB: undefined; // params가 필요없음
//   userboard_detail: { id: string }; // 'id'가 필요
// };
// // 조건부 타입으로 `params`를 강제
// // `params`가 필요없는 경로에서는 `undefined`로 처리, 필요한 경로에서는 `params` 요구
// type ParamsRequired<Name extends keyof typeof routes> =
//   routeMap[Name] extends undefined ? {} : routeMap[Name];

// const CustomRouterProvider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <>
//       {children}
//       <Link href={routes.main} className="hidden" />
//       <Link href={routes.login} className="hidden" />
//       <Link href={routes.userboard} className="hidden" />
//       <Link href={routes.donation} className="hidden" />
//       <Link href={routes.profile} className="hidden" />
//       <Link href={routes.userboard_detail} className="hidden" />
//       <Link href={routes.detailB} className="hidden" />
//     </>
//   );
// };

// export default CustomRouterProvider;
