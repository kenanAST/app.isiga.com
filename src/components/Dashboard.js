import { Button, Card, Checkbox, Form, Input, Row, Slider } from "antd";
import Chart from "react-apexcharts";
import { useState } from "react";
import ph2016 from "./images/PH_2016.png";
import ph2012 from "./images/PH_2012.png";
import ilgcdo2016 from "./images/ILG_CDO_2016.png";
import ilgcdo2012 from "./images/ILG_CDO_2012.png";
import logo from "./images/iSIGA_LOGO.png";
import Map from "./Map";

const Dashboard = () => {
  const [opacity, setOpacity] = useState(59);
  const [date, setDate] = useState("December 2016");
  const [search, setSearch] = useState("Philippines");
  const [check, setCheck] = useState([
    {
      name: "Night Light Index",
      data: [18.5134857, 19.41991379, 20.02817852, 20.6667525, 21.3716695],
    },
  ]);

  const [iliganCheck, setIliganCheck] = useState([
    {
      name: "Night Light Index",
      data: [19.4311097, 19.74178298, 20.11172772, 20.26463057, 20.45074902],
    },
  ]);

  const changeOpacity = (value) => {
    const newVal = value / 60;
    setOpacity(newVal);
    getRange(value);
  };

  const handleSearch = (event) => {
    setSearch(event.search);
  };

  const getRange = (value) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const years = ["2012", "2013", "2014", "2015", "2016"];
    const newString = ` ${months[value % 12]}, ${years[parseInt(value / 12)]}`;
    setDate(newString);
  };

  const getMap = () => {
    switch (search) {
      case "Philippines":
        return <Map first={ph2016} second={ph2012} opacity={opacity} />;
        break;
      case "Iligan":
        return <Map first={ilgcdo2016} second={ilgcdo2012} opacity={opacity} />;
        break;
      default:
        break;
    }
  };

  const getGraph = () => {
    switch (search) {
      case "Philippines":
        return (
          <Card
            title={
              <Checkbox.Group
                options={chartOptions}
                defaultValue={["Night Light Index"]}
                onChange={onChange}
              />
            }
            style={{ opacity: "0.8" }}
          >
            <Chart options={options} series={series} type="line" height={250} />
          </Card>
        );
        break;
      case "Iligan":
        return (
          <Card
            title={
              <Checkbox.Group
                options={iliganChartOptions}
                defaultValue={["Population"]}
                onChange={iliganOnChange}
              />
            }
            style={{ opacity: "0.8" }}
          >
            <Chart
              options={options}
              series={iliganSeries}
              type="line"
              height={250}
            />
          </Card>
        );
        break;
      default:
        break;
    }
  };

  const series = check;
  const iliganSeries = iliganCheck;

  const options = {
    chart: {
      height: 50,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["2012", "2013", "2014", "2015", "2016"],
    },
  };

  const chartOptions = ["Night Light Index", "Mindanao RGDP"];
  const iliganChartOptions = ["Night Light Index", "Population"];

  const iliganOnChange = (checkedValues) => {
    const display = [
      {
        name: "Night Light Index",
        data: [19.4311097, 19.74178298, 20.11172772, 20.26463057, 20.45074902],
      },
      {
        name: "Population",
        data: [19.50405745, 19.75152855, 19.99899966, 20.25147248, 20.49394187],
      },
    ];

    const newValue = display.filter((disp) => {
      let checker = false;
      for (let i = 0; i < checkedValues.length; i++) {
        if (disp.name == checkedValues[i]) {
          checker = true;
          break;
        }
      }
      return checker;
    });
    setIliganCheck(newValue);
  };

  const onChange = (checkedValues) => {
    const display = [
      {
        name: "Night Light Index",
        data: [18.5134857, 19.41991379, 20.02817852, 20.6667525, 21.3716695],
      },
      {
        name: "Mindanao RGDP",
        data: [16.87305152, 18.27801903, 20.20865028, 21.22792314, 23.41235603],
      },
    ];

    const newValue = display.filter((disp) => {
      let checker = false;
      for (let i = 0; i < checkedValues.length; i++) {
        if (disp.name == checkedValues[i]) {
          checker = true;
          break;
        }
      }
      return checker;
    });
    setCheck(newValue);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#160604",
          width: "100%",
          height: "4em",
          marginBottom: "0%",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "95vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#03040e",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" width="220" />
          <Form onFinish={handleSearch}>
            <Form.Item name="search">
              <Input style={{ width: "25em" }} placeholder="Enter location" />
            </Form.Item>
          </Form>
          {getGraph()}
        </div>
        <div
          style={{
            top: "5%",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {getMap()}

          <Slider
            trackStyle={{ backgroundColor: "#fbe577" }}
            handleStyle={{ backgroundColor: "#fbe577", borderColor: "#fbe577" }}
            tooltip={{ open: false }}
            style={{ width: "100%" }}
            max={59}
            defaultValue={59}
            onChange={changeOpacity}
          />

          <span style={{ color: "white" }}>{date}</span>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
