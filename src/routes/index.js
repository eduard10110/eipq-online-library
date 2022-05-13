import Loading from "components/loading";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routesData from "routes/routesData";

export default function RoutesBuilder() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routesData.map(({ exact, path, Comp }, index) => (
          <Route key={index} exact={exact} path={path} element={<Comp />} />
        ))}
      </Routes>
    </Suspense>
  );
}
