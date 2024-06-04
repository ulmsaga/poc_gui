import { Box, Grid, Stack } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React, { Fragment, useEffect, useState } from "react";
import { testData } from "./testData";
import { getTrendKpiAndCauseAnalysis } from "api/nw/analysisApi";
import { forEach } from "lodash";

const KpiCauseTrend = ({ params }) => {

  
  const line1Color = '#ff0000';

  const getTrendData = () => {
    // getTrendKpiAndCauseAnalysis(params).then((response) => {};
    getTrendKpiAndCauseAnalysis(params).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          makeTrendData(ret.rs);
        }
      }
    });
  };

  const [chartData, setChartData] = useState([]);

  const makeTrendData = (dataList) => {
    const currDataId = '현재 ' + params.selectedVal;
    const lastDataId = '과거 ' + params.selectedVal;
    const trendData = [];
    const currData = {id: currDataId, data: []};
    const lastData = {id: lastDataId, data: []};

    console.log(dataList)
    
    dataList.forEach( item => {
      currData.data.push({
        x: item?.event_exp_time,
        y: item?.data1
      });
      lastData.data.push({
        x: item?.event_exp_time,
        y: item?.data2
      });
    });
    
    trendData.push(currData, lastData);
    console.log(trendData)
    setChartData(trendData);
  };

  useEffect(() => {
    getTrendData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Grid item sx={{ width: '100%' }}>
        <Box height={'100%'} width={'100%'} gap={4} marginTop={0.5} marginRight={0.5} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
          <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '300px' }}>
            <ResponsiveLine
              data={ chartData } 
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              pointSymbol={function noRefCheck(){}}
              colors={ ['skyblue', 'gray'] }  // color를 props로 받아서 설정해줍니다.
              theme={{  // theme에서 x, y축 글씨 색을 바꿔줍니다.
                textColor: 'blue',
              }}
              enableArea={true}
              enableSlices={'x'}
              // enableGridX={true}
              // enableSlicesLabels={ false }
              xScale={{ type: 'point' }}
              yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false
              }}
              yFormat='>-.2f'
              curve='catmullRom'  // 선 종류를 설정해줍니다. (라이브러리 문서 참고)
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,  // x축 텍스트를 회전시켜줍니다. (세로)
                legend: '',  // x 축 단위를 표시합니다.
                legendOffset: 60,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',  // y축 왼쪽에 표시될 단위입니다.
                legendOffset: -55,
                legendPosition: 'middle',
              }}
              pointSize={5}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[]} // 그래프 오른쪽의 포인트를 지워줍니다.
            />
          </Stack>
        </Box>
      </Grid>
    </Fragment>
  );
}

const getColoredAxis = color => {
  return {
    axis: {
      ticks: {
        line: {
          stroke: color
        },
        text: { fill: color }
      },
      legend: {
        text: {
          fill: color
        }
      }
    }
  };
};

export default KpiCauseTrend;