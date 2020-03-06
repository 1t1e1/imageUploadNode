<template>
    <div class="image-list">
        <div v-if="files">
            <div v-for="(src, index) in files" class="container" :key="index">
                <img :src="ImageSrc(src)" alt="" />
                add Downlaod button
            </div>
        </div>
        <p v-else>
            files is empty
        </p>
    </div>
</template>

<script>
export default {
    name: "ImageList",
    props: {
        files: Array,
        yenile: Function,
    },
    methods: {
        ImageSrc: function(str) {
            return "http://localhost:3000/images/" + str;
        },
    },
    mounted() {},
    async created() {
        this.yenile();
        console.log("image list beforecreated");
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-list {
    border: 2px solid blue;
    padding: 10px;
}

img {
    width: 100px;
}
</style>
