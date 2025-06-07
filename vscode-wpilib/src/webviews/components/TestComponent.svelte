<script lang="ts">
  let count = $state(0);
  
  function increment() {
    count += 1;
  }
</script>

<div class="test-component">
  <h2>Test Svelte Component</h2>
  <p>Count: {count}</p>
  <button onclick={increment}>Increment</button>
</div>

<style>

</style> 