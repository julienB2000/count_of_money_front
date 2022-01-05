<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <img src="https://picsum.photos/200/300" alt="">
            </div>
            <div class="col">
                <img src="https://picsum.photos/200/300" alt="">
            </div>
            <div class="col">
                <img src="https://picsum.photos/200/300" alt="">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "News",
    created() {
        this.$store.dispatch('news')
    }
}


</script>

<style scoped>

</style>