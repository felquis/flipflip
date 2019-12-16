import React from 'react'
import moment from 'moment'

import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const TimeSeriesChart = ({ chartData }) => (
    <ResponsiveContainer width = '95%' height = {500} >
        <ScatterChart>

            <XAxis
                dataKey = 'time'
                domain = {['auto', 'auto']}
                name = 'Time'
                tickFormatter = {(unixTime) => (new Date(unixTime)).getUTCSeconds()}
                type = 'number'
            />

            <YAxis dataKey = 'beta' name = 'Values' />
            <YAxis dataKey = 'alpha' name = 'Values' />
            <YAxis dataKey = 'gamma' name = 'Values' />

            <Scatter
                data = {chartData}
                line = {{ stroke: '#eee' }}
                lineJointType = 'monotoneX'
                lineType = 'joint'
                name = 'Values'
            />

        </ScatterChart>
    </ResponsiveContainer>
)

export default TimeSeriesChart