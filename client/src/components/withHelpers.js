import React, { Component } from "react";

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    formatViews(views) {
      // if views > 1 billion
      if (views > 999999999) {
          // divide views by 1 billion and add "B", ex: 1.2B views
          return parseFloat((views / 1000000000).toFixed(1)) + "B"
      }

      // if views > 1 million
      if (views > 999999) {
          // divide views by 1 million and add "M", ex: 6.7M views
          return parseFloat((views / 1000000).toFixed(1)) + "M"
      }

      // if views > 1 thousand
      if (views > 999) {
          // divide views by 1 thousand and add "K", ex: 102.5K views
          return parseFloat((views / 1000).toFixed(1)) + "K"
      }

      // if views is in the hundreds
      // just return views, ex: 978 views
      return views;
    }
    timeSincePublished(secondsSincePublished, intervalSeconds, intervalName) {
      // divide number of seconds since published
      // by intervalSeconds (seconds in year, month, day, hour, or minute)
      // timeElapsed equals rounded number of years, months, days, hours, or minutes
      // formula from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
      let timeElapsed = Math.floor(secondsSincePublished/intervalSeconds);

      if (timeElapsed === 1) {
        // ex: 1 month ago
        return `${timeElapsed} ${intervalName} ago`;
      } else {
        // ex: 2 years ago
        return `${timeElapsed} ${intervalName + "s"} ago`;
      }
    }
    formatPublishedDate(datePublished) {
      const secondsInYear = 31536000;
      const secondsInMonth = 2629746;
      const secondsInWeek = 604800;
      const secondsInDay = 86400;
      const secondsInHour = 3600;
      const secondsInMinute = 60;

      // subtract (datePublished / 1000) from current date
      // to get number of seconds since video was published
      // formula from: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
      const seconds = Math.floor(((new Date() - new Date(datePublished)) / 1000));

      if (seconds >= secondsInYear) {
        // calculate years since published
        return this.timeSincePublished(seconds, secondsInYear, "year");
      }

      if (seconds >= secondsInMonth) {
        // calculate months since published
        return this.timeSincePublished(seconds, secondsInMonth, "month");
      }

      if (seconds >= secondsInWeek) {
        // calculate weeks since published
        return this.timeSincePublished(seconds, secondsInWeek, "week");
      }

      if (seconds >= secondsInDay) {
        // calculate days since published
        return this.timeSincePublished(seconds, secondsInDay, "day");
      }

      if (seconds >= secondsInHour) {
        // calculate hours since published
        return this.timeSincePublished(seconds, secondsInHour, "hour");
      }

      if (seconds >= secondsInMinute) {
        // calculate minutes since published
        return this.timeSincePublished(seconds, secondsInMinute, "minute");
      }

      // if seconds > one minute
      return "Just now"
    }
    formatDuration(duration) {
      const array = duration.match(/(\d+)(?=[MHS])/ig)||[];
      const formatted = array.map((item, i) => {
          if (i > 0 && item.length<2) {
            return '0' + item;
          }
          return item;
      }).join(':');

      return formatted;
    }
    render() {
      return <ChildComponent
                timeSincePublished={this.timeSincePublished}
                formatPublishedDate={this.formatPublishedDate}
                formatViews={this.formatViews}
                formatDuration={this.formatDuration}
                { ...this.props }
             />
    }
  }

  return ComposedComponent;
}
