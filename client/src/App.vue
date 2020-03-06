<template>
    <div id="app">
        main page
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <Upload :yenile="sorgula" />

        <div>
            <button @click="sorgula">guncelle</button>
            <image-list :files="files" :yenile="sorgula" />
        </div>
    </div>
</template>

<script>
import ImageList from "./components/ImageList.vue";
import Upload from "./components/Upload.vue";
import axios from "axios";

export default {
    name: "App",
    components: {
        Upload,
        ImageList,
    },
    data() {
        return {
            files: null,
        };
    },
    methods: {
        async sorgula() {
            console.log(" sorgu methodu calisti");
            await axios
                .get("http://localhost:3000/images/")
                .then(response => {
                    // handle success
                    // readDir deki hatayi duzelt
                    let length = response.data.files.length;
                    this.files = response.data.files[length - 1];
                    console.log(response);
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
        },
        created() {
            this.sorgula;
        },
    },
};
</script>

<style>
#app {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    width: 960px;
    margin: 0 auto;
}
button {
    margin: 10px;
}
</style>
