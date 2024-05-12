import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { MdRectangle } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
// import { Pie } from "react-chartjs-2";
import { Cell, Pie, PieChart } from "recharts";

function TasksDashboard() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  // const allTasks = tasks.length;
  const finishedTasksLength = tasks.filter((t) => t.task_done === true).length;
  const unfinshedTasksLength = tasks.filter(
    (t) => t.task_done === false
  ).length;

  const data = [
    { name: "Finished Tasks", value: finishedTasksLength },
    { name: "Uninished Tasks", value: unfinshedTasksLength },
  ];

  const COLORS = ["#00C49F", "#ffd166"];

  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      // marginTop={"2%"}
    >
      <Box>
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
            {data.map((_entry, index) => (
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
          <MdRectangle size={30} color="#00C49F" />
          <Text>Finished Tasks</Text>
        </HStack>
        <HStack>
          <MdRectangle size={30} color="#ffd166" />
          <Text>Unfinished Tasks</Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default TasksDashboard;
