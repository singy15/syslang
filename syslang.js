let DataType = {
  DateTime: 1,
  Text: 2,
  Number: 3
};

let IOType = {
  DB: 1,
  File: 2,
  Model: 3
};

let $system = {
  $packages: {
    SALE: {
      $views: {
        REGISTER_SALE: {
          $viewItems: {
            SALE_NO: {
              type: DataType.Number,
              label: "発行日"
            },
            ISSUE_DATE: {
              type: DataType.DateTime,
              label: "発行日"
            },
            DESCRIPTION: {
              type: DataType.Text,
              label: "摘要"
            },
            AMOUNT: {
              type: DataType.Number,
              label: "金額"
            },
            REGISTER: {
              type: ViewItemType.Button,
              label: "登録",
            }
          },
        }
      },
      $processes: {
        REGISTER: {
          $params: {
            VIEW: ref(`#SALE.$views.REGISTER_SALE`)
          },
          $steps: {
            $list: [
              `(use-package #DOMAIN_SALE)`,
              //`var model = new #DOMAIN_SALE.$models.SALE()`,
              `(define model (new #.$models.SALE))`,
              //`copyTo(@VIEW,model)`,
              `(copy-to @VIEW model)`,
              //`#DOMAIN_SALE.$ios.INSERT_SALE(model)`,
              `(#.$ios.INSERT_SALE model)`,
            ]
          }
        }
      },
    },
    DOMAIN_SALE: {
      $ios: {
        INSERT_SALE: {
          type: IOType.DB,
          $params: {
            MODEL: {
              type: ref(`#DOMAIN_SALE.$models.SALE`)
            }
          },
          sql: `INSERT INTO SALE (SALE_NO,ISSUE_DATE,DESCRIPTION,AMOUNT) VALUES (@MODEL.SALE_NO,@MODEL.ISSUE_DATE,@MODEL.DESCRIPTION,@MODEL.AMOUNT)`
        }
      },
      $models: {
        SALE: {
          SALE_NO: {
            type: DataType.Number
          },
          ISSUE_DATE: {
            type: DataType.DateTime,
          },
          DESCRIPTION: {
            type: DataType.Text,
          },
          AMOUNT: {
            type: DataType.Number,
          },
        }
      }
    }
  }
};

