/*
 * Welcome to your app"s main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.scss";
import "./styles/editor.scss";

// start the Stimulus application
import "./bootstrap";

require("@fortawesome/fontawesome-free/css/all.min.css");
require("@fortawesome/fontawesome-free/js/all.js");

require("bootstrap");

let identifiers = document.querySelectorAll(".identifier");
if (identifiers.length > 0) {
    $.ajax({
        url: "/api/athlete",
        type: "GET",
        dataType: "json",
        success: function(response) {
            let athletes = [];
            let string;
            $.each(response, function(i, athlete) {
                athletes.push(athlete)
            }); 
            athletes.sort(function(a, b) {
                return b.username.length - a.username.length;
            });
            identifiers.forEach(function(identifier) {
                athletes.forEach(function(athlete) {
                    string = identifier.innerHTML;
                    identifier.innerHTML = string.replace(
                        "@" + athlete.username, 
                        "<a class='text-decoration-none' href='@" + athlete.username + "'>@" + athlete.username + "</a>"
                    );
                })
            });
        }
    });
}