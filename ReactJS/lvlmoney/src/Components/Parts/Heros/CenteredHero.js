import React, { Component } from "react";
import logo from '../../Images/lvl_light.svg';
import './CenteredHero.css';


export default class CenteredHero extends Component {
  render() {
    return (
      <div class="px-4 py-5 my-5 text-center ">
        <img
          class="d-block mx-auto mb-3 img-fluid imgsize "
          src={logo}
          alt=""
          
        />

        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-primary btn-lg px-4 gap-3">
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
}
