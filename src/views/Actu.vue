<template>
    <div class="actu-content-body">
        <div class="container-fluid">
            <div class="row" style="margin-top: 100px">
                <Navbar active-name="actu" style="margin-top: 418px"/>
                <div class="col-9">
                <h2 class="text-center">Titre de l'article</h2>
                <div class="text-article-content">
                    <div>L'id de mon article : {{id}}</div>
                    <div>Nom de mon article : {{name}}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
    name: "Actu",
    components: {
        Navbar
    },
    props: ['name', 'id'],
    mounted() {
        // axios avec this.id
    }
}
</script>

<style scoped>

.actu-content-body {
  height: 100%;
  background-image: url("../assets/background-Maquette.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding-top: 40px;
}

.text-article-content {
    font-size: 1.2rem;
    margin-top: 100px;
}

</style>