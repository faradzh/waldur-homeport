import * as React from 'react';

import Panel from '@waldur/core/Panel';

import ChangeIndicator from './ChangeIndicator';
import SparklineChart from './sparkline';
import { Chart } from './types';

interface Props {
  chart: Chart;
}

const DashboardChart = (props: Props) => {
  const { title, current, change, data } = props.chart;
  return (
    <Panel title={title}>
      <h1>{current}</h1>
      <SparklineChart data={data}/>
      <ChangeIndicator change={change}/>
    </Panel>
  );
};

export default DashboardChart;
