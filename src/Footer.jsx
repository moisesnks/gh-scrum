import React from "react";
import { GithubIcon } from "./Icons";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div>
                    <h3>Lumonidy Dev</h3>
                    <p>
                        Visita nuestra organización en{" "}
                        <a href="https://github.com/lumonidy-dev" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        {" | "}
                        Visita el repositorio en{" "}
                        <a href="https://github.com/moisesnks/gh-scrum" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </p>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
