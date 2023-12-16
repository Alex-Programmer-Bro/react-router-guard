import { Suspense, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { router as R } from "./main";

type Next = void | boolean | Promise<void | boolean>

let data: null | string = null;
let fetching = false;

const AsyncGuard = ({ children }: { children: React.ReactNode }) => {
  if (data) {
    return children;
  } else {
    if (!fetching) {
      fetching = true;
      new Promise((resolve) => {
        setTimeout(() => {
          data = "hello";
          resolve(true);
        }, 3000);
      });
    }
    throw new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

const beforeEach = ({
  from,
  to,
  router,
}: {
  from: string;
  to: string;
  router: typeof R;
}): Next => {
  console.log(from, to, router);
};

export const Guard = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const from = useRef(pathname);

  useEffect(() => {
    const to = pathname;
    beforeEach({ from: from.current, to, router: R });
    from.current = to;
  }, [pathname]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <AsyncGuard>{children}</AsyncGuard>
    </Suspense>
  );
};
