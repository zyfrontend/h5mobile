import { defineStore } from 'pinia';
// 唯一 id Public
export const PublicStore = defineStore('Public', {
  state: () => {
    return {
      userMsg: 'getUserMsggetUserMsggetUserMsggetUserMsg'
    };
  },
  getters: {
    getUserMsg(state) {
      return state.userMsg;
    }
  },
  actions: {
    setUserMsg() {
      this.userMsg++;
    }
  }
});
