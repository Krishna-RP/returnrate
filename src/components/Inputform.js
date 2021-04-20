import React, { useState } from "react";
import "../App.css";
import Highchart from "highcharts/highcharts.src";
import HighchartsReact from "highcharts-react-official";
import { Button, Form, FormField, Segment } from "semantic-ui-react";
import RateFinder from "./RateFinder";

function InputForm() {
  const [initial, setInitial] = useState("");
  const [years, setYears] = useState("");
  const [annual, setAnnual] = useState("");
  const [inflation, setInflation] = useState("");
  const [targetamount, setTargetAmount] = useState("");
  const [rate, setRate] = useState("");
  const [options, setOptions] = useState({
    title: {
      text: "Annual Rate of return on Investment",
    },
    xAxis: {
      title: {
        text: "Number of years",
      },
    },
    yAxis: {
      title: {
        text: "Value of investment",
      },
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  function handleClear() {
    window.location.reload();
  }

  function handleSubmit(e) {
    var i = parseFloat(initial),
      y = parseFloat(years),
      a = parseFloat(annual),
      inf = parseFloat(inflation),
      t = parseFloat(targetamount);

    var realRateofReturn = [];
    realRateofReturn = RateFinder(i, t, a, y);
    if (realRateofReturn.length === 0) {
      const confirmBox = window.confirm(
        "Please check the values as investment already exceeds target?"
      );
      if (confirmBox === false) {
        handleClear();
      }
    } else {
      var nominalRate = ((1 + realRateofReturn[0]) * (1 + inf / 100) - 1) * 100;
      setRate(nominalRate);
    }

    var results = [];
    var investment = i;
    for (var j = 0; j <= y; j++) {
      results[j] = Math.round(investment);

      investment =
        investment * (1 + realRateofReturn[0]) +
        (a * (1 + realRateofReturn[0] - 1)) / realRateofReturn[0];
    }

    setOptions({
      title: {
        text: "Annual Rate of return on Investment",
      },
      xAxis: {
        title: {
          text: "Number of years",
        },
      },
      yAxis: {
        title: {
          text: "Value of investment",
        },
      },
      series: [
        {
          name: "",
          data: results,
        },
      ],
    });
  }

  return (
    <>
      <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormField>
            <label> Initial Amount ($)</label>
            <Form.Input
              required
              onChange={(e) => setInitial(e.target.value)}
              name="initial"
              placeholder="Amount in dollars"
              type="number"
            />
          </FormField>

          <FormField>
            <label> Target Amount ($) </label>
            <Form.Input
              required
              min={(parseFloat(initial) + 1).toString()} // assuming that you want to set your goal higher than you invested value
              onChange={(e) => setTargetAmount(e.target.value)}
              type="number"
              placeholder="Amount in dollars"
              name="targetamount"
            />
          </FormField>

          <FormField>
            <label> Number of years</label>
            <Form.Input
              required
              onChange={(e) => setYears(e.target.value)}
              type="number"
              placeholder="eg: 15"
              name="years"
            />
          </FormField>

          <FormField>
            <label> Annual Contribution at the year end ($) </label>
            <Form.Input
              required
              min="0"
              onChange={(e) => setAnnual(e.target.value)}
              type="number"
              placeholder="Amount in dollars"
              name="annual"
            />
          </FormField>

          <FormField>
            <label> Inflation Rate</label>
            <Form.Input
              required
              onChange={(e) => setInflation(e.target.value)}
              type="decimal"
              placeholder="Rate in percentage"
              name="inflation"
            />
          </FormField>

          {rate && (
            <FormField>
              <label> Required Rate of Return</label>
              <label style={{ fontWeight: 400 }}> {rate.toFixed(2)} </label>
            </FormField>
          )}

          <Button
            autoFocus
            className="small ui button"
            floated="right"
            positive
            type="submit"
            content="Calculate"
          />

          <Button
            className="small ui button"
            floated="right"
            negative
            onClick={handleClear}
            content="Clear"
            type="button"
          />
        </Form>
      </Segment>
      <div>
        <HighchartsReact highcharts={Highchart} options={options} />
      </div>
    </>
  );
}
export default InputForm;
