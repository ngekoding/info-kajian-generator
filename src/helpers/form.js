export function resetForm(form) {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
}
