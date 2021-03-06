import { observable, action, decorate } from "mobx"

class User {
  constructor() {
    this.loaded = false
    this.displayName = null
    this.pictureLink = null

    this.loadUser()
  }

  //observables
  loaded
  displayName
  pictureLink

  //actions
  setUser(name, link) {
    this.loaded = true
    this.displayName = name
    this.pictureLink = link
  }
  loadUser() {
    fetch(process.env.REACT_APP_GET_IDENTITY_PATH)
      .then(response =>
        response.json()
      )
      .then(json =>
        this.setUser(
          json.displayName     || null,
          json.profileImageUrl || null
        )
      )
      .catch(err => {
        this.setUser(
          null,
          null
        )
      })
  }
}
decorate(User, {
  //observables
  loaded: observable,
  displayName: observable,
  pictureLink: observable,

  //actions
  setUser: action,
  loadUser: action,
})
const user = new User()
export default user
