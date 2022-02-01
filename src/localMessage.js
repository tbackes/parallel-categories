export const message = {
  "tables": {
    "DEFAULT": [
      {
        "dimension": [
          1
        ],
        "dimension_breakdown": [
          "Group A"
        ],
        "metric": [
          1.5
        ],
        "metric_lower": [
          0.5
        ],
        "metric_upper": [
          2
        ],
        "breakdown_sort_order": [
          2
        ]
      },
      {
        "dimension": [
          2
        ],
        "dimension_breakdown": [
          "Group A"
        ],
        "metric": [
          1.7
        ],
        "metric_lower": [
          1
        ],
        "metric_upper": [
          3
        ],
        "breakdown_sort_order": [
          2
        ]
      },
      {
        "dimension": [
          3
        ],
        "dimension_breakdown": [
          "Group A"
        ],
        "metric": [
          1.5
        ],
        "metric_lower": [
          0.8
        ],
        "metric_upper": [
          2.5
        ],
        "breakdown_sort_order": [
          2
        ]
      },
      {
        "dimension": [
          4
        ],
        "dimension_breakdown": [
          "Group A"
        ],
        "metric": [
          1.6
        ],
        "metric_lower": [
          1.2
        ],
        "metric_upper": [
          4
        ],
        "breakdown_sort_order": [
          2
        ]
      },
      {
        "dimension": [
          5
        ],
        "dimension_breakdown": [
          "Group A"
        ],
        "metric": [
          1.4
        ],
        "metric_lower": [
          0.9
        ],
        "metric_upper": [
          3.5
        ],
        "breakdown_sort_order": [
          2
        ]
      },
      {
        "dimension": [
          1
        ],
        "dimension_breakdown": [
          "Group B"
        ],
        "metric": [
          4.5
        ],
        "metric_lower": [
          4.2
        ],
        "metric_upper": [
          5
        ],
        "breakdown_sort_order": [
          5
        ]
      },
      {
        "dimension": [
          2
        ],
        "dimension_breakdown": [
          "Group B"
        ],
        "metric": [
          2.5
        ],
        "metric_lower": [
          1.5
        ],
        "metric_upper": [
          3.1
        ],
        "breakdown_sort_order": [
          5
        ]
      },
      {
        "dimension": [
          3
        ],
        "dimension_breakdown": [
          "Group B"
        ],
        "metric": [
          3
        ],
        "metric_lower": [
          2.9
        ],
        "metric_upper": [
          4.1
        ],
        "breakdown_sort_order": [
          5
        ]
      },
      {
        "dimension": [
          4
        ],
        "dimension_breakdown": [
          "Group B"
        ],
        "metric": [
          5
        ],
        "metric_lower": [
          3.5
        ],
        "metric_upper": [
          5.2
        ],
        "breakdown_sort_order": [
          5
        ]
      }
    ]
  },
  "fields": {
    "dimension": [
      {
        "id": "qt_a62c3nqogc",
        "name": "Index",
        "type": "NUMBER",
        "concept": "DIMENSION"
      }
    ],
    "metric": [
      {
        "id": "qt_b5537nqogc",
        "name": "est",
        "type": "NUMBER",
        "concept": "METRIC"
      },
      {
        "id": "qt_zvecch1jgc",
        "name": "Metric 2",
        "type": "NUMBER",
        "concept": "METRIC"
      },
      {
        "id": "qt_z45cch1jgc",
        "name": "Metric 3",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "metric_lower": [
      {
        "id": "qt_4x3c3nqogc",
        "name": "ci_lower",
        "type": "NUMBER",
        "concept": "METRIC"
      },
      {
        "id": "qt_zv235h1jgc",
        "name": "Metric 2 - 95% CI (Lower)",
        "type": "NUMBER",
        "concept": "METRIC"
      },
      {
        "id": "qt_zv23567jgc",
        "name": "Metric 3 - 95% CI (Lower)",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "metric_upper": [
      {
        "id": "qt_ec9ldoqogc",
        "name": "ci_upper",
        "type": "NUMBER",
        "concept": "METRIC"
      },
      {
        "id": "qt_zv23444jgc",
        "name": "Metric 2 - 95% CI (Upper)",
        "type": "NUMBER",
        "concept": "METRIC"
      },
      {
        "id": "qt_zv235h55gc",
        "name": "Metric 3 - 95% CI (Lower)",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ],
    "breakdown_sort_order": [
      {
        "id": "djlkjsjfjjf",
        "name": "Sort Order",
        "type": "NUMBER",
        "concept": "METRIC"
      }
    ]
  },
  "style": {
    "chartTitle": {
      "value": "Grouped<br>Try multiline",
      "defaultValue": ""
    },
    "sortAggFunc": {
      "value": "max",
      "defaultValue": "avg"
    },
    "sortAscend": {
      "value": "Ascending",
      "defaultValue": "Descending"
    },
    "xAxisDate": {
      "value": false,
      "defaultValue": false
    },
    "xLabel": {
      "value": "X axis",
      "defaultValue": null
    },
    "yMin": {
      "value": null,
      "defaultValue": null
    },
    "yMax": {
      "value": null,
      "defaultValue": null
    },
    "yLabel": {
      "value": "Test Label",
      "defaultValue": null
    },
    "metricFormatString": {
      "value": ".3%",
      "defaultValue": ",.0f"
    },
    "ciFormatString": {
      "value": ",.0f",
      "defaultValue": ",.0f"
    },
    "metricLineWeight1": {
      "value": 2,
      "defaultValue": 2
    },
    "metricColor1": {
      "value": {
        "color": null
      },
      "defaultValue": {
        "color": "#0072f0"
      }
    },
    "metricFillColor1": {
      "value": {
        "color": "#0072f0"
      },
      "defaultValue": {
        "color": "#0072f0"
      }
    },
    "metricShowPoints1": {
      "value": true,
      "defaultValue": true
    },
    "metricLineWeight2": {
      "value": 2,
      "defaultValue": 2
    },
    "metricColor2": {
      "value": {
        "color": "#00b6cb"
      },
      "defaultValue": {
        "color": "#00b6cb"
      }
    },
    "metricFillColor2": {
      "value": {
        "color": "#00b6cb"
      },
      "defaultValue": {
        "color": "#00b6cb"
      }
    },
    "metricShowPoints2": {
      "value": true,
      "defaultValue": true
    },
    "metricLineWeight3": {
      "value": 2,
      "defaultValue": 2
    },
    "metricColor3": {
      "value": {
        "color": null
      },
      "defaultValue": {
        "color": "#f10096"
      }
    },
    "metricFillColor3": {
      "value": {
        "color": "#f66d00"
      },
      "defaultValue": {
        "color": "#f10096"
      }
    },
    "metricShowPoints3": {
      "value": true,
      "defaultValue": true
    },
    "metricHideCI1": {
      "value": true,
      "defaultValue": false
    },
    "metricHideCI2": {
      "value": false,
      "defaultValue": false
    },
    "metricHideCI3": {
      "value": false,
      "defaultValue": false
    },
    "metricFillOpacity1": {
      "value": 0.3,
      "defaultValue": 0.1
    },
    "metricFillOpacity2": {
      "value": 0.2,
      "defaultValue": 0.1
    },
    "metricFillOpacity3": {
      "value": 0.5,
      "defaultValue": 0.1
    }
  },
  "theme": {
    "themeFillColor": {
      "color": "#ffffff",
      "themeRef": {
        "index": 0
      }
    },
    "themeFontColor": {
      "color": "#000000",
      "themeRef": {
        "index": 1
      }
    },
    "themeFontFamily": "Roboto",
    "themeAccentFillColor": {
      "color": "#e0e0e0",
      "themeRef": {
        "index": 2
      }
    },
    "themeAccentFontColor": {
      "color": "#000000",
      "themeRef": {
        "index": 3
      }
    },
    "themeAccentFontFamily": "Roboto",
    "themeSeriesColor": [
      {
        "color": "#0072f0",
        "seriesRef": {
          "index": 0
        },
        "themeRef": {
          "index": 4
        }
      },
      {
        "color": "#00b6cb",
        "seriesRef": {
          "index": 1
        },
        "themeRef": {
          "index": 5
        }
      },
      {
        "color": "#f10096",
        "seriesRef": {
          "index": 2
        },
        "themeRef": {
          "index": 6
        }
      },
      {
        "color": "#f66d00",
        "seriesRef": {
          "index": 3
        },
        "themeRef": {
          "index": 7
        }
      },
      {
        "color": "#ffa800",
        "seriesRef": {
          "index": 4
        },
        "themeRef": {
          "index": 8
        }
      },
      {
        "color": "#7cb342",
        "seriesRef": {
          "index": 5
        },
        "themeRef": {
          "index": 9
        }
      },
      {
        "color": "#5e35b1",
        "seriesRef": {
          "index": 6
        }
      },
      {
        "color": "#03a9f4",
        "seriesRef": {
          "index": 7
        }
      },
      {
        "color": "#ec407a",
        "seriesRef": {
          "index": 8
        }
      },
      {
        "color": "#ff7043",
        "seriesRef": {
          "index": 9
        }
      },
      {
        "color": "#737373",
        "seriesRef": {
          "index": 10
        }
      },
      {
        "color": "#f15a60",
        "seriesRef": {
          "index": 11
        }
      },
      {
        "color": "#7ac36a",
        "seriesRef": {
          "index": 12
        }
      },
      {
        "color": "#5a9bd4",
        "seriesRef": {
          "index": 13
        }
      },
      {
        "color": "#faa75a",
        "seriesRef": {
          "index": 14
        }
      },
      {
        "color": "#9e67ab",
        "seriesRef": {
          "index": 15
        }
      },
      {
        "color": "#ce7058",
        "seriesRef": {
          "index": 16
        }
      },
      {
        "color": "#d77fb3",
        "seriesRef": {
          "index": 17
        }
      },
      {
        "color": "#81d4fa",
        "seriesRef": {
          "index": 18
        }
      },
      {
        "color": "#f48fb1",
        "seriesRef": {
          "index": 19
        }
      }
    ],
    "themeIncreaseColor": {
      "color": "#388e3c"
    },
    "themeDecreaseColor": {
      "color": "#f44336"
    },
    "themeGridColor": {
      "color": "#d1d1d1"
    }
  },
  "interactions": {}
};