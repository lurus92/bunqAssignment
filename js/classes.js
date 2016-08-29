/***************************CLASSES DEFINITION****************************/
//TODO: If classes are too long, create a different file for each one

const baseUrl = "http://assignment.bunq.com";


class User {
    constructor(userId){
        //Attributes Declarations
        var self = this;
        this.id = null;
        this.name = null;
        this.hasNoConversation;
        this.conversation = new Array();
        
        //Method that acquires basic details of the user
        this.getBaseData = function(){
            return jQuery.get({
                    url: baseUrl+"/user/"+userId,
                    success: function (result){
                        if(!result.id){
                            console.log("Bad user in input");
                        }else{  
                            self.id=result.id;
                            self.name = result.name;
                        }
                    },
            });
        }
        
        this.getConversation = function(){
            console.log(self);
            return jQuery.get({
                    url: baseUrl+"/conversation/user/"+self.id,
                    success: function (result){
                        console.log("executing getConversation");
                        console.log(result);
                        if(!result.length) self.hasNoConversation = true;
                        else{
                            self.hasNoConversation = false;
                            for(var i=0;i<result.length;i++)
                                self.conversation.push(result[0].conversation);
                        }
                    },
            });
        }
        
        }
}


class Manager{
    constructor(){
        var self = this;
        this.getUsers = function(){
            jQuery.get({
                        url: baseUrl+"/users",
                        success: function (result){
                            self.users=result;
                        },
                    });
        }
    }
}

class Conversation{
    constructor(convID){
        var self = this;
        this.id = convID;
        this.name = null;
        this.users = new Array();
        this.isOneToOne = null;
        this.messages = new Array();
        
        this.retriveDetails = function(){
            return jQuery.get({
                        url: baseUrl+"/conversation/"+self.id,
                        success: function (result){
                            self.name=result.name;
                            self.users=result.users;
                            if (result.users.length>2) self.isOneToOne = false;
                            else self.isOneToOne = true;
                        },
                    });
        }
        
        this.retriveFirstMessages = function(){
            return jQuery.get({
                        url: baseUrl+"/conversation/"+self.id+"/message/limited?limit=5&offset=0",
                        success: function (result){
                            self.messages = result;
                        },
                    });
        }
        
        /*this.retriveMessageLimited = function (limit,offset){
            return 
        }*/
    }
}