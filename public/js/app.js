$("#scrape").on("click", function(req, res){
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(){
        location.reload();
    })
})

$.getJSON("/articles", function(data){
    for(let i= 0; i < data.length; i++){
        $("#articles").append("<div class='card'><div class='card-header'><h3><a href=" + data[i].url + ">" + data[i].title +"</a><a class='btn btn-success save' data-id=" + data[i]._id + ">Save Article</a></h3><div class='card-body'>" + data[i].summary + "</div></div></div>")
        // <p data-id='" + data[i]._id+ "'>" +data[i].title + "<br />" + data[i].url + "</p>");
    }
});

$.getJSON("/savedapi", function(data){
    for(let i= 0; i < data.length; i++){
        $("#savedArticles").append("<div class='card'><div class='card-header'><h3><a href=" + data[i].url + ">" + data[i].title +"</a><a class='btn btn-success unsave' data-id=" + data[i]._id + ">Delete Article</a></h3><div class='card-body'>" + data[i].summary + "</div></div></div>") 
        // <p data-id='" + data[i]._id+ "'>" +data[i].title + "<br />" + data[i].url + "</p>");
    }
});

$(document).on("click", ".save", function(){
    let thisId = $(this).attr("data-id");
    console.log(thisId)

    $.ajax({
        method: "PUT",
        url: "/articles/" + thisId
    })
    .then(function(data){
    });
});

$(document).on("click", ".unsave", function(){
    let thisId = $(this).attr("data-id");
    console.log(thisId)

    $.ajax({
        method: "PUT",
        url: "/articles/" + thisId
    })
    .then(function(data){
        location.reload();
    });
});

$(document).on("click", ".card", function(){
    $("#notes").empty();

    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data){
        // console.log(data);

        $("#notes").append("<h2>" +data.title + "</h2>");
        $("#notes").append("<input id='titleInput' name='title'>");
        $("#notes").append("<textarea id='bodyInput' name='body'></textarea");
        $("#notes").append("<button data-id='" + data._id + "'id='saveNote'>Save Note</button>")

        if (data.note){
            $("#titleInput").val(data.note.title);
            $("#bodyInput").val(data.note.body);
        }
    });
});

$(document).on("click", "#saveNote", function(){
    let thisId = $(this).att("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    })
    .then(function(data){
        console.log(data);
        $("#notes").empty();
    });

    $("#titleInput").val("");
    $("#bodyInput").val("");
})