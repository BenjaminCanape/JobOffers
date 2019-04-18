import { EventEmitter } from "events";
import AppDispatcher from "../dispatchers/AppDispatcher";

class AuthentificationStore extends EventEmitter {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._user = null;
    this._jwt = null;
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = AppDispatcher.register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    this.emit("CHANGE");
  }

  addChangeListener(cb) {
    this.on("CHANGE", cb);
  }

  removeChangeListener(cb) {
    this.removeListener("CHANGE", cb);
  }

  _registerToActions(action) {
    switch (action.actionType) {
      case "LOGIN_USER":
        this._jwt = action.jwt;
        this._user = action.user;
        this.emitChange();
        break;
      case "LOGOUT_USER":
        this._user = null;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new AuthentificationStore();
