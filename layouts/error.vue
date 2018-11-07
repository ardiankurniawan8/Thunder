<template>
		<v-container class="py-5">
			<v-layout row wrap>
				<v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3 xl4 offset-xl4 class="text-xs-center pt-5 mt-3">
					    <h1 class='display-1' v-if="error.statusCode">Whoops, something went wrong!</h1>
					    <p class='mt-5'>We will look at this issue and see what we can do about it</p>
					    <p class='mt-5'>Back to <a @click="$router.history.router.back()">previous page</a></p>
				</v-flex>
			</v-layout>
		</v-container>
</template>

<script>
export default {
  layout: 'auth', // you can set a custom layout for the error page
  props: ['error']
}
</script>