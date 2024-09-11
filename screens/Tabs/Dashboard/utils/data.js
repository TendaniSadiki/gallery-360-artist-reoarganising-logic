const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(206, 184, 158, ${opacity})`, // Set the color of the line chart
    },
  ],
};

export { chartData };
