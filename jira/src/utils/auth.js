const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      return false
    } else {
      return true
    }
  }
}
export default authUtils
