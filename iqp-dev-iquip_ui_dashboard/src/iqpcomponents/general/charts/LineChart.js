import React from 'react';

import LineGraph from '../charts/d3components/linegraph/LineGraph';
import ChartData from '../charts/d3components/testData/data.js';



class LineChart extends React.Component {
  render() {
    return (
      <div>

        <LineGraph
          title="Line Graph - 700px max width"
          width={700}
          height={500}
          chartId="custom-ID"
          chartClassName="custom-CLASS"
          xAxisLabel="X Axis Label"
          yAxisLabel="Y Axis Label"
          xDataKey="day"
          yDataKey="count"
          dateFormat="%m-%d-%Y"
          xToolTipLabel="X-TT "
          yToolTipLabel="Y-TT "
          lineType="linear"
          yMaxBuffer={50}
          data={ChartData.lineGraphData}/>
      </div>
    );
  }
}

export default LineChart;
