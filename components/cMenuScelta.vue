<template>
  <nav class="sub_menu_wrapper">
    <div class="arguments">
      <label class="sub_menu" v-for="(ele, index) in arg" :key="index">
        <input type="checkbox" />
        <p @click="toggle">{{ ele }}</p>
      </label>
    </div>
    <div class="select_argument"><p>Seleziona un argomento.</p></div>
  </nav>
</template>

<script>
export default {
  name: "cMenuScelta",
    props: {
    msg: String,
    sProgrammazione: Boolean
  },
  data() {
    return {
      arg: [
        "Programmazione",
        "Meccanica",
        "Fisica",
        "Matematica",
        "Orienteering",
      ],
    };
  },
  methods:
  {
  }
};
</script>

<style>
/**/
.sub_menu_wrapper {
  text-align: center;
  position: relative;
  margin-block: 15px;
}

.sub_menu_wrapper .sub_menu p {
  font-weight: bold;
  line-height: 50px;
  padding-inline: 20px;
  border-radius: 8px;
  font-size: 25px;
  display: inline-block;
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  color: var(--black);
  background-color: var(--white);
  cursor: pointer;
  margin: 10px;
}

.sub_menu_wrapper .sub_menu p:hover {
  background-color: var(--orange);
}

.d0,
.d1,
.d2,
.d3,
.d4 {
  display: block !important;
}

.sub_menu_wrapper .sub_menu input,
.list_container .container {
  display: none;
}

.select_argument {
  margin-inline: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px;
  font-size: 25px;
  color: white;
  text-align: center;
}

@media (max-width: 600px) {
  .sub_menu_wrapper .sub_menu p {
    font-size: 17px !important;
    line-height: 30px !important;
  }
  .sub_menu_wrapper .sub_menu p:hover {
    background-color: var(--white);
  }
  .select_argument {
    font-size: 17px !important;
    padding: 50px !important;
  }
}
</style>