<template>
  <div>
    <v-container
      ><v-row
        ><v-col>
          <v-form ref="form">
            <v-container class="flush">
              <v-row>
                <v-col>
                  <div class="builder-header mb-4">Statute Keyword Search:</div>
                  <v-text-field
                    v-model="keyword"
                    filled
                    label="Enter keyword"
                    style="font-weight: bold !important"
                    hint="Keyword is optional"
                    @keyup="submit()"
                  ></v-text-field
                ></v-col>
                <v-col>
                  <div class="builder-header mb-4">
                    Select Truth in Sentencing:
                  </div>
                  <v-select
                    filled
                    v-model="cboTIS"
                    :items="cboTISItems"
                    label="Select"
                    persistent-hint
                    single-line
                    @change="submit()"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>

            <v-container fluid class="flush spacer">
              <v-row>
                <v-col
                  ><div class="builder-header">
                    Select by Mandatory Setence:
                  </div>
                  <v-checkbox
                    v-model="ckSentenceCS"
                    label="Community Service"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckSentenceFine"
                    label="Fine"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckSentence1Year"
                    label="Imprisonment less than 1 year"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckMandIDOC"
                    label="Imprisonment 1 year or more/non-probationable offenses"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox>
                </v-col>
                <v-col
                  ><div class="builder-header">Select Other Requirements:</div>
                  <v-checkbox
                    v-model="ckRegSexOffender"
                    label="Sex offender registration required"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegArson"
                    label="Arson registration required"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegViolentVsChildren"
                    label="Violent offender against youth registration required"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegMeth"
                    label="Methamphetamine registration required"
                    color="grey darken-4"
                    hide-details
                    @click="submit()"
                  ></v-checkbox
                ></v-col>
              </v-row>
            </v-container>

            <v-container fluid class="flush spacer">
              <v-row
                ><v-col
                  ><div class="builder-header">
                    Select Offense Classes:
                  </div></v-col
                ></v-row
              >
              <v-row>
                <v-col
                  style="
                    background: #fcfcfc;
                    border: 1px solid #ddd;
                    padding: 0;
                    margin: 0;
                  "
                  class="mr-2"
                >
                  <div
                    class="d-flex px-2 py-0 pt-3"
                    style="background: #666; color: #fff"
                  >
                    <strong>Felonies</strong>
                    <v-spacer></v-spacer>

                    <!-- <v-checkbox
                      v-model="ckFeloniesCheckAll"
                      dark
                      label="Check All"
                      color="grey darken-4"
                      hide-details
                      style="margin-top: -5px"
                      @click="submit()"
                    ></v-checkbox> -->
                  </div>
                  <div class="px-4 py-2 pb-4">
                    <v-checkbox
                      v-model="felonies.ckMurder"
                      label="Murder"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClassX"
                      label="Class X"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass1"
                      label="Class 1"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass2"
                      label="Class 2"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass3"
                      label="Class 3"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass4"
                      label="Class 4"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox></div></v-col
                ><v-col
                  style="
                    background: #fcfcfc;
                    border: 1px solid #ddd;
                    padding: 0;
                    margin: 0;
                  "
                  class="mr-2"
                >
                  <div
                    class="d-flex px-2 py-0 pt-3"
                    style="background: #666; color: #fff"
                  >
                    <strong>Misdemeanors</strong>
                    <v-spacer></v-spacer>

                    <!-- <v-checkbox
                      v-model="ckMisdemeanorsCheckAll"
                      label="Check All"
                      dark
                      color="grey darken-3"
                      hide-details
                      style="margin-top: -5px"
                      @click="submit()"
                    ></v-checkbox> -->
                  </div>
                  <div class="px-4 py-2">
                    <v-checkbox
                      v-model="misdemeanors.ckClassA"
                      label="Class A"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="misdemeanors.ckClassB"
                      label="Class B"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="misdemeanors.ckClassC"
                      label="Class C"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox></div></v-col
                ><v-col
                  style="
                    background: #fcfcfc;
                    border: 1px solid #ddd;
                    padding: 0;
                    margin: 0;
                  "
                  class="mr-2"
                >
                  <div
                    class="d-flex px-2 py-0 pt-3"
                    style="background: #666; color: #fff"
                  >
                    <strong>Miscellaneous</strong>
                    <v-spacer></v-spacer>

                    <!-- <v-checkbox
                      v-model="ckMiscellaneousCheckAll"
                      label="Check All"
                      dark
                      color="grey darken-4"
                      hide-details
                      style="margin-top: -5px"
                      @click="submit()"
                    ></v-checkbox> -->
                  </div>
                  <div class="px-4 py-2">
                    <v-checkbox
                      v-model="miscellaneous.ckPetty"
                      label="Petty Offenses"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="miscellaneous.ckBusiness"
                      label="Business Expenses"
                      color="grey darken-4"
                      hide-details
                      @click="submit()"
                    ></v-checkbox></div></v-col></v-row
            ></v-container> </v-form></v-col></v-row
    ></v-container>
    <v-container class="" style="margin-top: -20px">
      <v-row class="mb-8">
        <v-col>
          <v-textarea
            v-model="strSQL"
            name="sql"
            class="mt-10"
            ref="sql"
            label="SQL"
            outlined
            style="font-size: 14px"
          ></v-textarea>
          <div class="d-flex mt-0" style="">
            <v-spacer></v-spacer>
            <v-btn small outlined class="mr-4" @click="reset()"> reset </v-btn>
            <v-btn small @click="execute()" dark color="grey darken-2"
              >Execute SQL<v-icon right>arrow_right</v-icon></v-btn
            >
          </div></v-col
        ></v-row
      >
    </v-container>
    <v-container style="margin-top: -50px !important"
      ><v-row>
        <v-col>
          <pre
            class="error mt-0 py-3 px-3"
            v-if="err && $store.state.isDbReady"
            style="width: 100%"
            >{{ err.toString() }}</pre
          >
          <pre
            class="error mt-0 py-3 px-3"
            v-if="status && $store.state.isDbReady"
            style="width: 100%"
          >
