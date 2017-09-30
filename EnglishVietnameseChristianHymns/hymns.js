var songs;

$(function() {
    // Filter on type
    $(".filter-text").on("input", () => applyFilter());

    // Download song list
    $.ajax({
        url: "songs_raw.json",
        method: "GET",
    }).done(function(data) {
        songs = data;
        showSongs();
    }).fail(function() {
        alert("Tải tập tin thất bại, vui lòng thử lại.");
    });
});

function showSongs() {
    var lst = $("#lst-songs");
    lst.html("");
    
    var template = $("#template-song-row").html();

    for (var song of songs) {
        var row = $(template);

        row.find(".no").html(song.number);
        row.find(".viName").html(song.vi);
        row.find(".enName").html(song.en);

        lst.append(row);
    }

    applyFilter();

    $("#lbl-loading").addClass("d-none");
    $(".content").removeClass("d-none");
}

function applyFilter() {
    var lst = $("#lst-songs");

    // Show all first
    var rows = lst.find("tr");
    rows.removeClass("d-none");

    // Filter if needed
    var keyword = $(".filter-text").val().toLowerCase().replace(/[,\.]/g, "");
    if (keyword) {
        rows.each(function() {
            var row = $(this);

            // Remove all non-alphanumerical characters
            var rowContent = row.text().toLowerCase().replace(/[,\.]/g, "");

            if (rowContent.indexOf(keyword) == -1) {
                row.addClass("d-none");
            }
        });
    }
}