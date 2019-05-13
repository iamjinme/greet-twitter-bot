module.exports = function(name) {
  return(
    // Message returned
    `
    Greets ${name}
    Thanks for following me! ${String.fromCodePoint(0x1F60E)}
    `
  )
}