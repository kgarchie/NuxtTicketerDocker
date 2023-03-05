<template>
  <Head>
    <title>Home</title>
  </Head>
  <main class="main">
    <div class="container">
      <div class="columns">
        <SideNav />
        <div class="column is-9">
          <NavTree />
          <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">
                  Hello,
                </h1>
                <h2 class="subtitle">
                  You have 0 new notifications
                </h2>
              </div>
            </div>
          </section>
          <section class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
              <NuxtLink to="/tickets/new" class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">{{ new_count }}</p>
                  <p class="subtitle">New Tickets</p>
                </article>
              </NuxtLink>
              <NuxtLink to="/tickets/pending" class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">{{ pending_count }}</p>
                  <p class="subtitle">Pending Tickets</p>
                </article>
              </NuxtLink>
              <NuxtLink to="/tickets/reloved" class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">{{ resolved_count }}</p>
                  <p class="subtitle">Resolved</p>
                </article>
              </NuxtLink>
              <NuxtLink class="tile is-parent" to="/tickets/exceptions">
                <article class="tile is-child box">
                  <p class="title">{{ exceptions_count }}</p>
                  <p class="subtitle">Exceptions</p>
                </article>
              </NuxtLink>
            </div>
          </section>
          <div class="columns">
            <div class="column is-6">
              <div class="card events-card">
                <header class="card-header">
                  <p class="card-header-title">
                    New Tickets
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div class="card-table">
                  <div class="content">
                    <table class="table is-fullwidth is-striped">
                      <tbody>
                        <tr v-for="(item, index) in tickets" :key="index">
                          <td width="5%"><i class="fa fa-bell-o"></i></td>
                          <td>{{ item.issue }}</td>
                          <td>{{ item.safaricom_no }}</td>
                          <td class="level-right">
                            <a class="button is-small is-primary" href="/view/{{item.id}}">View</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="card-footer">
                  <NuxtLink to="/tickets/new" class="card-footer-item">View
                    All
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    Ticket Search
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <form class="card-content" action="/search/reference" method="get">
                  <div class="content">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="text" placeholder="Enter Transaction Code or Reference"
                        name="search_transaction_code_or_reference">
                      <span class="icon is-medium is-left">
                        <i class="fa fa-search"></i>
                      </span>
                      <span class="icon is-medium is-right">
                        <i class="fa fa-check"></i>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    User Search
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <form class="card-content" action="/search/general" method="get">
                  <div class="content">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="text" placeholder="Enter Phone Number or Name(s)"
                        name="general_search_tag">
                      <span class="icon is-medium is-left">
                        <i class="fa fa-search"></i>
                      </span>
                      <span class="icon is-medium is-right">
                        <i class="fa fa-check"></i>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    Search Date Range
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <form class="card-content" action="/search/date/" method="get">
                  <div class="content is-flex is-justify-content-space-around">
                    <div class="control">
                      From:
                      <input class="input" type="date" name="date_search_from">
                    </div>
                    <div class="control">
                      To:
                      <input type="date" name="date_search_to" class="input">
                    </div>
                  </div>
                  <button class="button">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
const { data } = await useFetch('/api/tickets')
const tickets = data.value

const pending_count = tickets.filter(ticket => ticket.status === 'P').length
const resolved_count = tickets.filter(ticket => ticket.status === 'R').length
const new_count = tickets.filter(ticket => ticket.status === 'O').length
const exceptions_count = tickets.filter(ticket => ticket.status === 'C').length
</script>
<style scoped>
body {
  overflow-y: hidden;
}
</style>
  