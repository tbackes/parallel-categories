const d3 = require('d3');
const plotly = require('plotly.js-dist');
const dscc = require('@google/dscc');
const local = require('./localMessage.js');

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = false;

const isNull = (x) => {
  return !(x===0) && (x == null || x == "null" || x == "");
}

const isNumeric = (x) => {
  return !isNull(x) && !isNaN(x);
}

// parse the style value
const styleVal = (message, styleId) => {
  if (!!message.style[styleId].defaultValue && typeof message.style[styleId].defaultValue === "object") {
    return message.style[styleId].value.color !== undefined
      ? message.style[styleId].value.color
      : message.style[styleId].defaultValue.color;
  }
  return message.style[styleId].value !== undefined
    ? message.style[styleId].value
    : message.style[styleId].defaultValue;
};

// parse a style color -- defaulting to the theme color if applicable
const themeColor = (message, styleId, themeId='themeSeriesColor', idx=null) => {
  // if a user specifed value is present, keep that
  if (message.style[styleId].value.color !== undefined && !isNull(message.style[styleId].value.color)) {
    return message.style[styleId].value.color;
  }
  // otherwise use the theme color
  return isNumeric(idx)
    ? message.theme[themeId][idx].color
    : message.theme[themeId].color;
};

// parse a style value -- defaulting to the theme value if applicable
const themeValue = (message, styleId, themeId='themeFontFamily') => {
  return message.style[styleId].value !== undefined
    ? message.style[styleId].value
    : message.theme[themeId];
};

const hex_to_rgba_str = (hex_color, opacity) => {
  var hex_strip = hex_color.replace(new RegExp("^#"),"");
  hex_strip = (hex_strip.length==3)? hex_strip+hex_strip : hex_strip;
  var rgba = 'rgba(' 
    + parseInt(hex_strip.substring(0,2), 16) + ',' 
    + parseInt(hex_strip.substring(2,4), 16) + ',' 
    + parseInt(hex_strip.substring(4,6), 16) + ','
    + opacity + ')';
  return rgba
}

const isDate = (d) => {return d instanceof Date && isFinite(d)}

const toDate = (dateString) => {
  let year = dateString.substring(0,4)
  let month = dateString.substring(4,6)-1
  let day = dateString.substring(6,8)
  let hour = dateString.substring(8,10)
  let min = dateString.substring(10,12)
  let sec = dateString.substring(12,14)

  return new Date(year, month, day, hour, min, sec)
}

Date.prototype.addDays = function(days) {
    return new Date(this.valueOf()+(24*60*60*days))
}

// Function that allows you to group array `xs`` by `key`, and returns the result of the 
// reducing function `red` which uses default value []
const groupBy = function(xs, key, red = (acc, curr) => ([...acc, curr]), init = []) {
  return xs.reduce(function(rv, curr) {
    let acc = rv[curr[key]] || init;
    return { ...rv, [curr[key]]: red(acc, curr)};
  }, {});
};

const getAggSortOrder = (aggFunc, sortAscend, message, groupName, sortName) => {

  // calculate aggregate metrics by group
  const reduceFun = (red, x) => {
    return {
      "count": red.count+1, 
      "sum": red.sum + x[sortName][0], 
      "avg": (red.sum + x[sortName][0]) / (red.count + 1),
      "min": Math.min(red.min, x[sortName][0]),
      "max": Math.max(red.max, x[sortName][0])
    }
  };
  const init = {'count': 0, 'sum': 0, 'min': null, 'max': null};
  const groupMetrics = groupBy(message.tables.DEFAULT, groupName, reduceFun, init);

  // sort list of groups by the specified metric:
  const sortedGroups = Object.entries(groupMetrics)
    .sort(
      sortAscend 
      ? ([,a],[,b]) => (a[aggFunc] - b[aggFunc])
      : ([,a],[,b]) => (b[aggFunc] - a[aggFunc])
    )
    .reduce((red, [k, v]) => {red.push(k); return red}, []);

  return sortedGroups
};

