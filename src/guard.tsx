import { Suspense } from "react";

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

export const Guard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <AsyncGuard>{children}</AsyncGuard>
    </Suspense>
  );
};
