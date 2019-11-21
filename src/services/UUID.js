class UUID {
  constructor(date) {
    this.date = date
  }
  uuid() {
    const uuid = 'xxxxxxxx'.replace(/[xy]/g, key => {
      const randomizer = (this.date + Math.random() * 16) % 16 | 0
      this.date = Math.floor(this.date / 16)
      return (key == 'x' ? randomizer : (randomizer & 0x3) | 0x8).toString(16)
    })
    return uuid.toString('utf8')
  }
}
export { UUID }
