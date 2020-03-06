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
      return time = `${this._formatHoursTime(hours)}:${this._formatMinuteTime(currentMinutes)}`;
    }

    if (utc === currentUTC) {
      return time = `${this._formatHoursTime(currentHours)}:${this._formatMinuteTime(currentMinutes)}`;
    }

    if (sign >= 0) {
      const dif = utc - currentUTC;
      currentHours = currentHours + dif;
    } else {
      currentHours = currentHours - utc;
    }

    time = `${this._formatHoursTime(currentHours)}:${this._formatMinuteTime(currentMinutes)}`;
    return time;
  }

  _parseTimeZoneToUTC(timeZone) {
    const posValue = Math.abs(timeZone);
    return posValue / 60;
  }
  _formatHoursTime(time) {
    if (time >= 24) {
      const dif = time - 24;

      if (time === 24) {
        return '00';
      }

      return `0${dif}`;
    }
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  }

  _formatMinuteTime(time) {
    if (time < 10) {
      return `0${time}`;
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
