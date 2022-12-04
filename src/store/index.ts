import Vue from "vue";
import Vuex from "vuex";
import { RootState } from "@/store/types";
import { gen1 } from "@/store/modules/gen1";
import { gen1Staking } from "@/store/modules/gen1Staking";
import { labs } from "@/store/modules/labs";
import { connector } from "@/store/modules/connector";
import { toast } from "@/store/modules/toast";
import { breeding } from "@/store/modules/breeding";
import { gen2 } from "@/store/modules/gen2";
import { nRyu } from "@/store/modules/nRyu";
import { nRyuStaking } from "@/store/modules/nRyuStaking";
import { ToastPlugin } from "@/store/plugins/toast";
import { loader } from "@/store/modules/loader";
import { gen2Staking } from "@/store/modules/gen2Staking";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    gen1,
    gen2,
    gen1Staking,
    gen2Staking,
    labs,
    nRyu,
    nRyuStaking,
    breeding,
    connector,
    toast,
    loader,
  },
  plugins: [ToastPlugin],
});
