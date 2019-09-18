const ReplaceSpecialChars = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/([^\w]+|\s+)/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/(^-+|-+$)/, '').toLowerCase()
}

export default ReplaceSpecialChars
