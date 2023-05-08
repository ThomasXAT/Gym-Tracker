import { Controller } from '@hotwired/stimulus';
import { verify } from './common';

let title = $("#title");
let information = $("#information");
let card = $("<div></div>")
    .addClass("card")
    .appendTo(information);
let header = $("<header></header>")
    .addClass("card-header")
    .appendTo(card);
let main = $("<main></main>")
    .addClass("card-body")
    .appendTo(card);
let footer = $("<footer></footer>")
    .addClass("card-footer")
    .appendTo(card);

function front() {
    $.ajax({
        url: '/ajax/athlete',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            header.empty();
            main.empty();
            footer.empty();
            let athlete = response[title.text().toLowerCase()];
            // Picture
            let section_picture = $("<section></section>")
                .appendTo(header)
                .attr("id", "section-picture")
                .addClass("text-center")
            ;    
                let picture = $("<img>")
                    .appendTo(section_picture)
                    .attr("id", "picture")
                    .attr("alt", athlete["username"])
                    .attr("width", "75%")
                    .addClass("profile-picture border p-1")
                ;
                if (athlete["picture"]) {
                    picture
                        .attr("src", athlete["picture"])
                    ;
                }
                else {
                    picture
                        .attr("src", "/build/images/placeholder-athlete.jpg")
                    ;     
                }
            // Fullname
            if (athlete["firstname"] || athlete["surname"]) {
                let section_fullname = $("<section></section>")
                    .appendTo(main)
                    .attr("id", "section-fullname")
                    .addClass("fs-3 text-center")
                ;
                if (
                    athlete["firstname"] &&
                    athlete["surname"] && (
                        athlete["firstname"].length > 6 ||
                        athlete["surname"].length > 6
                )) {
                    section_fullname.addClass("row");                    
                }
                    if (athlete["firstname"]) {
                        let firstname = $("<span></span>")
                            .appendTo(section_fullname)
                            .attr("id", "firstname")
                            .attr("title", athlete["firstname"])
                            .text(athlete["firstname"])
                            .addClass("text-truncate")
                        ;
                        if (athlete["surname"]) {
                            let space = $("<span></span>")
                                .appendTo(section_fullname)
                                .text(" ")
                            ;
                        }
                    }
                    if (athlete["surname"]) {
                        let surname = $("<span></span>")
                            .appendTo(section_fullname)
                            .attr("id", "surname")
                            .attr("title", athlete["surname"])
                            .text(athlete["surname"])
                            .addClass("text-truncate")
                        ;
                    }
            }
            // Username
            let section_username = $("<section></section>")
                .appendTo(main)
                .attr("id", "section-username")
                .addClass("text-center row")
            ;
                let username = $("<a></a>")
                    .appendTo(section_username)
                    .attr("id", "username")
                    .attr("title", athlete["username"])
                    .attr("href", athlete["username"])
                    .text("@" + athlete["username"])
                    .addClass("text-decoration-none text-nowrap text-truncate")
                ;
            // Navigation
            let rotation = $("<section></section>")
                .appendTo(footer)
                .attr("id", "section-rotation")
                .addClass("text-center justify-content-between")
            ;
                let arrow = $("<div></div>")
                    .appendTo(rotation)
                    .text("verso")
                    .attr("data-action", "click->information#verso")
        }
    });
}

function back() {
    $.ajax({
        url: '/ajax/athlete',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            header.empty();
            main.empty();
            footer.empty();
            let athlete = response[title.text().toLowerCase()];
            // Navigation
            let rotation = $("<section></section>")
                .appendTo(footer)
                .attr("id", "section-rotation")
                .addClass("text-center justify-content-between")
            ;
                let arrow = $("<div></div>")
                    .appendTo(rotation)
                    .text("recto")
                    .attr("data-action", "click->information#recto")
        
        }
    });    
}

export default class extends Controller {
    connect() {
        front();
    }
    recto() {
        front();
    }
    verso() {
        back();
    }
    
}
