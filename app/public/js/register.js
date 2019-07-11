$(document).ready(function() {

    entrar = self => {
        let email = $("#email").val(),
            senha = $("#senha").val();

        console.log(email)

        if (email == "" || senha == "") {
            $(".msg").html("Insira seus dados para poder entrar em sua conta.");
            return;
        }

        console.log("Tudo certo")
        self.html("<img src='public/images/73.gif' height='32' alt='Loading' />");
        $.ajax({
            url: `http://localhost:5000/login`,
            method: "POST",
            data: {
                email,
                senha
            },
            success: function(data) {
                $.ajax({
                    url: "auth.php",
                    method: "POST",
                    data: {
                        data: JSON.stringify(data)
                    },
                    success: function(data) {
                        window.location.href = data;
                        console.log(data);
                    }
                });
            }
        });

    }


});