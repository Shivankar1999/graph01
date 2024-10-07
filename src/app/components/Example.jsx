// import "./styles.css";
"use client";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Arcana Fuctionn 1", tName: "Flexible", value: 250 },
  { name: "Arcana Fuctionn 2", tName: "Solitary", value: 250 },
  { name: "Arcana Fuctionn 3", tName: "Imaginative", value: 250 },
  { name: "Arcana Fuctionn 4", tName: "Logical", value: 250 },
];
const data1 = [
  { name: "Harmony", value: 500 },
  { name: "Peace", value: 500 },
];
const data3 = [{ id: 1, name: "Core Persona", value: 1000, fill: "#fff" }];
const RADIAN = Math.PI / 180;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  console.log(value, payload);

  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text> */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.value ? "purple" : fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey+30}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey+30}
        dy={18}
        textAnchor={textAnchor}
        fill="#fff"
      >
        {`${payload?.tName}`}
      </text>
    </g>
  );
};
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}) => {
  let text = data1.filter((ele, i) => i === index);

  const radius = innerRadius + (outerRadius - innerRadius) * 0.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      {/* If you still need regular straight text, it can go here */}
      {text[0].name.toLocaleLowerCase().includes("harmony") ? (
        <text
          x={x + 39}
          y={y - 12}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize="15px"
          style={{ color: "#fff", fontWeight: "bolder" }}
        >
          {text[0].name}
        </text>
      ) : (
        <text
          x={x + 22}
          y={y + 15}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize="15px"
          style={{ color: "#fff", fontWeight: "bolder" }}
        >
          {text[0].name}
        </text>
      )}

      {/* Curved text rendering */}
    </g>
  );
};

export default function Example() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexInner, setActiveIndexInner] = useState(0);
  const [innerText, setinnerText] = useState("Core Persona");
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const onPieEnterInner = useCallback(
    (_, index) => {
      setActiveIndexInner(index);
    },
    [setActiveIndexInner]
  );
  const renderTooltip = (props) => {
    const { payload } = props;
    // console.log(payload);

    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: 10,
          borderRadius: 5,
          border:"1px solid #eee",
          // margin:"10px -10px"
          marginBottom:"10px",
        }}
      >
        <p>{`${payload[0]?.name}`}</p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={800}>
      <PieChart width={700} height={700}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={140}
          fill="#ff4f33"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={() => {
            setActiveIndex(null);
          }}
        />
        <Tooltip content={renderTooltip} />
        <Pie
          activeIndex={activeIndexInner}
          activeShape={null}
          data={data1}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnterInner}
          onMouseLeave={() => {
            setActiveIndexInner(null);
          }}
          label={renderCustomizedLabel}
          clockWise
        />
        <Pie
          dataKey="value"
          data={data3}
          cx="50%"
          cy="50%"
          onMouseEnter={() => {
            setinnerText("River");
          }}
          onMouseLeave={() => {
            setinnerText("Core Persona");
          }}
          stroke="none"
          innerRadius={0}
          outerRadius={50}
          fill="gray"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#333"
          style={{
            fontSize: "14px",
            padding: innerText == "RIVER" ? "4px" : "",
          }}
        >
          {innerText}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}
