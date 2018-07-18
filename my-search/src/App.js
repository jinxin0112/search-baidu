import React, { Component } from 'react';
import './App.css';
import jsonp from 'jsonp';


function throttle(handle, wait) {  // 节流
  let timer = null;
  let pre = new Date();
  return function () {
    let now = new Date();
    clearTimeout(timer);
    timer = null;
    if (now - pre >= wait) {
      handle();
    } else {
      timer = setTimeout(() => {
        handle();
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.value = '';
    this.state = {
      value:'',
      wd: [],
      index: -1
    }
  }

  handleChange(event) {
    let wd = event.target.value;
    this.value = wd;
    throttle(() => {
      if (wd !== '') {
        jsonp(`http://www.baidu.com/su?wd=${wd}`, { param: 'cb' }, (err, data) => {
          this.setState({
            wd: data.s
          });
        });
      } else {
        this.setState({
          wd: []
        });
      }
    }, 200)();
  }

  handleKeyDown(event) {
    let code = event.keyCode;
    let index = this.state.index;
    if (code === 13) {
      window.location.href = `https://www.baidu.com/s?wd=${event.target.value}`;
    } else if (code === 38) { // 上
      index === -1 ? index = this.state.wd.length - 1 : index--;
    } else if (code === 40) { // 下
      index === this.state.wd.length - 1 ? index = -1 : index++;
    }
    index === -1 && (event.target.value = this.value);
    this.setState({ index });
  }
  handleClick(event) {
    window.location.href = `https://www.baidu.com/s?wd=${event.target.innerText}`;
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <img src={require('./timg.png')} className="logo"/>
          <input className="searchInput" type="text" 
          onKeyDown={this.handleKeyDown.bind(this)} 
          onChange={this.handleChange.bind(this)} 
          value={this.state.wd[this.state.index]} />
          <div className="list">
            {
              this.state.wd.map((item, index) => <div className={"item " + (this.state.index === index ? "active" : "")} key={index} onClick={this.handleClick.bind(this)}>{item}</div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
