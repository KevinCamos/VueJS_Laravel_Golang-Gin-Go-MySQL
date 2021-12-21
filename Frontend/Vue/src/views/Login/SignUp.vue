<template>
    <section class="h- mt-5">
        <div class="container h-100 mt-5">
            <div class="row justify-content-sm-center h- mt-5">
                <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <div class="card shadow-lg">
                        <SignForm type="Sign Up"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SignForm from "@/components/SignForm.vue";

export default {
    components: { SignForm },
	setup() {
		
		return {  
            
        };
	}
}
</script>

<style>

</style>