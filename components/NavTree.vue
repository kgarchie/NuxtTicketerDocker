<template>
  <nav class="breadcrumb container" aria-label="breadcrumbs" id="tree">
    <ul id="tree_ul">
      <li><a href="../" class="is-active" aria-current="page">Home</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavTree",
  mounted() {
    let tree_location = window.location.pathname;
    let tree_location_array = tree_location.split('/');
    let breadcrumb_ul = document.getElementById('tree_ul');
    let breadcrumb_last_link = breadcrumb_ul.lastElementChild.querySelector('a');

    breadcrumb_last_link.classList.remove('is-active');
    breadcrumb_last_link.removeAttribute('aria-current');

    for (let i = 0; i < tree_location_array.length - 1; i++) {
      if (tree_location_array[i] !== '') {
        let breadcrumb_li = document.createElement('li');
        let breadcrumb_a = document.createElement('a');
        breadcrumb_a.setAttribute('href', '../' + tree_location_array[i] + '/');
        breadcrumb_a.innerHTML = tree_location_array[i];
        breadcrumb_li.appendChild(breadcrumb_a);

        breadcrumb_ul.appendChild(breadcrumb_li);
      }
    }

    let breadcrumbItemsLastLink = breadcrumb_ul.lastElementChild.querySelector('a');

    breadcrumbItemsLastLink.classList.add('is-active');
    breadcrumbItemsLastLink.setAttribute('aria-current', 'page');
  }
}
</script>

<style scoped>
</style>