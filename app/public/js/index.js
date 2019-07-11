buscaArtista_a = texto => {
    $("#resultado_pesquisa_a").css("display", "block");
    $("#resultado_pesquisa_a").html('<img src="./../images/loading_artist.svg" alt="A carregar..." height="32" />');
    setTimeout(() => {
        $.ajax({
            url: "encarregados/confirmarcarteira",
            method: "GET",
            success: function(data) {

                if (data == "") {
                    $("#resultado_pesquisa_a").css("display", "none");
                } else {
                    console.log(data);
                    for (let i in data) {
                        $("#resultado_pesquisa_a").html(`<li onclick="setArtist('${data[i].artist}')">${data[i].artist}</li>`);
                    }
                }

            }
        });
    }, 2000);
};