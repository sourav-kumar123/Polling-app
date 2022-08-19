import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    List: null,
    users: null,
    vote: null,
    Poll: [],
    Userpoll: null,
    a_poll: null,
  },

  getters: {
    getUsers: (state) => state.users,
    getList: (state) => state.List,
    getPoll: (state) => state.Poll,
    getVote: (state) => state.vote,
    getPolllist: (state) => state.Userpoll,
    getaPoll: (state) => state.a_poll,
  },
  mutations: {
    log_in(state, List) {
      state.List = List;
    },
    set_users(state, users) {
      state.users = users;
    },
    set_poll(state, Poll) {
      state.Poll = Poll;
    },
    add_option(state, Poll) {
      state.Poll = Poll;
    },
    delete_option(state, Poll) {
      state.Poll = Poll;
    },
    delete_poll(state, Poll) {
      state.Poll = Poll;
    },
    vote_poll(state, vote) {
      state.vote = vote;
    },
    list_poll(state, Userpoll) {
      state.Userpoll = Userpoll;
    },
    list_a_poll(state, a_poll) {
      state.a_poll = a_poll;
    },
    update_title(state, data) {
      let arr = state.Poll;
      arr.push(data);
      state.Poll = JSON.parse(JSON.stringify(arr));
    },
  },

  actions: {
    async login_page({ commit }, payload) {
      try {
        const data = await axios.get(
          `https://secure-refuge-14993.herokuapp.com/login?username=${payload.Name}&password=${payload.password}`
        );
        commit("log_in", data.data);
        return data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async signUpUsers({ commit }, payload) {
      try {
        const data = await axios.get(
          `https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.Name}&password=${payload.password}&role=${payload.role}`
        );
        commit("set_users", data.data);
        return data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async Polling({ commit }, payload) {
      try {
        let str = "";
        for (let i = 0; i < payload.arr.length - 1; i++) {
          str = str + `${payload.arr[i].text}____`;
        }
        str = str + payload.arr[payload.arr.length - 1].text;
        const data = await axios.get(
          `https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.Title}&options=${str}`
        );
        commit("set_poll", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async Deleting({ commit }, payload) {
      try {
        const data = await axios.get(
          `https://secure-refuge-14993.herokuapp.com/delete_poll?id=${payload.id}`
        );
        commit("delete_poll", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async Voting({ commit }, payload) {
      try {
        const data = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/do_vote?id=${payload.poll_id}&option_text=${payload.item}`,
          {},
          {
            headers: { access_token: payload.token },
          }
        );
        commit("vote_poll", data.data);
        return data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async Listing({ commit }) {
      try {
        const data = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/list_polls`
        );
        commit("list_poll", data.data);
        return data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleting_option({ commit }, payload) {
      try {
        const data = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.item_id}&option_text=${payload.option}`
        );
        commit("delete_option", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async adding_option({ commit }, payload) {
      try {
        const data = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.param._id}&option_text=${payload.text1}`
        );
        commit("add_option", data.data);
        return data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async updatting({ commit }, payload) {
      try {
        const data = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${payload.id}&title=${payload.param}`
        );
        commit("update_title", data.data);
        return data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async Listing_single_poll({ commit }, payload) {
      try {
        const data = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/list_poll?id=${payload.param._id}`
        );
        commit("list_a_Poll", data.data);
        return data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {},
});
