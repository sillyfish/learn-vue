export default value => {
  let date = new Date(value)
  return date.toLocaleDateString('zh', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}
