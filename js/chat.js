var manager = new Manager();
var currentUser = null;
var conversationToDisplay = null;

//manager.getUsers();
$(document).ready(function(){
    //UI
    $("#lateral-panel").resizable();

    //INITIALIZATION
    console.log(manager.users);

    //Let's assume the user is 1
    currentUser = new User(1);
    //I load now basic details for the user and display on the top
    $.when(currentUser.getBaseData()).done(function(){
        $("#panel-header").text("Hello, "+currentUser.name);
        //Now I load the conversation of the user, and display them on the left panel
        $.when(currentUser.getConversation()).done(function(){
            if (currentUser.hasNoConversatation){
                $("#panel-header").append("You have no conversations! Start one now.");
            }else{
                for(var i = 0; i<currentUser.conversation.length; i++){
                    $("#lateral-panel-content").append("<div class='message-panel-container' id='conv-"+currentUser.conversation[i].conversationId+"'>"+currentUser.conversation[i].conversationId+"</div>");
                }
            }
            $("#panel-header").text("Hello, "+currentUser.name);

            //UI panel button on the left
            $(".message-panel-container").click(function(e){
                var idClicked = e.target.id.split("-")[1];
                conversationToDisplay = new Conversation(idClicked);
                $.when(conversationToDisplay.retriveDetails()).done(function(){

                   console.log("Now showing conversation obj"); console.log(conversationToDisplay);
                })
                $.when(conversationToDisplay.retriveFirstMessages()).done(function(){

                   console.log("Now showing messages"); console.log(conversationToDisplay.messages);
                })


            });
        });
    });






//TODO: Delete following functions
//I insert elements in the left panel, acquiring all the conversation of the user
//populateLeftPanel(user)


});

function listUser(){
    jQuery.ajax({
        url: baseUrl+"/users",
        success: function (result){
            console.log(result);
        },
    });
}

function populateLeftPanel(user){
    jQuery.get({
        url: baseUrl+"/conversation/user/"+user,
        success: function (result){
            console.log(result);
            if(result.length==0){
                //user has no conversation at all
               $("#lateral-panel-content").append("<div class='message-panel-container'>NO CONVERSATIONS!</div>");
            }
            if (!result[0].length){
                //user has only one conversation
                $("#lateral-panel-content").append("<div class='message-panel-container'>"+result[0].conversation+"</div>");
            }else{
                //User has more than one conversation. I list them all.
                for(var i = 0; i<result[0].conversation.length; i++){
                    $("#lateral-panel-content").append("<div class='message-panel-container'>"+result[0].conversation[i]+"</div>");
                }
            }
            //var objectsToDisplay = $.parseJSON(result);
            //console.log(objectsToDisplay);
               //     $("#orientationInfo").html(" > "+objectsToDisplay.titolo);
        },
    });
}