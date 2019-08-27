import { h, render, Component } from "preact";
// Dis à Babel de transformer le JSX en appels à h() :
/** @jsx h */

import langSupport from "./json/langSupport.json";
import langNames from "./json/langNames.json";
import langUtils from "./js/utils/lang";


const DEFAULT_STATE = {
  targetLang: '',
  sourceLang: '',
  secondaryTargetLang: ''
}

class BarTranslateOptions extends Component {

  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  getOptions() {
    chrome.storage.sync.get([
    "barTranslate.targetLang", "barTranslate.sourceLang", "barTranslate.secondaryTargetLang"],
      (data) => {
        const targetLang = data['barTranslate.targetLang']
        const sourceLang = data['barTranslate.sourceLang']
        const secondaryTargetLang = data['barTranslate.secondaryTargetLang']

        if (targetLang !== undefined) {
          this.setState({targetLang})
        }
        if (sourceLang !== undefined) {
          this.setState({sourceLang})
        }
        if (secondaryTargetLang !== undefined) {
          this.setState({secondaryTargetLang})
        }

      }
    )
  }

  saveOptions() {
    chrome.storage.sync.set(
      {
        'barTranslate.targetLang': this.state.targetLang,
        'barTranslate.sourceLang': this.state.sourceLang,
        'barTranslate.secondaryTargetLang': this.state.secondaryTargetLang
      },
      () => {
        // Update status to let user know options were saved.
          // Update status to let user know options were saved.
          var status = document.getElementById("status");
          status.textContent = "Options saved.";
          setTimeout(function() {
            status.textContent = "";
          }, 750);
      }
    );
  }

  handleSourceLang(event) {

    this.setState({sourceLang: event.target.value})
  }

  handleTargetLang(event) {

    this.setState({targetLang: event.target.value})
  }

  handleSecondaryTargetLang(event) {

    this.setState({secondaryTargetLang: event.target.value})
  }

  handleReset() {
    this.setState(DEFAULT_STATE)
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

      <div  style="display: flex; flex-direction: column;">
        <div style="width: 100%;">
      <h3>Default source language:</h3>
      <p>By default, the source language is automagically detected</p>
      <select onChange={this.handleSourceLang.bind(this)} value={this.state.sourceLang}>
        <option value="">Automatic detection</option>
        <option disabled>---</option>
      {langSupport.map(lang => {
        const name = langNames[lang].name
        return <option value={lang}>{name}</option>
      })}
      </select></div>

      <div style="width: 100%;">
      <h3>Primary target language:</h3>
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


      <div style="width: 100%;">
      <h3>Secondary target language:</h3>
      <p>If the detected source language match the primary target language, then it switch to secondary, and vice versa</p>
      <select onChange={this.handleSecondaryTargetLang.bind(this)} value={this.state.secondaryTargetLang}>
      <option value="">Default ({langNames[langUtils.getSecondaryAcceptedLanguage()].name})</option>
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