No results</pre
          >
        </v-col></v-row
      ></v-container
    >
    <v-container
      ><v-row
        ><v-col>
          <div>
            <div
              v-if="queryTime && res && !err"
              style="font-size: 12px"
              class="mr-2 mt-12 d-flex"
            >
              <v-spacer></v-spacer>
              Database
              <strong>&nbsp;{{ database }}</strong
              >&nbsp;/&nbsp;Query
              <strong>&nbsp;{{ queryTime }}ms</strong>&nbsp;/&nbsp;Rows returned
              <strong>&nbsp;{{ queryLength }}</strong>
            </div>
            <div
              id="results"
              class="mt-0 pt-0"
              :class="{ divider: $store.state.isDbReady && res }"
            ></div></div></v-col></v-row
    ></v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { EventBus } from "@/event-bus";
let FileSaver = require("file-saver");
function doubleScroll(element) {
  var scrollbar = document.createElement("div");
  scrollbar.appendChild(document.createElement("div"));
  scrollbar.style.overflow = "auto";
  scrollbar.style.overflowY = "hidden";
  scrollbar.style.marginBottom = "15px";
  scrollbar.firstChild.style.width = element.scrollWidth + "px";
  scrollbar.firstChild.style.paddingTop = "1px";

  scrollbar.firstChild.appendChild(document.createTextNode("\xA0"));
  var running = false;
  scrollbar.onscroll = function () {
    if (running) {
      running = false;
      return;
    }
    running = true;
    element.scrollLeft = scrollbar.scrollLeft;
  };
  element.onscroll = function () {
    if (running) {
      running = false;
      return;
    }
    running = true;
    scrollbar.scrollLeft = element.scrollLeft;
  };
  element.parentNode.insertBefore(scrollbar, element);
}
export default {
  name: "builder",
  mounted() {
    window.$vue = this;
    this.submit();
  },
  data() {
    return {
      strSQL: "",
      builderObj: () => {},
      debug: false,
      keyword: "",
      cboTIS: 0,
      cboTISItems: [
        { text: "No selection", value: 0 },
        { text: "100% Sentence", value: 1 },
        { text: "85% Sentence", value: 2 },
        { text: "75% Sentence", value: 3 },
      ],
      ckSentenceCS: false,
      ckSentenceFine: false,
      ckSentence1Year: false,
      ckMandIDOC: false,
      ckRegSexOffender: false,
      ckRegArson: false,
      ckRegViolentVsChildren: false,
      ckRegMeth: false,
      ckMurder: false,
      ckClassX: false,
      ckClass1: false,
      ckClass2: false,
      ckClass3: false,
      ckClass4: false,
      ckFeloniesCheckAll: false,
      ckMisdemeanorsCheckAll: false,
      ckMiscellaneousCheckAll: false,
      felonies: {
        ckMurder: false,
        ckClassX: false,
        ckClass1: false,
        ckClass2: false,
        ckClass3: false,
        ckClass4: false,
      },
      misdemeanors: {
        ckClassA: false,
        ckClassB: false,
        ckClassC: false,
      },
      miscellaneous: {
        ckPetty: false,
        ckBusiness: false,
      },
      res: null,
      err: null,
      status: null,
      queryTime: null,

      queryLength: null,
      loading: null,
      ready: false,

      database: "statutes.db",
      metadata: {
        message:
          "This is a custom header message and will appear on exported files",
        timestamp: null,
      },
      messageTop: null,
    };
  },
  watch: {
    ckFeloniesCheckAll(newValue) {
      for (const [key] of Object.entries(this.felonies)) {
        this.felonies[key] = newValue;
      }
    },
    ckMisdemeanorsCheckAll(newValue) {
      for (const [key] of Object.entries(this.misdemeanors)) {
        this.misdemeanors[key] = newValue;
      }
    },
    ckMiscellaneousCheckAll(newValue) {
      for (const [key] of Object.entries(this.miscellaneous)) {
        this.miscellaneous[key] = newValue;
      }
    },
  },
  methods: {
    submit() {
      this.builderObj = {
        keyword: this.keyword,
        cboTIS: this.cboTIS,
        ckSentenceCS: this.ckSentenceCS,
        ckSentenceFine: this.ckSentenceFine,
        ckSentence1Year: this.ckSentence1Year,
        ckMandIDOC: this.ckMandIDOC,
        ckRegSexOffender: this.ckRegSexOffender,
        ckRegArson: this.ckRegArson,
        ckRegViolentVsChildren: this.ckRegViolentVsChildren,
        ckRegMeth: this.ckRegMeth,
        ckMurder: this.felonies.ckMurder,
        ckClassX: this.felonies.ckClassX,
        ckClass1: this.felonies.ckClass1,
        ckClass2: this.felonies.ckClass2,
        ckClass3: this.felonies.ckClass3,
        ckClass4: this.felonies.ckClass4,
        ckClassA: this.misdemeanors.ckClassA,
        ckClassB: this.misdemeanors.ckClassB,
        ckClassC: this.misdemeanors.ckClassC,
        ckPetty: this.miscellaneous.ckPetty,
        ckBusiness: this.miscellaneous.ckBusiness,
      };
      this.buildSql(this.builderObj);
    },
    buildSql({
      keyword,
      cboTIS,
      ckSentenceCS,
      ckSentenceFine,
      ckSentence1Year,
      ckMandIDOC,
      ckRegSexOffender,
      ckRegArson,
      ckRegViolentVsChildren,
      ckRegMeth,
      ckMurder,
      ckClassX,
      ckClass1,
      ckClass2,
      ckClass3,
      ckClass4,
      ckClassA,
      ckClassB,
      ckClassC,
      ckPetty,
      ckBusiness,
    }) {
      console.log("buildSQL started");
      if (this.keyword && this.keyword.length) {
        this.keyword = this.keyword.replace(/'/g, "''");
        this.keyword = this.keyword.replace(/%/g, "\\%");
        this.keyword = this.keyword.replace(/_/g, "\\_");
      }

      let txtSearchTerm_adv = this.keyword;
      let ckUseOffenseClass;
      let iOffenseClassesChecked;
      let strSQL = `SELECT s.ID, s.Code, s.statute, s.section, s.Offensetitle, s.SentenceDeterminant, s.FullStatuteFK, s.PenaltySubsection, s.OfnsClass, s.SentenceRangeText, s.MandatoryMinimums, s.MandatoryIncarceration, s.SubsequentOffns, s.Notes, s.DisplayMe, s.TruthinSentencingText
FROM  (((((((((tbl_Statutes as S`;
      let iAndStarted = 0;
      let iSubAndStarted = 0;
      let iOrStarted = 0;
      let iCommaStarted = 0;
      let iParenCount = 9;

      if (
        ckMurder ||
        ckClassA ||
        ckPetty ||
        ckClassX ||
        ckClassB ||
        ckBusiness ||
        ckClass1 ||
        ckClassC ||
        ckClass2 ||
        ckClass3 ||
        ckClass4
      ) {
        ckUseOffenseClass = true;
        iOffenseClassesChecked = 1;
      } else {
        ckUseOffenseClass = false;
        iOffenseClassesChecked = 0;
      }

      if (ckSentenceCS || ckSentenceFine || ckSentence1Year) {
        strSQL += ` INNER JOIN tlu_MandatoryMinimum as MM ON `;
        strSQL += ` MM.MandatoryMinimums = s.MandatoryMinimums) `;
        iParenCount = iParenCount - 1;
      }

      if (iOffenseClassesChecked === 1) {
        strSQL += ` INNER JOIN tlu_OffenseClasses as oc on s.OfnsClass = oc.OfnsClass) `;
        strSQL += ` INNER JOIN tlu_OffClassChoices As ocChoices ON oc.OffChoiceCode = ocChoices.OffclassKey) `;
        iParenCount = iParenCount - 2;
      }

      if (cboTIS > 0) {
        strSQL += ` INNER JOIN tlu_TIS as tis on s.TruthInSentencingText = tis.TruthInSentencing) `;
        iParenCount = iParenCount - 1;
      }

      let loop_ct = 0;
      do {
        strSQL += `)`;
        iParenCount = iParenCount - 1;
      } while (loop_ct < iParenCount);

      if (ckSentenceCS || ckSentenceFine || ckSentence1Year) {
        iOrStarted = 0;

        if (ckSentence1Year) {
          strSQL += `  WHERE (mm.sentencelt1yr = TRUE `;
          iOrStarted = 1;
          iAndStarted = 1;
        }

        if (ckSentenceCS) {
          if (iAndStarted === 1) {
            strSQL += ` and `;
          } else {
            strSQL += ` WHERE (`;
            iAndStarted = 1;
          }

          strSQL += ` mm.CommunityService = TRUE `;
          iAndStarted = 1;
        }

        if (ckSentenceFine) {
          if (iAndStarted === 1) {
            strSQL += ` and `;
          } else {
            strSQL += ` WHERE(`;
            iAndStarted = 1;
          }

          strSQL += ` mm.SentenceFine = TRUE `;
          iAndStarted = 1;
        }

        if (iAndStarted === 1) {
          strSQL += `)`;
        }
      }

      if (txtSearchTerm_adv && txtSearchTerm_adv.length > 2) {
        if (iAndStarted === 1) {
          strSQL += ` AND `;
        } else {
          strSQL += ` WHERE `;
          iAndStarted = 1;
        }

        strSQL += ` ( s.Offensetitle LIKE '%${txtSearchTerm_adv}%' `;
        strSQL += `  OR s.SentenceDeterminant LIKE '%${txtSearchTerm_adv}%' )`;
      }

      // if (cboTIS === 0) {
      //   if (iAndStarted === 1) {
      //     strSQL += ` AND `;
      //   } else {
      //     strSQL += ` WHERE `;
      //     iAndStarted = 1;
      //   }
      //   strSQL += ` tis.truthID = ${cboTIS}`;
      // }

      if (ckRegArson) {
        if (iAndStarted === 1) {
          strSQL += ` AND `;
        } else {
          strSQL += ` WHERE `;
          iAndStarted = 1;
        }
        strSQL += ` s.ArsonRegRequired = TRUE `;
      }

      if (ckRegMeth) {
        if (iAndStarted === 1) {
          strSQL += ` AND `;
        } else {
          strSQL += ` WHERE `;
          iAndStarted = 1;
        }
        strSQL += ` s.MethRegRequired = TRUE `;
      }

      if (ckRegSexOffender) {
        if (iAndStarted === 1) {
          strSQL += ` AND `;
        } else {
          strSQL += ` WHERE `;
          iAndStarted = 1;
        }
        strSQL += ` s.SexOffenderRegRequired = TRUE `;
      }

      if (ckRegViolentVsChildren) {
        if (iAndStarted === 1) {
          strSQL += ` AND `;
        } else {
          strSQL += ` WHERE `;
          iAndStarted = 1;
        }
        strSQL += ` s.ViolentOffenderYouthRegRequired = TRUE `;
      }

      if (ckMandIDOC) {
        if (iAndStarted === 1) {
          strSQL += ` AND `;
        } else {
          strSQL += ` WHERE `;
          iAndStarted = 1;
        }
        strSQL += ` s.MandatoryIDOC = TRUE `;
      }

      let sOffenseList = "";

      if (ckUseOffenseClass) {
        iCommaStarted = 0;
        sOffenseList = "(";

        if (ckMurder) {
          sOffenseList += "1";
          iCommaStarted = 1;
        }

        if (ckClassX) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "2";
        }

        if (ckClass1) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "3";
        }

        if (ckClass2) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "4";
        }

        if (ckClass3) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "5";
        }

        if (ckClass4) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "6";
        }

        if (ckClassA) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "10";
        }

        if (ckClassB) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "11";
        }

        if (ckClassC) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "12";
        }

        if (ckPetty) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "15";
        }

        if (ckBusiness) {
          if (iCommaStarted === 1) {
            sOffenseList += ",";
          } else {
            iCommaStarted = 1;
          }

          sOffenseList += "16";
        }

        // if (ckEquipment) {
        //   if (iCommaStarted === 1) {
        //     sOffenseList += ",";
        //   } else {
        //     iCommaStarted = 1;
        //   }

        //   sOffenseList += "17";
        // }

        // if (ckTraffic) {
        //   if (iCommaStarted === 1) {
        //     sOffenseList += ",";
        //   } else {
        //     iCommaStarted = 1;
        //   }

        //   sOffenseList += "18";
        // }

        if (iCommaStarted === 1) {
          if (iAndStarted === 1) {
            strSQL += " AND ";
          } else {
            strSQL += " WHERE ";
            iAndStarted = 1;
          }

          strSQL += ` ocChoices.offclasskey in ${sOffenseList})`;
        }
      }

      this.strSQL = strSQL;
    },
    buildMessageTop() {
      const messageTop = `${this.metadata.message} | Timestamp: ${this.metadata.timestamp}`;
      return messageTop;
    },
    reset() {
      this.$refs.form.reset();
      this.submit();
      this.res = null;
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = "";
      this.metadata.message =
        "This is a custom header message and will appear on exported files";

      this.$store.commit("setClearError");
    },
    execute() {
      this.loading = true;
      this.metadata.timestamp = new Date().toLocaleString();
      this.fetchData();
    },
    async fetchData() {
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = `Building results table ...`;
      window.NProgress.start();

      const before = Date.now();

      try {
        let db = this.$store.state.db;
        const res = await db.exec(this.strSQL);
        console.log("db queried");
        if (!res.length) {
          console.log("no results");
          this.err = "No results";
          window.NProgress.done();
          el.innerHTML = ``;
          return;
        }
        this.res = res[0];
        this.metadata.timestamp = new Date().toLocaleString();
        this.res.metadata = this.metadata;
        this.messageTop = this.buildMessageTop();
        this.columns = res[0].columns;
        this.values = res[0].values;
        this.queryLength = res[0].values.length;
        this.loading = false;
        const after = Date.now();
        this.queryTime = after - before;
        console.log(this.res);
        // this.$gtag.event("repl", {
        //   event_category: "sqlStatement",
        //   event_label: this.sqlStatement,
        // });
        this.buildResultsTable();
      } catch (err) {
        console.log(err);
        this.err = err;
        window.NProgress.done();
        el.innerHTML = "";
        this.loading = false;
        window.NProgress.done();
      }

      window.NProgress.done();
    },
    buildResultsTable() {
      window.NProgress.start();
      window.$("#results").hide();
      this.loading = true;
      const el = document.getElementById("results");

      let columnNames = this.columns.map((col) => {
        return `<th>${col}</th>`;
      });

      // let columnToggles = this.columns.map((col, idx) => {
      //   return `<a class="toggle-vis column" data-column="${idx}">${col}</a>&nbsp;&nbsp;&nbsp;`;
      // });

      let rows = this.values.map((row) => {
        return `<tr style="display: relative !important;">${row
          // eslint-disable-next-line no-unused-vars
          .map((cell, idx) => {
            let col = columnNames[idx].replace(new RegExp("<[^>]*>", "g"), "");
            let result;
            if (col === "Code") {
              let text;
              if (typeof cell !== "string") {
                text = "";
              } else {
                text = cell.trim();
              }

              if (typeof text !== "string") console.log("not string");
              let formattedText = `<a class="cell-code" onclick="window.$vue.displayStatute('${cell}')">${text}</a>`;
              result = `<td class="px-4 py-2" ><pre>${formattedText}</pre></td>`;
            } else {
              result = `<td class="px-4 py-6"><strong>${cell}</strong></td>`;
            }
            return result;
          })
          .join("")}</tr>`;
      });

      const table = `
      <div style="overflow-x: auto;" id="doublescroll">
        <table style="font-size: 12px; width: 100% !important;" border="1" class="pt-6 px-3; " id="myTable">
      
          <thead>
            <tr>
              ${columnNames.join("")}
            </tr>
          </thead>
          <tbody>
            
                ${rows.join("")}
              
          </tbody>
        </table>
        </div>
      `;
      el.innerHTML = table;
      console.log("db table built");
      let myTable = window.$("#myTable").DataTable({
        responsive: false,
        dom: "iBfrtlp",
        autoWidth: false,
        pageLength: 10,
        aLengthMenu: [
          [5, 10, 25, 50, 250, -1],
          [5, 10, 25, 50, 250, "All"],
        ],

        buttons: [
          {
            extend: "copyHtml5",
            text: "Copy",
            titleAttr: "Copy to clipboard",
          },
          {
            extend: "excel",
            text: "Excel",
            messageTop: window.$vue.buildMessageTop(),
            titleAttr: "Save as Excel",
          },
          {
            extend: "pdfHtml5",
            text: "PDF",
            messageTop: window.$vue.buildMessageTop(),
            titleAttr: "Save as PDF",
          },

          {
            text: "JSON",
            titleAttr: "Save as JSON",
            action: function () {
              let filename = `statute-explorer-${Date.now()}.json`;
              let file = new File([JSON.stringify(window.$vue.res)], filename, {
                type: "application/json;charset=utf-8",
              });
              FileSaver.saveAs(file);
            },
          },
          {
            extend: "print",
            text: "Print",
            titleAttr: "Show Print friendly version",
            autoPrint: false,
            messageTop: window.$vue.messageTop,
            exportOptions: {
              columns: ":visible",
            },
          },
          {
            extend: "colvis",

            titleAttr: "Toggle table columns on or off",
          },
          {
            text: "Reload&nbsp;&nbsp;<i class='fa fa-refresh'></i>",
            titleAttr: "Reload SQL query",
            action: function () {
              window.$vue.execute();
            },
          },
        ],
        language: {
          search: "Filter results: ",
          info: "Showing _START_ to _END_ of _TOTAL_ results",
        },
        oLanguage: {
          sLengthMenu: "Show _MENU_ results per page",
        },
      });
      this.loading = false;
      window.$("#results").show();
      doubleScroll(document.getElementById("doublescroll"));

      window.NProgress.done();
    },
    async displayStatute(code) {
      console.log("fire modal for formatted statute here: ", code);
      let statuteQuery = `select StatuteText from tbl_statutes where code like '%${code}%'`;
      try {
        let db = this.$store.state.db;
        const res = await db.exec(statuteQuery);
        let payload = {
          code: code,
          response: res,
        };
        EventBus.$emit("show-statute", payload);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.builder-header {
  font-weight: bold;
  margin-left: -10px;
}
.flush {
  margin: 0;
  padding: 0;
}

.spacer {
  margin-top: 40px;
}

table {
  border: 1px solid #ccc !important;
}
.cell-code {
  font-weight: bold;
}

.cell-code:hover {
  text-decoration: underline;
}
</style>
