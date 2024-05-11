import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { MdRectangle } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
// import { Pie } from "react-chartjs-2";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

function TasksDashboard() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const allTasks = tasks.length;
  const finishedTasksLength = tasks.filter((t) => t.task_done === true).length;
  const unfinshedTasksLength = tasks.filter(
    (t) => t.task_done === false
  ).length;

  // const pieChartData = {
  //   labels: ["Finished Tasks", "Uninished Tasks"],
  //   datasets: {
  //     data: [finishedTasksLength, unfinshedTasksLength],
  //     backgroundColor: ["orange", "blue"],
  //   },
  // };
  const data = [
    { name: "Finished Tasks", value: finishedTasksLength },
    { name: "Uninished Tasks", value: unfinshedTasksLength },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  // const RADIAN = Math.PI / 180;
  // const renderCustomizedLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   percent,
  // }: {
  //   cx: number;
  //   cy: number;
  //   midAngle: number;
  //   innerRadius: number;
  //   outerRadius: number;
  //   percent: number;
  // }) => {
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor={x > cx ? "start" : "end"}
  //       dominantBaseline="central"
  //     >
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      // marginTop={"2%"}
    >
      <Box>
        {/* <Box width={"45%"}>
          <CircularProgress
            value={(finishedTasksLength / allTasks) * 100}
            size={"100%"}
            color="orange"
            thickness={"8%"}
          >
            <CircularProgressLabel>
              <Tooltip label={unfinshedTasksLength + " remaining"}>
                <Text fontSize={"0.8rem"}>
                  {finishedTasksLength}/{allTasks}
                </Text>
              </Tooltip>
            </CircularProgressLabel>
          </CircularProgress>
        </Box> */}
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={40}
            fill="#8884d8"
            // labelLine={false}
            // labelPosition="inside"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          {/* <Legend /> */}
        </PieChart>
      </Box>

      <VStack alignItems={"flex-start"}>
        <HStack>
          <MdRectangle size={30} color="#0088FE" />
          <Text>Finished Tasks</Text>
        </HStack>
        <HStack>
          <MdRectangle size={30} color="#00C49F" />
          <Text>Unfinished Tasks</Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default TasksDashboard;
