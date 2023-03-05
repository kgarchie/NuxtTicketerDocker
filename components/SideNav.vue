<template>
  <div class="column is-2">
    <aside class="menu is-hidden-mobile is-flex is-flex-direction-column">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><a class="is-active">Dashboard</a></li>
        <li><a>Chat History</a></li>
        <li><a>Other</a>
          <ul>
            <li><NuxtLink to="/tickets/create">New Ticket</NuxtLink></li>
            <li><NuxtLink to="/tickets/my">My Tickets</NuxtLink></li>
            <li><NuxtLink to="/tickets/all">All Site Tickets</NuxtLink></li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
</script>

<style scoped>

</style>