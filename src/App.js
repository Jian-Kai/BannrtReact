import React from 'react';
import './App.css';
import banner from './imgs/banner.png'

import PropTypes from 'prop-types';

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
    const { option } = this.props
    this.state = {
      default: option,
      status: option.openAtStart,
      banner: null,
      toggletimeout: null,
      clicked: false,
    };

    this.clickEvent = this.clickEvent.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const { openAtStart, bannerclass, autoToggle } = this.state.default;
    this.setState({
      banner: (openAtStart) ? "opened " + bannerclass.opened : "closed " + bannerclass.closed
    });

    const time = (typeof autoToggle === 'number') ? autoToggle : 500;
    setTimeout(this.toggle.bind(this), time);
  }

  toggle() {
    const { autoToggle } = this.state.default;
    const { status, clicked } = this.state;
    console.log("autoToggle : " + autoToggle);

    if (autoToggle && !clicked) {
      //identify autoToggle ture or type of number
      //const time = (typeof autoToggle === 'number') ? autoToggle : 500;
      /*if (status) {
        const timeout = setTimeout(this.close, time);
        this.setState({ toggletimeout: timeout });
      }
      else{
        const timeout = setTimeout(this.open, time);
        this.setState({ toggletimeout: timeout });
      }*/
      (status) ? this.close() : this.open();
      this.setState({ status: !status })
    }

  }

  clickEvent() {
    console.log("click")
    const { status, clicked } = this.state;
    console.log(status);
    clearTimeout(this.toggletimeout);
    (status) ? this.close() : this.open();
    this.setState({ status: !status, clicked: !clicked })
  }

  open() {
    console.log("open")
    const { bannerclass, transition, whenTransition } = this.state.default;

    if (transition) {
      //change status closed -> opening -> oopened
      this.setState({ banner: "opening " + bannerclass.opening })
      const interval = setInterval(whenTransition, 20);
      setTimeout(function () {
        this.setState({ banner: "opened " + bannerclass.opened });
        clearInterval(interval);
      }.bind(this), 600);
    } else
      //change status closed -> oopened
      this.setState({ banner: "opened " + bannerclass.opened });

  }

  close = () => {
    console.log("close")
    const { bannerclass, transition, whenTransition } = this.state.default;

    if (transition) {
      //change status oopened -> closing -> closed
      this.setState({ banner: "closing " + bannerclass.closing });
      const interval = setInterval(whenTransition, 20);
      setTimeout(function () {
        this.setState({ banner: "closed " + bannerclass.closed });
        clearInterval(interval);
      }.bind(this), 600);
    }
    else
      //change status oopened -> closing -> closed
      this.setState({ banner: "closed " + bannerclass.closed });

  }

  render() {
    console.log(this.state)
    const { button } = this.state.default;

    const status = this.state.banner;
    const text = (this.state.status) ? button.closeText : button.openText;
    const className = (this.state.status) ? 'btn' : 'btn changed';
    return (
      <div className={"banner " + status}>
        <a className="wrap" href="#" >
          <img className="img" src={banner} title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字" />
        </a>
        <div className={className + " " + button.class} onClick={this.clickEvent}>{text}</div>
      </div>
    );
  }
}

App.propTypes = {
  option: PropTypes.shape({
    openAtStart: PropTypes.bool,
    autoToggle: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    bannerclass: PropTypes.shape({
      opened: PropTypes.string,
      closed: PropTypes.string,
      opening: PropTypes.string,
      closing: PropTypes.string,
    }),
    button: PropTypes.shape({
      closeText: PropTypes.string,
      openText: PropTypes.string,
      class: PropTypes.string,
    }),
    transition: PropTypes.bool,
    whenTransition: PropTypes.func
  })
};

App.defaultProps = {
  option: {
    openAtStart: true,
    autoToggle: true,
    bannerclass: {
      opened: '',
      closed: '',
      opening: '',
      closing: '',
    },
    button: {
      closeText: '',
      openText: '',
      class: ''
    },
    transition: true,
    whenTransition: function () {
      console.log('whenTransition');
    }
  }
}

export default App;
