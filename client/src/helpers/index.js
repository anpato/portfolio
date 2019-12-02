export const _TagParser = arr => arr.map(tag => tag.name)
export const projectFilter = (arr, query) => {
  let data = []
  for (let i = 0; i < arr.length; i++) {
    let tagIndex = 0
    tagIndex += arr[i].tags.length - 1
    if (arr[i].tags[tagIndex] !== undefined) {
      if (arr[i].tags[tagIndex].name.includes(query)) {
        data.push(arr[i])
      }
    }
  }
  return data
}
