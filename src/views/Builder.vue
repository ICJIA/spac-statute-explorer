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
                    color="grey darken-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckSentenceFine"
                    label="Fine"
                    color="grey darken-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckSentence1Year"
                    label="Imprisonment less than 1 year"
                    color="grey darken-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckMandIDOC"
                    label="Imprisonment 1 year or more/non-probationable offenses"
                    color="grey darken-4"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col
                  ><div class="builder-header">Select Other Requirements:</div>
                  <v-checkbox
                    v-model="ckRegSexOffender"
                    label="Sex offender registration required"
                    color="grey darken-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegArson"
                    label="Arson registration required"
                    color="grey darken-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegViolentVsChildren"
                    label="Violent offender against youth registration required"
                    color="grey darken-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="ckRegMeth"
                    label="Methamphetamine registration required"
                    color="grey darken-4"
                    hide-details
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

                    <v-checkbox
                      v-model="ckFeloniesCheckAll"
                      dark
                      label="Check All"
                      color="grey darken-4"
                      hide-details
                      style="margin-top: -5px"
                    ></v-checkbox>
                  </div>
                  <div class="px-4 py-2 pb-4">
                    <v-checkbox
                      v-model="felonies.ckMurder"
                      label="Murder"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClassX"
                      label="Class X"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass1"
                      label="Class 1"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass2"
                      label="Class 2"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass3"
                      label="Class 3"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="felonies.ckClass4"
                      label="Class 4"
                      color="grey darken-4"
                      hide-details
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

                    <v-checkbox
                      v-model="ckMisdemeanorsCheckAll"
                      label="Check All"
                      dark
                      color="grey darken-3"
                      hide-details
                      style="margin-top: -5px"
                    ></v-checkbox>
                  </div>
                  <div class="px-4 py-2">
                    <v-checkbox
                      v-model="misdemeanors.ckClassA"
                      label="Class A"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="misdemeanors.ckClassB"
                      label="Class B"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="misdemeanors.ckClassC"
                      label="Class C"
                      color="grey darken-4"
                      hide-details
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

                    <v-checkbox
                      v-model="ckMiscellaneousCheckAll"
                      label="Check All"
                      dark
                      color="grey darken-4"
                      hide-details
                      style="margin-top: -5px"
                    ></v-checkbox>
                  </div>
                  <div class="px-4 py-2">
                    <v-checkbox
                      v-model="miscellaneous.ckPetty"
                      label="Petty Offenses"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox>
                    <v-checkbox
                      v-model="miscellaneous.ckBusiness"
                      label="Business Expenses"
                      color="grey darken-4"
                      hide-details
                    ></v-checkbox></div></v-col></v-row
            ></v-container>
            <v-container fluid class="flush spacer">
              <v-row class="mt-8 mb-8" v-if="builderObj">
                <v-col>
                  <v-card
                    class="px-4 py-4"
                    elevation="0"
                    color="grey lighten-4"
                  >
                    <div style="font-weight: 900; font-size: 20px" class="mb-3">
                      Selections
                    </div>
                    {{ builderObj }}
                  </v-card></v-col
                ></v-row
              >
            </v-container>
            <div class="d-flex" style="margin-top: 10px">
              <v-spacer></v-spacer>
              <v-btn small outlined class="mr-4" @click="reset()">
                reset
              </v-btn>
              <v-btn small @click="submit()" dark color="purple darken-4"
                >Submit<v-icon right>arrow_right</v-icon></v-btn
              >
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
      builderObj: null,
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
        ckClass4,
        ckClassA,
        ckClassB,
        ckClassC,
        ckPetty,
        ckBusiness
      );
    },
    reset() {
      this.$refs.form.reset();
      this.builderObj = null;
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
