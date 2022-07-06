document.addEventListener("DOMContentLoaded", function (event) {

    const togglePopup = document.querySelector('#postCreateBtn'); // Create new Post popup
    if(togglePopup != null){
        togglePopup.addEventListener('click', function(){
            let pop = document.getElementById("popup-1");
            pop.classList.toggle("active");
        });
    }

    const exitPopup = document.querySelector('#exitBtn'); // Close create post popup 
    if(exitPopup != null){
        exitPopup.addEventListener('click', function(){
            let pop = document.getElementById("popup-1");
            pop.classList.toggle("active");
        });
    }

    /*****************************************************************************/

    // here -- Route checkEmailReg -- Controller getCheckEmailReg
    const emailInputReg = document.querySelector('#emailReg'); 
    if(emailInputReg != null){
        emailInputReg.addEventListener('keyup', function () {
            if(document.getElementById("emailReg").value != ""){
                fetch("/checkEmailReg?" + new URLSearchParams 
                    ({email: document.getElementById("emailReg").value,}), 
                    {method: 'GET',}
                )
                .then(res => res.text())
                .then(data => {
                    if(data === '{"email":""}'){
                        $("#error").text("Email already in use. ");
                        $("#register").attr("disabled", true); 
                    }else{
                        $("#error").text("");
                        $("#register").removeAttr("disabled");  
                    }
                })
                .catch(error => console.log("ERROR"))
            }else{
                $("#error").text("");
            }
        });
    } 

    // here -- Route checkUsernameReg -- Controller getCheckUsernameReg
    const usernameInputReg = document.querySelector('#usernameReg'); 
    if(usernameInputReg != null){
        usernameInputReg.addEventListener('keyup', function () {
            if(document.getElementById("usernameReg").value != ""){
                fetch("/checkUsernameReg?" + new URLSearchParams 
                    ({username: document.getElementById("usernameReg").value,}), 
                    {method: 'GET',}
                )
                .then(res => res.text())
                .then(data => {
                    if(data === '{"username":""}' ){
                        $("#error").text("Username already exists. ");
                        $("#register").attr("disabled", true); 
                    }else{
                        $("#error").text("");
                        $("#register").removeAttr("disabled");  
                    }
                })
                .catch(error => console.log("ERROR"))
            }else{
                $("#error").text("");
            }
        });
    }

    /*****************************************************************************/

    //here -- Route addPost -- Controller getAddPost
    const postButton = document.querySelector('.post-button'); 
    if(postButton != null){
        postButton.addEventListener('click', function () {
            
        }); 
    }

    const postDelete = document.querySelector('.postsContainer');
    if(postDelete != null){
        postDelete.addEventListener('click', function (e) {
            if (e.target instanceof Element && e.target.matches('#delete')) {
                var idNumber = e.target.getAttribute("idindb");
                console.log("idnumnber + " + idNumber)
                $(e.target).closest('.post').remove(); 
                fetch("/deletePost?" + new URLSearchParams ({id:idNumber,}), {method: 'GET',}); 
                location.reload();
            }
        }, true);
    }

    const postEdit = document.querySelector('.postsContainer');
    if(postEdit != null){
        postEdit.addEventListener('click', function (e) {
            if (e.target instanceof Element && e.target.matches('#edit')) {
                $(e.target).closest(".post").find(".postContents").attr('contenteditable', 'true');
                $(e.target).closest(".post").find(".postContents").css("background-color", "rgb(199,199,199)");
                $(e.target).closest(".post").find(".postContents").css("border", "1px solid black");
                $(e.target).closest(".post").find("#edit").attr('src', 'images/check.png'); 
    
                $(e.target).closest(".post").find(".postContents").keypress(function (b){
                    var key = b.which;
                    if (key == 13) {
                        $(b.target).closest(".post").find(".postContents").attr('contenteditable', 'false');
                        $(b.target).closest(".post").find(".postContents").css("background-color", "transparent");
                        $(b.target).closest(".post").find(".postContents").css("border", "none");
                        $(b.target).closest(".post").find("#edit").attr('src', 'images/edit.png'); 

                        // Update contents
                        var idNumber = e.target.getAttribute("idindb");
                        var newContent = $(e.target).closest(".post").find(".postContents").text();
                        console.log("New content: " + newContent);
                        fetch("/editPost?" + new URLSearchParams ({id:idNumber, content:newContent}), {method: 'GET',});
                        console.log(newContent);
                        location.reload();
                    }
                });
            }
        });
    }
    
    const userProfile = document.querySelector('.postsContainer');
    var forusername;
    var forname;

    if(userProfile != null){
        userProfile.addEventListener('click', function (e) {
            if (e.target instanceof Element && e.target.matches('#profilepic')) {

                forname = $(e.target).closest(".post").find(".name").text();
              

                forusername =  e.target.getAttribute('usernameindb')
                var username =  forusername

                fetch ("/getbio?" + new URLSearchParams({
                    username: username
                }), {method: 'GET',}
                ).then (res => res.text())
                .then (data => {
                    console.log("this is dataaaa! " + data);
                    
                fetch ("/getprofpic?" + new URLSearchParams({
                     username: username
                }), {method: 'GET',}
                ).then (res => res.text())
                .then (profpic => {
                    console.log("this is dataaaa! " + profpic);
                   
                
                fetch("/userAny?" + new URLSearchParams({
                    bio : data,
                    profilePic : profpic,
                    username : username,
                    name : forname,
                }), {method: 'GET',}
                ).then(res => {
                    console.log(res);
                    window.location.href=res.url;
                })
                })
                });
            }
        });
    }

    const bioEdit = document.querySelector('.bio');
    if(bioEdit != null){
        bioEdit.addEventListener('click', function(e){
            $(e.target).attr('contenteditable', 'true');
                $(e.target).css("background-color", "rgb(199,199,199)");
                $(e.target).css("border", "1px solid black");

                $(e.target).keypress(function (b){
                    var key = b.which;
                    if (key == 13) {
                        $(b.target).attr('contenteditable', 'false');
                        $(b.target).css("background-color", "transparent");
                        $(b.target).css("border", "none");

                        // Update contents
                        var username = e.target.getAttribute("username");
                        var newContent = $(e.target).text();
                        fetch("/editBio?" + new URLSearchParams ({username:username, bio:newContent}), {method: 'GET',});
                        location.reload(); 
                    }
                });
        });
    }
});