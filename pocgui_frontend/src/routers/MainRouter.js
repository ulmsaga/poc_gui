import React from "react";
import { MainLayout } from "../layout";
import Loadable from "components/Loadable";

const NetworkMonitoring = Loadable(React.lazy(() => import("../pages/monitoring/networkmonitoring/index")));
const KpiAnalysis = Loadable(React.lazy(() => import("../pages/analysis/kpianalysis")));

const MainRouter = {
  path: '/modules',
  element: <MainLayout />,
  children: [
    { path: 'monitor/NetworkMonitoring', element: <NetworkMonitoring /> },
    { path: 'analysis/KpiAnalysis', element: <KpiAnalysis /> }
  ]
};

export default MainRouter;