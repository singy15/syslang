
function val(expr, root) {
  let cur = root;
  let paths = expr.substr(1).split(".");
  for(var i = 0; i < paths.length; i++) {
    cur = root[paths[i]];
  }
  return cur;
}

let $system = {
  VIEW_COMPONENT_TYPE: {
    DATETIMEPICKER: "VIEW_COMPONENT_TYPE.DATETIMEPICKER",
    TEXTBOX: "VIEW_COMPONENT_TYPE.TEXTBOX",
    NUMBERBOX: "VIEW_COMPONENT_TYPE.NUMBERBOX",
    BUTTON: "VIEW_COMPONENT_TYPE.BUTTON",
  },
  DATA_TYPE: {
    DATETIME: "DATA_TYPE.DATETIME",
    TEXT: "DATA_TYPE.TEXT",
    NUMBER: "DATA_TYPE.NUMBER",
  },
  IO_TYPE: {
    DB: "IO_TYPE.DB",
    FILE: "IO_TYPE.FILE",
    MODEL: "IO_TYPE.MODEL",
  },
  $packages: {
    SALE: {
      $views: {
        REGISTER_SALE: {
          $viewItems: {
            SALE_NO: {
              type: "#VIEW_COMPONENT_TYPE.NUMBERBOX"
              label: "発行日"
            },
            ISSUE_DATE: {
              type: "#VIEW_COMPONENT_TYPE.DATETIMEPICKER",
              label: "発行日"
            },
            DESCRIPTION: {
              type: "#VIEW_COMPONENT_TYPE.TEXTBOX",
              label: "摘要"
            },
            AMOUNT: {
              type: "#VIEW_COMPONENT_TYPE.NUMBERBOX",
              label: "金額"
            },
          },
        }
      },
      $processes: {
        REGISTER: {
          $params: {
            VIEW: "#SALE.$views.REGISTER_SALE"
          },
          $steps: {
            $list: [
              "(use-package #DOMAIN_SALE)",
              "(define model (new #.$models.SALE))",
              "(copy-to @VIEW model)",
              "(#.$ios.INSERT_SALE model)",
            ]
          }
        }
      },
    },
    DOMAIN_SALE: {
      $ios: {
        INSERT_SALE: {
          type: "#IO_TYPE.DB",
          $params: {
            MODEL: {
              type: "#DOMAIN_SALE.$models.SALE"
            }
          },
          sql: "INSERT INTO SALE (SALE_NO,ISSUE_DATE,DESCRIPTION,AMOUNT) VALUES (@MODEL.SALE_NO,@MODEL.ISSUE_DATE,@MODEL.DESCRIPTION,@MODEL.AMOUNT)"
        }
      },
      $models: {
        SALE: {
          SALE_NO: {
            type: "#DATA_TYPE.NUMBER"
          },
          ISSUE_DATE: {
            type: "#DATA_TYPE.DATETIME"
          },
          DESCRIPTION: {
            type: "#DATA_TYPE.TEXT"
          },
          AMOUNT: {
            type: "#DATA_TYPE.NUMBER"
          },
        }
      }
    }
  }
};

