import React from "react";
// nerdamer imports
import nerdamer from "nerdamer/all";
import "nerdamer/Algebra";
import "nerdamer/Calculus";
import "nerdamer/Solve";
import "nerdamer/Extra";

//solving the equation using nerdamer for realRateOfTheInvestment.

const RateFinder = (initial, targetamount, annual, years) => {
  var i = initial,
    t = targetamount,
    a = annual,
    y = years;
  let values = [];

  var sol = nerdamer.solve(`${t}=${i}(1+R)^${y}+(${a}/R)*((1+R)^${y}-1)`, "R"); //the rate equation

  var payloads = sol.text();
  var resPay = payloads.split(","); // converting the equation to get the value to solve for "R"
  resPay.forEach((element) => {
    element = element.replace("[", ""); // adjusting to the solution because the solution is give out in vector form
    element = element.replace("]", ""); // adjusting to the solution because the solution is give out in vector form

    if (!element.includes("i")) {
      // checking to see if we get some complex numbers
      var c = eval(element);
    }
    if (c > 0) {
      // taking only the positive answers for rate
      values.push(c);
    }
  });
  return values;
};

export default RateFinder;

/*Using this website as a reference for my application 
https://www.bankrate.com/calculators/retirement/investment-goal-calculator.aspx */