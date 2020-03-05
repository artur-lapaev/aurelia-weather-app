export class TimeValueConverter {
  toView(value, element) {
    const sign = Math.sign(value);
    let time;
    let utc;

    if (value === 0) {
      time = this._setDate(0, sign);
    } else {
      if (sign < 0) {
        const posValue = Math.abs(value);
        utc = posValue / 3600;
        time = this._setDate(utc, sign);
      }
      utc = value / 3600;
      time = this._setDate(utc, sign);
    }
    setInterval(() => {
      const update = this._update(value, element);
      update();
    }, 1000);
    return time;
  }

  _setDate(utc, sign) {
    const date = new Date();
    const currentTimeZone = date.getTimezoneOffset();
    const currentUTC = this._parseTimeZoneToUTC(currentTimeZone);
    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    let time = '';

    if (utc < currentUTC || utc === 0) {
      const dif = currentUTC - utc;
      const hours = currentHours - dif;
      return time = `${this._formatTime(hours)}:${currentMinutes}`;
    }

    if (utc === currentUTC) {
      return time = `${this._formatTime(currentHours)}:${this._formatTime(currentMinutes)}`;
    }

    if (sign >= 0) {
      currentHours = currentHours + utc;
    } else {
      currentHours = currentHours - utc;
    }

    time = `${this._formatTime(currentHours)}:${this._formatTime(currentMinutes)}`;
    return time;
  }

  _parseTimeZoneToUTC(timeZone) {
    const posValue = Math.abs(timeZone);
    return posValue / 60;
  }

  _formatTime(time) {
    if (time < 10) {
      return time = '0' + time;
    }
    return time;
  }

  _update(value, element) {
    return () => {
      const elem = element;
      const sign = Math.sign(value);
      let time;
      let utc;

      if (value === 0) {
        time = this._setDate(0, sign);
      } else {
        if (sign < 0) {
          const posValue = Math.abs(value);
          utc = posValue / 3600;
          time = this._setDate(utc, sign);
        }
        utc = value / 3600;
        time = this._setDate(utc, sign);
      }
      return elem.time.innerText = time;
    };
  }
}
