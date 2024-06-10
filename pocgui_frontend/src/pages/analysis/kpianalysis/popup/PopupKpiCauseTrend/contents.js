import { Box, Grid, Stack } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { getTrendKpiAndCauseAnalysis } from "api/nw/analysisApi";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const KpiCauseTrend = ({ params }) => {

  const [chartData, setChartData] = useState([]);

  const getTrendData = () => {
    getTrendKpiAndCauseAnalysis(params).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          setChartData(ret.rs);
        }
      }
    });
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
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={ chartData }
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
              }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event_exp_time" />
                <YAxis domain={[0, dataMax => Math.ceil(Math.max(...chartData.map(item => item.data1), ...chartData.map(item => item.data2)) * 1.1)]} />
                <Tooltip
                  contentStyle={{ fontWeight: 'bold' }}
                  formatter={(value, name, props) => {
                    const newName = name === 'data1' ? '<현재> ' + params.headerName : '<과거> ' + params.headerName;
                    const color = name === 'data1' ? '#1E90FF' : '#808080';
                    let formattedValue = '';
                    if (!params.headerName.includes('(%)') && !params.headerName.includes('(건)')) {
                      if (params.selectedVal.includes('RATE')) {
                        params.unit = '%';
                      } else {
                        params.unit = '건';
                      }
                      formattedValue = params.unit === '건' ? Number(value).toLocaleString() : value;
                    } else {
                      params.unit = '';
                      formattedValue = params.headerName.includes('(건)') ? Number(value).toLocaleString() : value;
                    }
                    
                    return [
                      <span style={{ color }}>{newName + ': ' + formattedValue + params.unit}</span>
                    ];
                  }}
                />
                <Legend 
                  formatter={(value, entry) => {
                    const color = value === 'data1' ? '#1E90FF' : '#808080';
                    return <span style={{ color }}>{value === 'data1' ? '<현재> ' + params.headerName : '<과거> ' + params.headerName}</span>;
                  }}
                />
                {/* <Area type="monotone" dataKey="data1" stroke="#3CB371" strokeWidth={2} fill="none" dot={false} activeDot={{ r: 2 }} /> */}
                <Area type="monotone" dataKey="data1" stroke="#1E90FF" strokeWidth={2} fill="none" dot={false} activeDot={{ r: 2 }} />
                <Area type="monotone" dataKey="data2" stroke="#D3D3D3" strokeWidth={1} fill="#D0D0D0" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Stack>
        </Box>
      </Grid>
    </Fragment>
  );
}

export default KpiCauseTrend;