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
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckSentenceFine"
                    label="Fine"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckSentence1Year"
                    label="Imprisonment less than 1 year"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckMandIDOC"
                    label="Imprisonment 1 year or more/non-probationable offenses"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col
                  ><div class="builder-header">Select Other Requirements:</div>
                  <v-checkbox
                    v-model="ckRegSexOffender"
                    label="Sex offender registration required"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegArson"
                    label="Arson registration required"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegViolentVsChildren"
                    label="Violent offender against youth registration required"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegMeth"
                    label="Methamphetamine registration required"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox
                ></v-col>
              </v-row>
            </v-container>

            <v-container fluid class="flush spacer"
              ><v-row
                ><v-col
                  ><div class="builder-header">
                    Select Offense Classes:
                  </div></v-col
                ></v-row
              >
              <v-row>
                <v-col style="background: #fafafa; border: 1px solid #eee">
                  <div class="d-flex">
                    <strong>Felonies</strong>
                    <v-spacer></v-spacer>

                    <v-checkbox
                      v-model="ckFeloniesCheckAll"
                      label="Check All"
                      color="purple darken-3"
                      hide-details
                      style="margin-top: -5px"
                    ></v-checkbox>
                  </div>
                  <v-checkbox
                    v-model="felonies.ckMurder"
                    label="Murder"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="felonies.ckClassX"
                    label="Class X"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="felonies.ckClass1"
                    label="Class 1"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="felonies.ckClass2"
                    label="Class 2"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="felonies.ckClass3"
                    label="Class 3"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="felonies.ckClass4"
                    label="Class 4"
                    color="purple darken-3"
                    hide-details
                  ></v-checkbox> </v-col
                ><v-col> col 2</v-col><v-col> col 3</v-col></v-row
              ></v-container
            >

            <div class="d-flex" style="margin-top: 80px">
              <v-spacer></v-spacer>
              <v-btn outlined class="mr-4" @click="reset()"> reset </v-btn>
              <v-btn
                dark
                color="purple darken-4"
                class="mr-4"
                @click="submit()"
              >
                Submit
              </v-btn>
            </div>
          </v-form></v-col
        ></v-row
      ></v-container
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      keyword: "",
      cboTIS: { text: "No selection", value: 0 },
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
      felonies: {
        ckMurder: false,
        ckClassX: false,
        ckClass1: false,
        ckClass2: false,
        ckClass3: false,
        ckClass4: false,
      },
    };
  },
  watch: {
    ckFeloniesCheckAll(newValue) {
      for (const [key] of Object.entries(this.felonies)) {
        this.felonies[key] = newValue;
      }
    },
  },
  methods: {
    submit() {
      console.log("submit here");

      // Object.assign(this, test);
      let builderObj = {
        keyword: this.keyword,
        cboTIS: this.cboTIS.value,
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
      };
      this.buildSql(builderObj);
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
    }) {
      console.log(
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
        ckClass4
      );
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.builder-header {
  font-weight: bold;
}
.flush {
  margin: 0;
  padding: 0;
}

.spacer {
  margin-top: 40px;
}
</style>
