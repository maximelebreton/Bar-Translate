import { h, render, Component } from "preact";
// Dis à Babel de transformer le JSX en appels à h() :
/** @jsx h */

import langSupport from "./json/langSupport.json";
import langNames from "./json/langNames.json";
import langUtils from "./js/utils/lang";


const DEFAULT_STATE = {
  targetLang: '',
  sourceLang: ''
}

class BarTranslateOptions extends Component {

  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  getOptions() {
    chrome.storage.sync.get([
    "barTranslate.targetLang", "barTranslate.sourceLang"],
      (data) => {
        console.log(data, 'get')
        const targetLang = data['barTranslate.targetLang']
        const sourceLang = data['barTranslate.sourceLang']
        if (targetLang !== null) {
          this.setState({targetLang})
        }
        if (sourceLang !== null) {
          this.setState({sourceLang})
        }

      }
    )
  }

  saveOptions() {
    chrome.storage.sync.set(
      {
        'barTranslate.targetLang': this.state.targetLang,
        'barTranslate.sourceLang': this.state.sourceLang
      },
      () => {
        // Update status to let user know options were saved.
          // Update status to let user know options were saved.
          var status = document.getElementById("status");
          status.textContent = "Options saved.";
          setTimeout(function() {
            status.textContent = "";
          }, 750);
        console.log(this.state, 'saved')
      }
    );
  }

  handleSourceLang(event) {

    this.setState({sourceLang: event.target.value})
    console.log(this.state)
  }

  handleTargetLang(event) {

    this.setState({targetLang: event.target.value})
    console.log(this.state)
  }

  handleReset() {
    this.setState(DEFAULT_STATE)
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.saveOptions()
  }

  componentWillMount() {
    this.getOptions()
  }

  render(props, state) {

      return <form onSubmit={this.handleSubmit.bind(this)}>
      <div>

      <div  style="display: flex; flex-direction: row;">
        <div style="width: 50%; margin-right: 1rem;">
      <h3>Source language:</h3>
      <p>By default, the source language is automagically detected</p>
      <select onChange={this.handleSourceLang.bind(this)} value={this.state.sourceLang}>
        <option value="">Automatic detection</option>
        <option disabled>---</option>
      {langSupport.map(lang => {
        const name = langNames[lang].name
        return <option value={lang}>{name}</option>
      })}
      </select></div>

      <div style="width: 50%; margin-left: 1rem;">
      <h3>Target language:</h3>
      <p>By default, the target language is the browser language</p>
      <select onChange={this.handleTargetLang.bind(this)} value={this.state.targetLang}>
        <option value="">Browser language ({langNames[langUtils.getBrowserLanguage()].name})</option>
        <option disabled>---</option>
      {langSupport.map(lang => {
        const name = langNames[lang].name
        return <option value={lang}>{name}</option>
      })}
      </select>
      </div>
      </div>
      </div>

      <button type="button" onclick={this.handleReset.bind(this)} style="margin-top: 2rem; margin-right: 1em;">Reset to defaults</button>
      <button type="submit" style="margin-top: 2rem;">Save</button>
      <div id="status"></div>

    </form>;
  }
}

render(
  <BarTranslateOptions></BarTranslateOptions>,
  document.body
);

