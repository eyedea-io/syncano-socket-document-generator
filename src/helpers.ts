import * as cheerio from 'cheerio'

// Overridden because implementation of nodejs is other than ES6.
// In ES6 new Date('2017-07-19T00:00:00.000000Z')
// .toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}) returns "19/07/2017"
// In NodeJS new Date('2017-07-19T00:00:00.000000Z')
// .toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}) returns "07/19/2017"

Date.prototype.toLocaleDateString = function () { // eslint-disable-line
  const month = this.getMonth() + 1

  return `${this.getDate()}.${month < 10 ? `0${month}` : month}.${this.getFullYear()}`
}

export default {
  isYesChecked: () => {
    return (variable: string, render) => {
      return render(variable).toLowerCase() === 'no'
        ? false
        : render(variable).toLowerCase() === 'yes'
          ? 'checked'
          : render(variable) ? 'checked' : false
    }
  },
  isNoChecked: () => {
    return (variable, render) => {
      return render(variable).toLowerCase() === 'yes'
        ? false
        : render(variable).toLowerCase() === 'no'
          ? 'checked'
          : render(variable) ? false : 'checked'
    }
  },
  isChecked: () => {
    return (inputString, render) => {
      const $ = cheerio.load(inputString)
      const data = render($('input').data('set'))
      const inputVal = $('input').val()

      if (data.includes(inputVal)) {
        $('input').attr('checked', 'checked')
      }

      return $.html()
    }
  },
  currentDate: new Date().toLocaleDateString(),
}