const drawViz = message => {

  // set margins + canvas size
  const margin = { top: 10, bottom: 50, right: 10, left: 10 };
  const height = dscc.getHeight() - margin.top - margin.bottom;
  const width = dscc.getWidth() - margin.left - margin.right;

  // remove the div if it already exists
  if (document.querySelector("div")) {
    let oldDiv = document.querySelector("div");
    oldDiv.remove();
  }

  // create div for plotly plot
  const myDiv = document.createElement('div');
  myDiv.setAttribute("height", `${dscc.getHeight()}px`);
  myDiv.setAttribute("width", `${dscc.getWidth()}px`);

  document.body.appendChild(myDiv);

  // write your visualization code here
  // console.log("I'm the callback and I was passed this data: " + JSON.stringify(message.style, null, '  '));
  // console.log("Theme data: " + JSON.stringify(message.theme, null, '  '));

  // gather plot-level style parameters
  // -------------------------
  const chartTitle = styleVal(message, 'chartTitle');
  const xAxisDate = styleVal(message, 'xAxisDate');
  const xLabel = styleVal(message, 'xLabel');
  const yAxisMin = styleVal(message, 'yMin');
  const yAxisMax = styleVal(message, 'yMax');
  const yLabel = styleVal(message, 'yLabel');
  const metricFmt = styleVal(message, 'metricFormatString');
  const ciFmt = styleVal(message, 'ciFormatString');

  // get unique breakdown groups
  // -------------------------
  // Get sorted list of breakdown labels
  const sortAggFunc = styleVal(message, "sortAggFunc");
  const sortAscend = styleVal(message, "sortAscend") == 'Ascending';
  const breakdown_values = getAggSortOrder(sortAggFunc, sortAscend, message, "dimension_breakdown", "breakdown_sort_order")
  // const breakdown_values = [...new Set(message.tables.DEFAULT.map(d => d.dimension_breakdown[0]))];
  console.log('Sorted groups: ' + breakdown_values)
  let n_groups = breakdown_values.length
  if (breakdown_values.length > 10){
    console.log(`More than 10 group by categories provided (n=${n_groups}). Truncating to only plot first 10.`)
    n_groups = 10
  }

  // Gather re-used data
  // -------------------------
  const customdata = message.tables.DEFAULT.map(d => [d.metric_lower[0], d.metric_upper[0]]); 
  const hovertemplate = `<b>%{y:${metricFmt}}</b><i> (%{customdata[0]:${ciFmt}} - %{customdata[1]:${ciFmt}})</i>`;

  const xData = xAxisDate && isDate(toDate(message.tables.DEFAULT[0].dimension[0]))
    ? message.tables.DEFAULT.map(d => toDate(d.dimension[0])) 
    : message.tables.DEFAULT.map(d => d.dimension[0]);

  // loop through breakdown groups and add traces
  // -------------------------
  let data = []
  let i;
  for (i=0; i<n_groups; i++){
    // Gather all style parameters for series
    const metricLineWeight =  styleVal(message, 'metricLineWeight'+(i+1));
    const metricLineColor =  themeColor(message, 'metricColor'+(i+1), 'themeSeriesColor', i);
    const metricFillOpacity = styleVal(message, 'metricFillOpacity'+(i+1))
    const metricFillColor =  hex_to_rgba_str(metricLineColor, metricFillOpacity);
    const metricShowPoints =  styleVal(message, 'metricShowPoints'+(i+1));
    const metricHideCI =  styleVal(message, 'metricHideCI'+(i+1));

    // trace for metric trend line
    const trace_metric = {
      x: xData,
      y: message.tables.DEFAULT.map(d => d.metric[0]),
      customdata,
      line: {
        color: metricLineColor,
        width: metricLineWeight
      }, 
      mode: (metricShowPoints)? 'lines+markers' : 'lines', 
      transforms: [{
      	type: 'filter',
      	target: message.tables.DEFAULT.map(d => d.dimension_breakdown[0]),
        operation: '=',
        value: breakdown_values[i]
      }],
      name: breakdown_values[i], 
      type: "lines",
      legendgroup: 'metric'+i, 
      hovertemplate
    };

    // trace for lower bound of CI
    const trace_lower = {
      x: xData,
      y: message.tables.DEFAULT.map(d => d.metric_lower[0]),
      line: {width: 1}, 
      marker: {color: metricFillColor}, 
      mode: "lines", 
      transforms: [{
        type: 'filter',
        target: message.tables.DEFAULT.map(d => d.dimension_breakdown[0]),
        operation: '=',
        value: breakdown_values[i]
      }],
      name: `${breakdown_values[i]}: ${message.fields.metric_lower[0].name}`, 
      type: "scatter",
      legendgroup: 'ci'+i,
      hoverinfo: 'skip', 
      visible: (metricHideCI)? 'legendonly' : true,
      showlegend: false
    };

    // trace for upper bound of CI
    const trace_upper = {
      x: xData,
      y: message.tables.DEFAULT.map(d => d.metric_upper[0]),
      line: {width: 1}, 
      fill: "tonexty", 
      fillcolor: metricFillColor, 
      marker: {color: metricFillColor}, 
      line: {color: metricFillColor}, 
      mode: "lines", 
      transforms: [{
        type: 'filter',
        target: message.tables.DEFAULT.map(d => d.dimension_breakdown[0]),
        operation: '=',
        value: breakdown_values[i]
      }],
      name: `${breakdown_values[i]}: ${message.fields.metric_upper[0].name}`,
      type: "scatter",
      legendgroup: 'ci'+i,
      hoverinfo: 'skip', 
      visible: (metricHideCI)? 'legendonly' : true,
      showlegend: true
    };

    data.push(trace_metric, trace_lower, trace_upper);
  }

  // Chart Titles
  // -------------------------
  const chartTitleLayout = isNull(chartTitle) ? {} : {text: chartTitle};
  const xAxisLayout = isNull(xLabel) ? {} : {title: {text: xLabel}};
  const yAxisLayout = isNull(yLabel) ? {tickformat: metricFmt} : {tickformat: metricFmt, title: {text: yLabel}};

  // format y-axis range
  // -------------------------
  if (!isNumeric(yAxisMin) && !isNumeric(yAxisMax)){
    yAxisLayout.range = 'auto'
  }
  else if (!isNumeric(yAxisMin)){
    const minValue = Math.min.apply(Math, message.tables.DEFAULT.map(function(d) {return Math.min(...d.metric_lower)}));
    yAxisLayout.range = [0.9*minValue, yAxisMax];
  }
  else if (!isNumeric(yAxisMax)){
    const maxValue = Math.max.apply(Math, message.tables.DEFAULT.map(function(d) {return Math.max(...d.metric_upper)}));
    yAxisLayout.range = [yAxisMin, 1.1*maxValue];
  }
  else{
    yAxisLayout.range = [yAxisMin, yAxisMax];
  }

  // Layout config
  // -------------------------
  const layout = {
    height: height+60,
    showlegend: true,
    yaxis: yAxisLayout,
    xaxis: xAxisLayout,
    title: chartTitleLayout,
  };

  plotly.newPlot(myDiv, data, layout);
};

// renders locally
if (LOCAL) {
  drawViz(local.message);
} else {
  dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});
}