function checkDeadCode(lines, excludes) {
  const {ignored, usedInModule, deadCode} = lines.reduce(
    (acc, line) => {
      if (excludes.some(exclude => exclude.test(line))) {
        acc.ignored.push(line)
        return acc
      }
      if (line.endsWith('(used in module)')) {
        acc.usedInModule.push(line)
        return acc
      }
      if (line) {
        acc.deadCode.push(line)
        return acc
      }
      return acc
    },
    {ignored: [], usedInModule: [], deadCode: []}
  )

  if (ignored.length) {
    ignored.sort()
    console.log('### IGNORED')
    console.log(ignored.join('\n'))
    console.log('\n')
  }
  if (usedInModule.length) {
    usedInModule.sort()
    console.log('### USED IN MODULE')
    console.log(usedInModule.join('\n'))
    console.log('\n')
  }
  if (deadCode.length) {
    deadCode.sort()
    console.log('### DEAD CODE')
    console.log(deadCode.join('\n'))
    console.log('\n')
  }

  console.log(
    `Ignored: ${ignored.length} | Used in module: ${usedInModule.length} | Dead code: ${deadCode.length}`
  )

  if (usedInModule.length || deadCode.length) {
    process.exit(1)
  }
}

const excludes = []

let pruneOutput = ''
const stdin = process.openStdin()
stdin.on('data', function (chunk) {
  pruneOutput += chunk
})
stdin.on('end', function () {
  checkDeadCode(pruneOutput.split('\n'), excludes)
})
