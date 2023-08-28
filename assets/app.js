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

// CKEditor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/fr";

let editors = document.querySelectorAll(".editor");
editors.forEach(function(editor) {
    ClassicEditor.create(editor, {
        language: "fr",
        toolbar: {
            items: [
                "heading",
                "|", "bold", "italic",
                "|", "bulletedList", "numberedList",
                "|", "undo", "redo",
            ],
            shouldNotGroupWhenFull: false
        }        
    });
});

let identifiers = document.querySelectorAll(".identifier");
if (identifiers.length > 0) {
    fetch("/api/athlete")
        .then(response => response.json())
        .then(data => {
            let athletes = Object.values(data);
            let string;
            athletes.sort((a, b) => b.username.length - a.username.length);
            identifiers.forEach(identifier => {
                athletes.forEach(athlete => {
                    string = identifier.innerHTML;
                    identifier.innerHTML = string.replaceAll(
                        "@" + athlete.username, 
                        "<a class='text-decoration-none' href='/@~" + athlete.username + "'><span>@</span><span>" + athlete.username + "</span></a>"
                    );
                });
            });
            identifiers.forEach(identifier => {
                identifier.innerHTML = identifier.innerHTML.replaceAll("/@~", "/@");
            });
        })
        .catch(error => {
            console.error(error);
        })
    ;
}

import { Modal } from 'bootstrap'

if (document.getElementById("_add")) {
    let buttons_new_set = document.querySelectorAll(".button-new-set");
    let modal_add = new Modal(document.getElementById("_add"));
    let modal_exercice = new Modal(document.getElementById("_exercice"));
    buttons_new_set.forEach(function(button) {
        button.addEventListener("click", function() {
            let exercices = document.getElementById("_add-form").children.length;
            if (exercices) {
                modal_add.show();
            }
            else {
                modal_exercice.show();
            }
        });
    });
}