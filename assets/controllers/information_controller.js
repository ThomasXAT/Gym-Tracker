import { Controller } from "@hotwired/stimulus";

let identifier = $("#identifier");
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
        url: "/api/athlete",
        type: "GET",
        dataType: "json",
        success: function(response) {
            header.empty();
            main.empty();
            footer.empty();
            let athlete = response[identifier.text()];
            // Picture
            let section_picture = $("<section></section>")
                .appendTo(header)
                .attr("id", "section-picture")
                .addClass("text-center py-1")
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
            // Identity
            main.addClass("d-flex justify-content-center align-items-center");
            let section_identity = $("<section></section>")
                .appendTo(main)
                .attr("id", "section-identity")
                .addClass("text-center w-100")
            ;
                // Fullname
                if (athlete["firstname"] || athlete["surname"]) {
                    let section_fullname = $("<section></section>")
                        .appendTo(section_identity)
                        .attr("id", "section-fullname")
                        .addClass("fs-3 overflow-auto")
                    ;
                        let fullname = $("<span></span>")
                            .appendTo(section_fullname)
                            .attr("id", "fullname")
                            .addClass("text-truncate")
                        if (athlete["firstname"]) {
                            let firstname = $("<span></span>")
                                .appendTo(fullname)
                                .attr("id", "firstname")
                                .text(athlete["firstname"])
                            ;
                            if (athlete["surname"]) {
                                let space = $("<span></span>")
                                    .appendTo(fullname)
                                    .text(" ")
                                ;
                            }
                        }
                        if (athlete["surname"]) {
                            let surname = $("<span></span>")
                                .appendTo(fullname)
                                .attr("id", "surname")
                                .text(athlete["surname"])
                            ;
                        }
                }
                // Username
                let section_username = $("<section></section>")
                    .appendTo(section_identity)
                    .attr("id", "section-username")
                    .addClass("overflow-auto")
                ;
                    let username = $("<a></a>")
                        .appendTo(section_username)
                        .attr("id", "username")
                        .attr("href", athlete["username"])
                        .text("@" + athlete["username"])
                        .addClass("text-decoration-none text-truncate")
                    ;
            // Rotation
            let section_rotation = $("<section></section>")
                .appendTo(footer)
                .attr("id", "section-rotation")
                .addClass("d-flex justify-content-between align-items-center")
            ;
                let left = $("<i></i>")
                    .appendTo(section_rotation)
                    .addClass("fa-solid fa-arrow-left pointer d-none d-md-block")
                    .attr("data-action", "click->information#verso")
                ;
                let page = $("<span></span>")
                    .appendTo(section_rotation)
                    .text("1 / 2")
                    .attr("data-action", "click->information#verso")
                    .addClass("m-auto pointer")
                ;
                let right = $("<i></i>")
                    .appendTo(section_rotation)
                    .addClass("fa-solid fa-arrow-right pointer d-none d-md-block")
                    .attr("data-action", "click->information#verso")
                ;
        }
    });
}

function back() {
    $.ajax({
        url: "/api/athlete",
        type: "GET",
        dataType: "json",
        success: function(response) {
            header.empty();
            main.empty();
            footer.empty(); 
            let athlete = response[identifier.text()];
            // Email
            let section_email = $("<section></section>")
                .appendTo(header)
                .attr("id", "section-email")
                .addClass("overflow-auto text-center")
            ;
                let email = $("<a></a>")
                    .appendTo(section_email)
                    .attr("id", "email")
                    .attr("href", "#")
                    .text(athlete["email"])
                    .addClass("text-decoration-none text-truncate")
            // Description
            main.removeClass("d-flex justify-content-center align-items-center");
            let section_description = $("<section></section>")
                .appendTo(main)
                .attr("id", "section-description")
                .addClass("overflow-auto border p-1 bg-black")
            ;
                let description = $("<span></span>")
                    .appendTo(section_description)
                    .attr("id", "description")
                    .text(athlete["description"])
                    .addClass("")
                ;
            // Rotation
            let section_rotation = $("<section></section>")
                .appendTo(footer)
                .attr("id", "section-rotation")
                .addClass("d-flex justify-content-between align-items-center")
            ;
                let left = $("<i></i>")
                    .appendTo(section_rotation)
                    .addClass("fa-solid fa-arrow-left pointer d-none d-md-block")
                    .attr("data-action", "click->information#recto")
                ;
                let page = $("<span></span>")
                    .appendTo(section_rotation)
                    .text("2 / 2")
                    .attr("data-action", "click->information#recto")
                    .addClass("m-auto pointer")
                ;
                let right = $("<i></i>")
                    .appendTo(section_rotation)
                    .addClass("fa-solid fa-arrow-right pointer d-none d-md-block")
                    .attr("data-action", "click->information#recto")
                ;
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
