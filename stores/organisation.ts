import { defineStore } from "pinia";

export const useOrganisationStore = defineStore("organisation", {
  state: () => ({
    id: null as number | null,
    name: "",
  }),

  getters: {},

  actions: {
    select(id: number, newName: string) {
      this.id = id;
      this.name = newName;
    },
  },
});
