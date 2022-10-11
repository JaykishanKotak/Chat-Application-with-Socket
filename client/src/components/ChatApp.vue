<template>
    <h1>Chat App</h1>
    <!--Rooms-->
    <!-- Only Show This if User is Not Joined -->
    <div v-if="!joined" class="parent-container">
        <div class="name-container">
            <input type="text" class="user-name" v-model="currentUser" />
            <button class="join-button" v-on:click="join">Join</button>
        </div>
    </div>
    <!-- If User is Not Joined -->
    <div v-if="joined">
        <div class="list-container">
            <div class="container">
                <b>{{ room.roomId }}</b>
            </div>
            <div v-for="message in messages" :key="message.id">
                <b>
                    {{ message.user }}
                </b>
                : {{ message.text }}
            </div>
        </div>
        <div class="text-input-container">
            <textarea v-model="text" class="text-message" v-on:keyup.enter="sendMessage"></textarea>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";

export default {
    name: 'ChatApp',
    data() {
        return {
            joined: false,
            currentUser: "",
            text: "",
            room: "",
            messages: [
                //{
                // id: 1,
                //test: "Hello",
                //user: "User1",
                //}
            ]
        }
    },
    methods: {
        join() {
            //console.log(this.currentUser);
            this.joined = true;
            this.socketInstance = io("http://localhost:3000");

            this.socketInstance.on(
                "room:connected", (roomId) => {
                    this.room = this.room.concat(roomId);
                },
                "message:received", (data) => {
                    this.messages = this.messages.concat(data);
                }
            )
        },
        sendMessage() {
            this.addMessage();
            this.text = "";
            //console.log(this.text);
        },
        addMessage() {
            const message = {
                id: new Date().getTime(),
                text: this.text,
                user: this.currentUser,
            };
            this.messages = this.messages.concat(message);
            this.socketInstance.emit('message', message);
            var socket = io.connect();
            socket.emit('create', 'room1');


        }
    },
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parent-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    padding-top: 60px;
    background-color: #1760e2;
}

.name-container {
    display: flex;
    flex-direction: column;
    width: 200px;
}

.user-name {
    height: 30px;
    font-size: 20px;
    padding: 5px;
    margin-bottom: 5px;
    text-align: center;
    font-weight: bold;
}

.join-button {
    height: 30px;
    font-size: 20px;
    color: #1760e2;
    border-radius: 0%;
}

.text-input-container {
    height: 100vh;
    border-radius: 5%;
}

.text-message {
    width: 75%;
    position: center;
    bottom: 10px;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    color: rgb(0, 0, 0);
}
</style>
    