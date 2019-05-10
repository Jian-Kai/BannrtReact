import React from 'react';
import './App.css';
import banner from './imgs/banner.png'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      default: {
        // 設定一開始是否為開或合
        openAtStart: true, // [boolean] true | false
        // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
        autoToggle: 3000, // [boolean|number] true | false | 3000
        // 設定收合展開按鈕
        button: {
          closeText: '收合', // [string]
          openText: '展開', // [string]
          class: 'btn' // [string]
        },
        // 設定模組在各狀態時的class
        bannerclass: {
          closed: 'closed', // [string]
          closing: 'closing', // [string]
          opened: 'opened', // [string]
          opening: 'opening' // [string]
        },
        // 是否要有transition效果
        transition: true,
        // 當有transition時，要執行的callback function
        whenTransition: function () {
          console.log('whenTransition');
        }
      },
      status: null,
      banner: null
    };

    this.clickEvent = this.clickEvent.bind(this);
    //this.open = this.open.bind(this);
    //this.close = this.close.bind(this);
  }

  componentDidMount() {
    const { openAtStart, bannerclass } = this.state.default;
    this.setState({
      status: openAtStart,
      banner: (openAtStart) ? bannerclass.opened : bannerclass.closed
    });

    this.toggle();
  }

  toggle(){
    const {autoToggle} = this.state.default;
    console.log("autoToggle : " + autoToggle);
    
    if(autoToggle){
      //identify autoToggle ture or type of number
      const time = (typeof autoToggle === 'number')? autoToggle : 500;
      setTimeout(this.clickEvent, time);
      
    }
  }

  clickEvent() {
    console.log("click")
    const { status } = this.state;
    //console.log(status);
    (status) ? this.close() : this.open();
    this.setState({ status: !status })
  }

  open() {
    console.log("open")
    const { bannerclass, transition, whenTransition } = this.state.default;

    if (transition) {
      //change status closed -> opening -> oopened
      this.setState({ banner: bannerclass.opening })
      const interval = setInterval(whenTransition,20);
      setTimeout(function () {
        this.setState({ banner: bannerclass.opened });
        clearInterval(interval);
      }.bind(this), 600);
    } else
      //change status closed -> oopened
      this.setState({ banner: bannerclass.opened });

  }

  close() {
    console.log("close")
    const { bannerclass, transition, whenTransition } = this.state.default;

    if (transition) {
      //change status oopened -> closing -> closed
      this.setState({ banner: bannerclass.closing });
      const interval = setInterval(whenTransition,20);
      setTimeout(function () {
        this.setState({ banner: bannerclass.closed });
        clearInterval(interval);
      }.bind(this), 600);
    }
    else
      //change status oopened -> closing -> closed
      this.setState({ banner: bannerclass.closed });

  }

  render() {
    const { button } = this.state.default;

    const status = this.state.banner;
    const text = (this.state.status) ? button.closeText : button.openText;
    return (
      <div className={"banner " + status}>
        <a className="wrap" href="#" >
          <img className="img" src={banner} title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字" />
          <button className={button.class} onClick={this.clickEvent}>{text}</button>
        </a>
      </div>
    );
  }
}

export default App;
