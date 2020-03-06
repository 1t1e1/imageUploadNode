<template>
    <div class="upload">
        <input type="file" @change="onFileSelected" />
        <button @click="whatIsFile">what is file</button>
        <button @click="onUpload">upload</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Upload",
    props: {
        yenile: Function,
    },
    data() {
        return { file: "upload" };
    },

    methods: {
        onFileSelected(e) {
            console.log("k");
            console.log(e);
            this.file = e.target.files[0];
        },
        whatIsFile() {
            console.log(this.file);
        },
        onUpload() {
            const fd = new FormData();
            fd.append("image", this.file, this.file.name);
            axios
                .post("http://localhost:3000/images/upload", fd)
                .then(res => console.log(res));
            this.yenile();
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload {
    border: 1px solid black;
    padding: 10px;
}
</style>
