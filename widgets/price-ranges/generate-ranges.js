function round(v, precision) {
  var res = Math.round(v / precision) * precision;
  if (res < 1) {
    res = 1;
  }
  return res;
}

function generateRanges(stats) {
  var precision;
  if (stats.avg < 100) {
    precision = 1;
  } else if (stats.avg < 1000) {
    precision = 10;
  } else {
    precision = 100;
  }
  var avg = round(Math.round(stats.avg), precision);
  var min = Math.ceil(stats.min);
  var max = round(Math.floor(stats.max), precision);
  while (max > stats.max) {
    max -= precision;
  }

  var next;
  var from;
  var facetValues = [];
  if (min !== max) {
    next = round(min, precision);
    facetValues.push({
      to: next
    });
    while (next < avg) {
      from = facetValues[facetValues.length - 1].to;
      next = round(from + (avg - min) / 3, precision);
      facetValues.push({
        from: from,
        to: next
      });
    }
    while (next < max) {
      from = facetValues[facetValues.length - 1].to;
      next = round(from + (max - avg) / 3, precision);
      facetValues.push({
        from: from,
        to: next
      });
    }

    if (facetValues.length === 1) {
      if (next !== avg) {
        facetValues.push({
          from: next,
          to: avg
        });
        next = avg;
      }
    }

    if (facetValues.length === 1) {
      facetValues[0].from = stats.min;
      facetValues[0].to = stats.max;
    } else {
      delete facetValues[facetValues.length - 1].to;
    }
  }
  return facetValues;
}

module.exports = generateRanges;
