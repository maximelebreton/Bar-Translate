let spinner = {

  i: 0,
  interval: 80,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],

  current: null
}

spinner.animate = (callback) => {
  return setInterval(() => {
    const frames = spinner.frames;
    let indicator = frames[spinner.i = ++spinner.i % frames.length]

    callback(indicator)

  }, spinner.interval)
}

export default spinner
