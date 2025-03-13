import React, { useEffect, useRef } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = ({userTweetMonth,userUserMonth}) => {
  const chartRef = useRef(null)

  console.log('userTweetMonth ',userTweetMonth, ' userUserMonth ', userUserMonth)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const random = () => Math.round(Math.random() * 100)

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: userTweetMonth?.months?.map(data => data.month).reverse() || [],
          datasets: [
            {
              label: 'Tweet',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: userTweetMonth?.months?.map(data => data.tweetCount).reverse(),
              fill: true,
            },
            {
              label: 'User',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: userUserMonth?.months?.map(data => data.users).reverse(),
            },
            // {
            //   label: 'My Third dataset',
            //   backgroundColor: 'transparent',
            //   borderColor: getStyle('--cui-danger'),
            //   pointHoverBackgroundColor: getStyle('--cui-danger'),
            //   borderWidth: 1,
            //   borderDash: [8, 5],
            //   data: [65, 65, 65, 65, 65, 65, 65],
            // },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: userTweetMonth?.months?.length > 0 && userUserMonth?.months?.length > 0  ? Math.max(...userTweetMonth?.months.map(data => data.tweetCount)) > Math.max(...userUserMonth?.months.map(data => data.users)) ? Math.max(...userTweetMonth?.months.map(data => data.tweetCount)) + 5 : Math.max(...userUserMonth?.months.map(data => data.users)) + 5 : 0,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
