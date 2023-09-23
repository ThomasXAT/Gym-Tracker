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


fetch("/api/athlete")
    .then(response => response.json())
    .then(data => {            
        let athletes = Object.values(data);         
        let athletes_sorted_by_length = athletes;
        athletes_sorted_by_length.sort((a, b) => b.username.length - a.username.length);

        // Identifiers
        let identifiers = document.querySelectorAll(".identifier");
        if (identifiers.length > 0) { 
            let string;
            identifiers.forEach(identifier => {
                athletes_sorted_by_length.forEach(athlete => {
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
        }

        // Inputs
        let inputs = document.querySelectorAll(".identifier");
        inputs.forEach(function(input) {
            input.addEventListener("keyup", function() {
                let characters = input.value.split('')
                let position = input.selectionStart;
                let reversed_at = characters.reverse().indexOf('@', characters.length - position)
                if (reversed_at !== -1) {
                    let at = characters.length - reversed_at;
                    let final_characters = [];
                    characters.reverse().slice(at).every(function(character) {
                        if (new RegExp(/[a-zA-Z0-9_]/).test(character)) {
                            final_characters.push(character);
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    let distance = position - at;
                    let size = final_characters.length;
                    let search = "";
                    if (distance <= size) {
                        for (let i = 0; i < distance; i++) {
                            search += final_characters[i];
                        }
                        let results = athletes_sorted_by_length.filter(athlete => athlete.username.startsWith(search));
                        if (results.length && ((characters[position] === " " || position === characters.length)) && search !== results[0].username) {
                            const BEFORE = input.value.substring(0, position - distance);
                            const AFTER = input.value.substring(position);
                            const VALUE = BEFORE + results[0].username + AFTER;
                            if (input.id !== "session-title" || VALUE.length <= 64) {
                                input.value = VALUE;
                                input.setSelectionRange(position, input.selectionStart - AFTER.length);
                            }
                        }
                    }
                }
            });
        });
    })
    .catch(error => {
        console.error(error);
    })
;

import { Modal } from 'bootstrap'

if (document.getElementById("_add")) {
    let buttons_new_set = document.querySelectorAll(".button-new-set");
    let modal_add = new Modal(document.getElementById("_add"));
    let modal_exercice = new Modal(document.getElementById("_exercice"));
    buttons_new_set.forEach(function(button) {
        button.addEventListener("click", function() {
            let exercices = document.getElementById("_add-form").children.length;
            if (exercices && document.getElementById("_exercice_validity").value === "1") {
                modal_add.show();
            }
            else {
                modal_exercice.show();
            }
        });
    });
}

let magnifying_glasses = document.querySelectorAll(".magnifying-glass");
magnifying_glasses.forEach(magnifying_glass => {
    magnifying_glass.addEventListener("click", function() {
        const form = magnifying_glass.closest("form");
        if (form) {
            form.submit();
        }
    });
});