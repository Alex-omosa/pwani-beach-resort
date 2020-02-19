import React, { Component } from "react";
import Title from "./Title";
import { FaHiking, FaBeer, FaShuttleVan, FaCocktail } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaBeer />,
        title: "Beer",
        info:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla profecto est, quin suam vim retineat a primo ad extremum. Et ille ridens:"
      },
      {
        icon: <FaHiking />,
        title: "Hiking",
        info:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla profecto est, quin suam vim retineat a primo ad extremum. Et ille ridens:"
      },
      {
        icon: <FaShuttleVan />,
        title: "Pick-up Van",
        info:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla profecto est, quin suam vim retineat a primo ad extremum. Et ille ridens:"
      },
      {
        icon: <FaCocktail />,
        title: "Cocktails",
        info:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla profecto est, quin suam vim retineat a primo ad extremum. Et ille ridens:"
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
