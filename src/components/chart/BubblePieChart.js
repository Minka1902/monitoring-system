import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import React from 'react';

export default function BubblePieChart({ well, myMap, tooltip__wrapper = 'tooltip__wrapper' }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: `${myMap ? myMap.latLngToContainerPoint(well.location).y - 30 : well.divPoint.y}px`,
                left: `${myMap ? myMap.latLngToContainerPoint(well.location).x - 30 : well.divPoint.x}px`,
                zIndex: 1000,
            }}
        >
            <PieChart width={well.rad ? well.rad * 2 : 60} height={well.rad ? well.rad * 2 : 60}>
                <Tooltip wrapperClassName={tooltip__wrapper} />
                <Pie
                    data={well.data}
                    outerRadius={well.rad ? well.rad : 30}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {well.data && well.data.map((segment, idx) => (
                        <Cell key={`cell-${idx}`} fill={segment.fill} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};