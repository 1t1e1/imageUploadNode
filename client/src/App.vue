<template>
    <div id="app">
        main page
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <Upload :yenile="sorgula" />

        <div>
            <button @click="deneme">guncelle</button>
            <image-list v-if="files" :files="files" :yenile="sorgula" />
            <p v-else>
                loading
            </p>
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
        deneme() {
            this.sorgula();
            console.log("denendi");
        },
        sorgula() {
            axios
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
        mounted() {
            this.sorgula();
        },
    },
};
</script>

<style>
#app {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
